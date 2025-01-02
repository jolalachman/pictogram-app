import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Tile } from 'src/app/models/tile.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class Tab1Page {
  constructor() {}

  wordTiles: Tile [] = [
    {id: '1', label: 'Mama', isCustom: false, isSelected: false},
    {id: '2', label: 'Kot', isCustom: false, isSelected: false},
    {id: '3', label: 'Jedzenie', isCustom: false, isSelected: false},
  ];

}
