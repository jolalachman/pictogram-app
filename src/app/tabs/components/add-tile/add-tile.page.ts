import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-tile',
  templateUrl: './add-tile.page.html',
  styleUrls: ['./add-tile.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddTilePage implements OnInit {

  public formData: FormGroup = new FormGroup({});
  // private formData: FormGroup | undefined;

  constructor() { }

  ngOnInit() {
    this.formData = new FormGroup({
      title: new FormControl()
    });
  }

  onSubmit() {
    console.log('Tile added:', this.formData.value);
  }

}
