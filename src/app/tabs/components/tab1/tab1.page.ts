import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Tile } from 'src/app/models/tile.model';
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, add } from 'ionicons/icons'
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { TileService } from './services/tile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonLabel, IonItem, IonCol, IonGrid, IonRow, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    NgFor,
    FontAwesomeModule
  ],
})
export class Tab1Page implements OnInit{
  tiles: Tile[] = [];
  selectedTiles: Tile[] = [];

  constructor(
    public route: Router, 
    // private firestore: Firestore, 
    private tileService: TileService
  ) {
    addIcons({heart, add});
  }

  async ngOnInit(){
    // this.tileService.seedDatabase();
    this.tiles = await this.tileService.getUserTiles();
  }

  toggleTileSelection(tile: Tile): void {
    tile.isSelected = !tile.isSelected;
    tile.color = tile.isSelected ? "success" : "default";
  }

  // isSelected(tile: Tile): boolean {
  //   return this.selectedTiles.some(t => t.label = tile.label);
  // }

  generateSentence() {
    // TODO: get all selected tiles from this.tiles.isSelected and run it through sentence generator
    
    if (this.selectedTiles.length > 0) {
      console.log('Generated sentence:', this.selectedTiles.map(tile => tile.label).join(' '));
    } else {
      console.log('No tiles selected');
    }
  }

  navigateToAddTilePage(){
    this.route.navigate(['/add-tile']);
  }

}
