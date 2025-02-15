import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonContent, IonList, IonItem, IonLabel, IonItemSliding, IonSpinner,
IonItemOptions,
IonIcon,
IonItemOption } from '@ionic/angular/standalone';
import { HistoryService } from '../tab1/services/history.service';
import { HistoryModel } from 'src/app/models/history.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, CommonModule } from '@angular/common';
import { AuthService } from '../auth/services';
import { TileComponent } from '../tab1/components';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    FontAwesomeModule,
    NgFor,
    CommonModule,
    TileComponent,
    IonFab,
    TranslateModule,
    IonRefresher,
    IonRefresherContent,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon, IonSpinner,
  ],
})
export class Tab2Page {
  refresh = new BehaviorSubject(false);
  refresh$ = this.refresh.asObservable();
  historyList$ = this.refresh$
  .pipe(
    switchMap(() => this.historyService.getUserHistory()),
  );
  isPlayMode: boolean = false;
  selectedTile?: HistoryModel;
  
  constructor(private historyService: HistoryService,
    private translate: TranslateService
  ) {
      addIcons({trash});}

  toggleTileSelection(tile: HistoryModel): void {
    // If it's in play mode, do nothing
    if (this.isPlayMode) {
      return;
    }
  
    // If no tile is selected and the current tile is not selected, select it
    if (!this.selectedTile) {
      this.selectedTile = tile;
      tile.isSelected = true;
    } else if (this.selectedTile === tile) {
      // If the same tile is selected, deselect it
      this.selectedTile = undefined;
      tile.isSelected = false;
    } else {
      // If a different tile is selected, switch the selection
      this.selectedTile.isSelected = false;
      this.selectedTile = tile;
      tile.isSelected = true;
    }
  }

  playSentence() {
    this.isPlayMode = true;
    if(this.selectedTile)
      this.speak(this.selectedTile.generatedSentence);
  }

  speak = async (sentence: string | null) => {
    const { languages } = await TextToSpeech.getSupportedLanguages();
    const lang = languages.find((x: string) => x.includes(this.translate.currentLang));
    await TextToSpeech.speak({
      text: sentence ?? '',
      lang: lang,
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
      queueStrategy: 1
    }).then(() => {
      this.isPlayMode = false;
    });
  };

  refreshHistory() {
    this.refresh.next(true);
  }

  async loadHistory() {
    this.refreshHistory();
  }

  handleRefresh(event: CustomEvent) {
    this.loadHistory().then(() => (event.target as HTMLIonRefresherElement).complete());
  }

  async handleDelete(event: string) {
    const result = await this.historyService.deleteHistoryByGeneratedSentence(event).finally(() => this.loadHistory());
  }
  
}
