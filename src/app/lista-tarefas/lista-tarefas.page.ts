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

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.page.html',
  styleUrls: ['./lista-tarefas.page.scss'],
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
    IonInput
  ]
})
export class ListaTarefasPage implements OnInit {

  public dados: Array<any> = [];

  constructor(
    private rt: RealtimeDatabaseService,
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({ pencil, trash, add });
  }

  ngOnInit() {
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

  async excluirAndAlert(id: string) {
    const alert = await this.alertController.create({
      subHeader: 'Deseja excluir esta tarefa?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sim',
          handler: () => {
            this.rt.remove(`/lista-tarefas/${id}`).then(() => this.load());
          }
        }
      ]
    });

    await alert.present();
  }

  atualizarStatus(tarefaId: string, etapaIndex: number, novoStatus: string) {
    const tarefa = this.dados.find(t => t.id === tarefaId);
    if (!tarefa) return;
  
    const etapa = tarefa.etapas[etapaIndex];
  
    tarefa.etapas[etapaIndex] = {
      descricao: etapa.descricao ?? '',
      status: novoStatus
    };
  
    this.rt.update(`/criar-tarefa/${tarefaId}`, { etapas: tarefa.etapas })
      .then(() => console.log('Status atualizado'))
      .catch(err => console.error('Erro ao atualizar status', err));
  }

  atualizarDescricao(tarefaId: string, etapaIndex: number, novaDescricao: string) {
    const tarefa = this.dados.find(t => t.id === tarefaId);
    if (!tarefa) return;
  
    tarefa.etapas[etapaIndex] = {
      descricao: novaDescricao ?? '',
      status: tarefa.etapas[etapaIndex].status ?? 'pendente'
    };
  
    this.rt.update(`/criar-tarefa/${tarefaId}`, { etapas: tarefa.etapas })
      .then(() => console.log('Descrição atualizada'))
      .catch(err => console.error('Erro ao atualizar descrição', err));
  }

  removerEtapa(tarefaId: string, etapaIndex: number) {
    const tarefa = this.dados.find(t => t.id === tarefaId);
    if (!tarefa) return;
  
    tarefa.etapas.splice(etapaIndex, 1);
  
    this.rt.update(`/criar-tarefa/${tarefaId}`, { etapas: tarefa.etapas })
      .then(() => console.log('Etapa removida'))
      .catch(err => console.error('Erro ao remover etapa', err));
  }

  getProgresso(etapas: any[]): number {
    if (!Array.isArray(etapas) || etapas.length === 0) return 0;
  
    const concluidas = etapas.filter(e => e.status === 'concluida').length;
    return concluidas / etapas.length;
  }

  adicionarEtapa(tarefaId: string) {
    const tarefa = this.dados.find(t => t.id === tarefaId);
    if (!tarefa) return;
  
    const novaEtapa = {
      descricao: 'Nova etapa',
      status: 'pendente'
    };
  
    tarefa.etapas = Array.isArray(tarefa.etapas) ? [...tarefa.etapas, novaEtapa] : [novaEtapa];
  
    this.rt.update(`/criar-tarefa/${tarefaId}`, { etapas: tarefa.etapas })
      .then(() => console.log('Nova etapa adicionada'))
      .catch(err => console.error('Erro ao adicionar etapa', err));
  }

  excluirTarefa(id: string) {
    this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Você tem certeza que deseja excluir esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.rt.remove(`/criar-tarefa/${id}`)
              .then(() => {
                console.log('Tarefa excluída');
                // Opcional: remover da lista local sem precisar recarregar tudo
                this.dados = this.dados.filter(t => t.id !== id);
              })
              .catch(err => console.error('Erro ao excluir tarefa', err));
          }
        }
      ]
    }).then(alert => alert.present());
  }
  
}
