import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonRow, IonGrid, IonCol, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Tile } from 'src/app/models/tile.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonItem, IonCol, IonGrid, IonRow, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    NgFor,
  ],
})
export class Tab1Page {
  constructor() {}

  wordTiles: Tile [] = [
    {id: '1', label: 'Mama', isCustom: false, isSelected: false},
    {id: '2', label: 'Kot', isCustom: false, isSelected: false},
    {id: '3', label: 'Jedzenie', isCustom: false, isSelected: false},
    {id: '4', label: 'Picie', isCustom: false, isSelected: false},
    {id: '5', label: 'Pies', isCustom: false, isSelected: false},
    {id: '6', label: 'Ciepło', isCustom: false, isSelected: false},
    {id: '7', label: 'Zimno', isCustom: false, isSelected: false},
    {id: '8', label: 'Ja', isCustom: false, isSelected: false},
    {id: '9', label: 'Ty', isCustom: false, isSelected: false},
  ];

  toggleTileSelection(tile: Tile): void {
    
  }
}
