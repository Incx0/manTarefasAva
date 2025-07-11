import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Route, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-devacess',
  templateUrl: './devacess.page.html',
  styleUrls: ['./devacess.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    RouterLink,
    RouterModule
  ]
})
export class DevacessPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
