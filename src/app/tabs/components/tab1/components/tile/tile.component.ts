import { Component, Input, OnInit } from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class TileComponent  implements OnInit {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() isSelected: boolean = false;

  constructor() { }

  ngOnInit() {}

}
