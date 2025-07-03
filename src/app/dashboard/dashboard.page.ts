import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { pencil, trash, add } from 'ionicons/icons';
import { CommonModule, NgForOf, TitleCasePipe } from '@angular/common';
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
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequisicaoService } from '../service/requisicao.service';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
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
    IonItem,
    IonLabel,
    RouterLink
  ]
})
export class DashboardPage implements OnInit, AfterViewInit {

  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  public chart: any;
  public dados: Array<any> = [];

  constructor(
    private rt: RealtimeDatabaseService,
    private rs: RequisicaoService,
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({ pencil, trash, add });
  }

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit(): void {
    this.carregarDadosETracarGrafico();
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

  carregarDadosETracarGrafico() {
    this.rt.query('/criar-tarefa', (snapshot: any) => {
      const tarefas = Object.values(snapshot.val() || []);
  
      let concluido = 0;
      let pendente = 0;
  
      tarefas.forEach((tarefa: any) => {
        if (tarefa.etapas && Array.isArray(tarefa.etapas)) {
          tarefa.etapas.forEach((etapa: any) => {
            const statusRaw = (etapa.status || '').toLowerCase().trim();
            const status = statusRaw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
            if (status === 'concluido' || status === 'concluida') {
              concluido++;
            } else if (status === 'pendente') {
              pendente++;
            }
          });
        }
      });
  
      this.tracarGrafico(concluido, pendente);
    });
  }

  tracarGrafico(concluido: number, pendente: number) {
    if (this.chart) this.chart.destroy();
  
    this.chart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Concluídas', 'Pendentes'],
        datasets: [{
          data: [concluido, pendente],
          backgroundColor: ['#4CAF50', '#FFC107']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}
