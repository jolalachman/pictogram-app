import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonButton, IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from './services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { GeneratedSentenceComponent, MenuComponent, TileComponent } from './components';

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
    IonFab,
    IonFabButton,
    ExploreContainerComponent,
    NgFor,
    FontAwesomeModule,
    CommonModule,
    TranslateModule,
    IonMenuButton,
    IonButtons,
    MenuComponent,
    TileComponent,
    GeneratedSentenceComponent,
  ],
})
export class Tab1Page {
  tiles$: Observable<Tile[]> = this.tileService.getUserTiles();
  private selectedTiles: BehaviorSubject<Tile[]> = new BehaviorSubject([] as Tile[]);
  selectedTiles$ = this.selectedTiles.asObservable();
  generatedSentence: string | null = '';
  selectedCategory?: 'nouns' | 'verbs' | 'adjectives' | 'questions' |'expressions';

  constructor(
    public route: Router,
    private tileService: TileService,
    private authService: AuthService,
    private apiService: APIService,
    private historyService: HistoryService,
    private translate: TranslateService,
  ) {
    addIcons({heart, add});
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  toggleTileSelection(tile: Tile): void {
    tile.isSelected = !tile.isSelected;
    const tiles = this.selectedTiles.value;
    if(tile.isSelected) {
      this.selectedTiles.next([...tiles, tile]);
    }
    else {
      const index = tiles.indexOf(tile);
      if (index !== -1) {
        // Create a new array without the unselected tile
        tiles.splice(index, 1);
        this.selectedTiles.next([...tiles]);  // Emit the updated array
      }
    }
  }


  generateSentence(tiles: Tile[]) {
    const selectedTiles = this.selectedTiles.value;
    const prompt = selectedTiles.map(tile => tile.label).join(' ');

    if (selectedTiles.length > 0) {
      console.log('Selectes tiles:', prompt);
    } else {
      console.log('No tiles selected');
    }
    
    this.apiService.generateSentece(prompt).then(sentence => {
      this.generatedSentence = sentence;
      const iconNames = selectedTiles.map(tile => tile.icon).join(' ');

      this.historyService.saveHistory(iconNames, sentence || '').then(() => {
        this.selectedTiles.next([]);
        this.speak(sentence);
      });
    });

    tiles.map(tile => tile.isSelected = false);
  }

 speak = async (sentence: string| null) => {
    await TextToSpeech.speak({
      text: sentence ?? '',
      lang: this.translate.currentLang === 'pl' ? 'pl-PL' : 'en-US',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
      queueStrategy: 1
    });
  };

  navigateToAddTilePage(){
    this.route.navigate(['/add-tile']);
  }

  getCategory(tiles: Tile[], category: string) {
    return tiles.some(tile => tile.category === category) && (this.selectedCategory === category || !this.selectedCategory);
  }

  onCategorySelected(event?: 'nouns' | 'verbs' | 'adjectives' | 'questions' |'expressions') {
    this.selectedCategory = event;
  }
}
