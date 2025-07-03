import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
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
  IonButtons
} from '@ionic/angular/standalone';
import {RouterLink, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    FormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit {
  public login:string = '';
  public senha:string = '';
  


  constructor(
    public as:AutenticacaoService
  ) { }

  ngOnInit() {
  }

  logar(){
    let login = this.login
    let senha = this.senha
    this.as.logar(login,senha).subscribe(
      (_res:any)=>{
        if(_res.status == 'success'){
          sessionStorage.setItem('token', _res.token);
        }else{
        }
      }
    )
  }

}
