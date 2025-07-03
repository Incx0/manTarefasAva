import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonImg, 
  IonList, 
  IonItem, 
  IonInput, 
  IonInputPasswordToggle,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import {RouterLink, RouterModule } from '@angular/router';
import { RequisicaoService } from '../service/requisicao.service';
RequisicaoService

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem, 
    IonList, 
    IonImg, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonInputPasswordToggle,
    IonButton,
    RouterLink,
    RouterModule,
    IonButtons,
    IonBackButton,
    FormsModule
  ],
})
export class RegisterPage implements OnInit {

  public nome: string = '';
  public login: string = '';
  public email: string = '';
  public senha: string = '';



  constructor(
    public rs: RequisicaoService
  ) { }

  ngOnInit() {
  }

  salvar(){
    const fd = new FormData();
    fd.append('controller', 'cadastro-usuario');
    fd.append('nome', this.nome);
    fd.append('login', this.login);
    fd.append('email', this.email);
    fd.append('senha', this.senha);

    this.rs.post(fd).subscribe();
  }

}
