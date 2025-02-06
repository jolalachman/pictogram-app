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
import { APIService } from './services/api.service';
import { AuthService } from '../auth/services';

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
    private tileService: TileService,
    private apiService: APIService,
    private authService: AuthService
  ) {
    addIcons({heart, add});
  }

  async ngOnInit(){
    // this.tileService.seedDatabase();
    this.authService.getCurrentUser().subscribe(user => {
      console.log("Zalogowany użytkownik:", user?.uid || "Brak");
      this.loadTiles(); // Load tiles after every logged user change
    });
  }

  async loadTiles() {
    this.tiles = await this.tileService.getUserTiles();
  }

  toggleTileSelection(tile: Tile): void {
    tile.isSelected = !tile.isSelected;
    tile.color = tile.isSelected ? "success" : "default";
  }


  generateSentence() {
    for(const tile of this.tiles){
      if(tile.isSelected == true){
        this.selectedTiles.push(tile);
      }
    }

    const prompt = this.selectedTiles.map(tile => tile.label).join(' ');

    if (this.selectedTiles.length > 0) {
      console.log('Selectes tiles:', prompt);
    } else {
      console.log('No tiles selected');
    }
    // TODO: Display generated sentence
    this.apiService.generateSentece(prompt).then(sentence => {
      // console.log('Generated sentence: ', sentence);
    });
    
  }

  navigateToAddTilePage(){
    this.route.navigate(['/add-tile']);
  }

}
