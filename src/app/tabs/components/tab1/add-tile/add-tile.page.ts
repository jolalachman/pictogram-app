import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonBackButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TileService } from '../services/tile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-tile',
  templateUrl: './add-tile.page.html',
  styleUrls: ['./add-tile.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButton, IonInput, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonSelect, IonSelectOption,
    FontAwesomeModule,
  ]
})
export class AddTilePage implements OnInit {

  public formData: FormGroup = new FormGroup({});
  // private formData: FormGroup | undefined;
  availableIcons = ['coffee', 'heart', 'star', 'apple-alt', 'car'];
  constructor(private route: Router, private tileService: TileService) { }

  ngOnInit() {
    this.formData = new FormGroup({
      title: new FormControl(),
      icon: new FormControl()
    });
  }

  onSubmit() {
    console.log('Tile added:', this.formData.value);
    // this.route.navigate(['/']);
    
    this.tileService.addTile({label: this.formData.value.title, isCustom: false, iconName: this.formData.value.icon});
    this.route.navigate(['']);
  }

}
