import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonBackButton, IonSelect, IonSelectOption, IonPopover } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TileService } from '../services/tile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faS, fas } from '@fortawesome/free-solid-svg-icons';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import { faCoffee, faHeart, faStar, faAppleAlt, faCarSide, faCar } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faHeart, faStar, faAppleAlt, faCarSide, faCar);

@Component({
  selector: 'app-add-tile',
  templateUrl: './add-tile.page.html',
  styleUrls: ['./add-tile.page.scss'],
  standalone: true,
  imports: [IonPopover, IonBackButton, IonButton, IonInput, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonSelect, IonSelectOption,
    FontAwesomeModule,
  ]
})
export class AddTilePage implements OnInit {

  public formData: FormGroup = new FormGroup({});
  
  allIcons = Object.keys(fas); // Pobiera wszystkie dostępne ikony
  
  filteredIcons = [...this.allIcons]; // Kopia listy ikon do filtrowania

  //TODO: add more availableIcons
  availableIcons = [
                    'coffee',
                    'heart', 
                    'star', 
                    'apple-alt', 
                    'car'
                  ];
                  
  constructor(private route: Router, private tileService: TileService, private fb: FormBuilder) {
    // this.formData = this.fb.group({
    //   title: [''],
    //   icon: ['coffee'], // Domyślna ikona
    //   search: [''], // Pole do wyszukiwania ikon
    // });
   }

  ngOnInit() {
    this.formData = new FormGroup({
      title: new FormControl(),
      icon: new FormControl(),
    });
    console.log('Dostępne ikony:', this.availableIcons);
  }

  filterIcons(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredIcons = this.allIcons.filter(icon => icon.includes(searchTerm));
  }

  onSubmit() {
    console.log('Tile added:', this.formData.value);
    this.tileService.addTile({label: this.formData.value.title, isCustom: false, iconName: this.formData.value.icon});
    this.route.navigate(['']);
  }

}
