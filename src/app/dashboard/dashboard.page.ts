import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { pencil, trash, add } from 'ionicons/icons';
import { CommonModule, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import {
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonProgressBar, 
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonBadge,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/angular/standalone';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequisicaoService } from '../service/requisicao.service';

import {ChartModule} from 'primeng/chart';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonInput, 
    IonContent,
    FormsModule,
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonProgressBar,
    TitleCasePipe,
    NgForOf,
    CommonModule,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonBadge, 
    TitleCasePipe,
    IonSelect,
    IonSelectOption,
    IonInput,
    ChartModule
  ]
})
export class DashboardPage implements OnInit {

  public dados: Array<any> = [];
  public data: any;

  constructor(
    private rt: RealtimeDatabaseService,
    private rs: RequisicaoService,
    private alertController: AlertController,
    private router: Router,
  ) {
    addIcons({ pencil, trash, add });
  }

  ngOnInit() {
    this.data ={
      labels: [],
      datasets: [{data:[]}]
    }
    this.load();
  }

  load() {
    this.rt.query('/criar-tarefa', (snapshot: any) => {
      const dadosBrutos = snapshot.val();

      if (dadosBrutos !== null) {
        this.dados = Object.entries(dadosBrutos).map(([key, value]: [string, any]) => {
          return {
            id: key,
            ...value,
            etapas: value.etapas || []
          };
        });
      } else {
        this.dados = [];
      }
    });
  }


  getProgresso(etapas: any[]): number {
    if (!Array.isArray(etapas) || etapas.length === 0) return 0;
  
    const concluidas = etapas.filter(e => e.status === 'concluida').length;
    return concluidas / etapas.length;
  }

  dashboardData() {
    this.rs.get('/criar-tarefa')
      .subscribe((tarefas: any) => {
        const statusContagem: { [status: string]: number } = {};
  
        Object.values(tarefas).forEach((tarefa: any) => {
          if (tarefa.etapas && Array.isArray(tarefa.etapas)) {
            tarefa.etapas.forEach((etapa: any) => {
              const status = (etapa.status || 'Indefinido').toLowerCase();
              statusContagem[status] = (statusContagem[status] || 0) + 1;
            });
          }
        });
  
        const labels = Object.keys(statusContagem);
        const valores = Object.values(statusContagem);
  
        this.data = {
          labels,
          datasets: [
            {
              data: valores,
              backgroundColor: [
                '#36A2EB', // Azul
                '#FFCE56', // Amarelo
                '#FF6384', // Rosa
                '#4BC0C0', // Verde água
                '#9966FF', // Roxo
                '#FF9F40', // Laranja
              ],
              hoverOffset: 4
            }
          ]
        };
      });
  }
  
}
