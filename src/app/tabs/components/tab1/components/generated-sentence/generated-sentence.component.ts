import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Tile } from 'src/app/models/tile.model';
import { trigger, transition, style, animate } from '@angular/animations';
// import {IonFab} from '@ionic/angular/standalone';

@Component({
  selector: 'app-generated-sentence',
  templateUrl: './generated-sentence.component.html',
  styleUrls: ['./generated-sentence.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ],
})
export class GeneratedSentenceComponent  implements OnInit {
  @Input() selectedTiles$: Observable<Tile[]> = of([]);
  constructor() { }

  ngOnInit() {}

}
