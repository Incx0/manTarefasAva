import { Component } from '@angular/core';
import {
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSegment,
  IonSegmentView,
  IonSegmentContent,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterModule, RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonSegment,
    IonSegmentView,
    IonSegmentContent,
    IonSegmentButton,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    IonLabel,
    RouterLink
  ],
})
export class HomePage {
  constructor() {}
}
