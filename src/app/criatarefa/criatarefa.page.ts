  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { addIcons } from 'ionicons';
  import { Router, RouterLink, RouterModule, ActivatedRoute} from '@angular/router';
  import { pencil,trash,add,arrowBack} from 'ionicons/icons';
  import { IonContent, IonHeader, IonTitle, IonToolbar,IonInput,IonTextarea,IonItem,IonList,IonSelect,IonSelectOption,IonButton, IonIcon,IonButtons, IonBackButton } from '@ionic/angular/standalone';
  import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
  import { AlertController } from '@ionic/angular';
  import { RequisicaoService } from '../service/requisicao.service';

  @Component({
    selector: 'app-criatarefa',
    templateUrl: './criatarefa.page.html',
    styleUrls: ['./criatarefa.page.scss'],
    standalone: true,
    imports: [IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonTextarea,IonItem,IonList,IonSelect,IonSelectOption,IonButton,IonIcon,IonButtons, IonBackButton]
  })
  export class CriatarefaPage implements OnInit {

    public id: number = 0;
    public titulo: string = "";
    public descricao: string = "";
    public descricao_etapa: string = "etapa";
    public responsavel: string = "";
    public usuarios:Array<any> = [];
    public responsavel_id: number = 0;
    public usuario_id: number = 0;
    public dados: any[] = [];
    public etapas: { descricao: string, status: string }[] = [
      { descricao: '', status: '' }
    ];
    

    constructor(
      private rt: RealtimeDatabaseService,
      private ar: ActivatedRoute,
      private alertController: AlertController,
      private router: Router,
      public rs: RequisicaoService,
    ) {
      this.ar.params.subscribe((param: any) => {
        this.id = param.id
      })
      addIcons({add});
      addIcons({trash});
      addIcons({arrowBack});
    }


    ngOnInit() {
      this.carregarUsuarios();
      this.load();
    }
    salvar() {
      const etapasValidas = this.etapas.filter(
        etapa => etapa.descricao.trim() !== '' && etapa.status.trim() !== ''
      );
    
      if (!this.titulo.trim()) {
        alert('Título da tarefa é obrigatório.');
        return;
      }
    
      if (etapasValidas.length === 0) {
        alert('Adicione pelo menos uma etapa preenchida.');
        return;
      }
    
      this.rt.add('/criar-tarefa', {
        titulo: this.titulo,
        descricao: this.descricao,
        responsavel: this.responsavel,
        etapas: etapasValidas
      }, this.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.salvarAlert();
        },
        error: (err) => {
          console.log('Falhou', err);
        }
      });
    }
    

    async salvarAlert() {
      const alert = await this.alertController.create({
        header: 'Tarefa salvo com sucesso!',
        buttons: [{
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.router.navigateByUrl('/lista-tarefas');
          }
        }],
      });
      await alert.present();
    }

    load() {
      const indice = this.id == 0 ? '' : this.id;
      this.rt.query(`lista-tarefas/${indice}`, (snapshot: any) => {
        const dados = Object(snapshot.val());
        this.responsavel = dados.responsavel;
        this.etapas = dados.etapas;


      });
    }
    adicionarEtapa() {
      this.etapas.push({ descricao: '', status: '' });
    }
    
    removerEtapa(index: number) {
      this.etapas.splice(index, 1);
    }

    carregarUsuarios() {
      this.rs.post({
        controller:'getusuarios'
      })
      .subscribe(
        (_res:any) =>{
          this.usuarios = _res;
        }
      )
    }
    
  }

