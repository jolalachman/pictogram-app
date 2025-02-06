import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HistoryService } from '../tab1/services/history.service';
import { HistoryModel } from 'src/app/models/history.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, CommonModule } from '@angular/common';
import { AuthService } from '../auth/services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    FontAwesomeModule,
    NgFor,
    CommonModule
  ],
})
export class Tab2Page implements OnInit {

  historyList: HistoryModel[] = [];
  
  constructor(private historyService: HistoryService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.loadHistory(); // Load tiles after every logged user change
    });
  }

  async loadHistory() {
    this.historyList = await this.historyService.getUserHistory();
  }
}
