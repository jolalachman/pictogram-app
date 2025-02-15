import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton, 
  IonLabel, 
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APIService } from '../tab1/services/api.service';
import { TileService } from '../tab1/services/tile.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    TranslateModule,
    IonButton,
    IonLabel,
    CommonModule,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class InfoComponent  implements OnInit {
  prompt = this.apiService.prompt;
  tileLayout = this.tileService.tileLayout;
  language = this.translate.currentLang;
  constructor(
    private apiService: APIService,
    private tileService: TileService,
    private translate: TranslateService
  ) { }

  ngOnInit() {}

  get isPromptDefault() {
    return this.prompt === this.apiService.prompt;
  }

  get isTileLayoutDefault() {
    return this.tileLayout === this.tileService.tileLayout;
  }

  get isLanguageDefault() {
    return this.language === this.translate.currentLang;
  }

  changePrompt() {
    this.apiService.changePrompt(this.prompt);
  }

  changeTileLayout() {
    this.tileService.changeTileLayout(this.tileLayout);
  }

  changeLanguage() {
    this.translate.use(this.language);
    localStorage.setItem('lang', this.language);
  }

}
