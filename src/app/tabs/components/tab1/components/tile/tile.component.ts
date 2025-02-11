import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonButton, IonFooter} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TranslateModule, IonIcon, CommonModule, IonButton, IonFooter]
})
export class TileComponent  implements OnInit {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() isSelected: boolean = false;
  @Input() deletable: boolean = false;
  @Output() deleteTile = new EventEmitter<string>();

  constructor() {
    addIcons({trash});
  }

  ngOnInit() {
  }

  onDelete() {
    this.deleteTile.emit(this.label);
  }

}
