import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonCard,
  IonCardHeader,
  IonCheckbox, 
  IonProgressBar,
  IonButton,
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-progresso-tarefa',
  templateUrl: './progresso-tarefa.page.html',
  styleUrls: ['./progresso-tarefa.page.scss'],
  standalone: true,
  imports: [
    IonProgressBar, 
    IonCheckbox, 
    IonCard,
    IonCardHeader,
    IonCardContent, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonProgressBar,
    IonButton,
  ]
})
export class ProgressoTarefaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
