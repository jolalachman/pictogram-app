import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonButton, IonIcon,
  IonAlert } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Tile } from 'src/app/models/tile.model';
import { CommonModule, NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, add } from 'ionicons/icons'
import { Router } from '@angular/router';
import { TileService } from './services/tile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../auth/services';
import { HistoryService } from './services/history.service';
import { Observable } from 'rxjs';
import { APIService } from './services/api.service';
import { TranslateModule } from '@ngx-translate/core';

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
    FontAwesomeModule,
    IonAlert,
    CommonModule,
    TranslateModule
  ],
})
export class Tab1Page implements OnInit{
  tiles$: Observable<Tile[]> = this.tileService.getUserTiles();
  selectedTiles: Tile[] = [];
  generatedSentence: string | null = '';
  showPopup: boolean = false;

  constructor(
    public route: Router,
    private tileService: TileService,
    private authService: AuthService,
    private apiService: APIService,
    private historyService: HistoryService
  ) {
    addIcons({heart, add});
  }

  async ngOnInit(){
    this.authService.getCurrentUser().subscribe(user => {
      console.log("Zalogowany użytkownik:", user?.uid || "Brak");
    });
  }

  toggleTileSelection(tile: Tile): void {
    tile.isSelected = !tile.isSelected;
  }


  generateSentence(tiles: Tile[]) {
    for(const tile of tiles){
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
    
    this.apiService.generateSentece(prompt).then(sentence => {
      this.generatedSentence = sentence;
      const iconNames = this.selectedTiles.map(tile => tile.icon).join(' ');

      this.historyService.saveHistory(iconNames, sentence || '').then(() => {
        this.selectedTiles = [];
        this.showPopup = true;
      });
    });

    tiles.map(tile => tile.isSelected = false);
  }

  navigateToAddTilePage(){
    this.route.navigate(['/add-tile']);
  }

  getCategory(tiles: Tile[], category: string) {
    return tiles.some(tile => tile.category === category)
  }
}
