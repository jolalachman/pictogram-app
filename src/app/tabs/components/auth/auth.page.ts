import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton, 
  IonLabel
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrl: 'auth.page.scss',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    TranslateModule,
    IonButton,
    IonLabel,
    CommonModule
  ],
})
export class AuthPage {

  constructor(private authService: AuthService) {}

  googleLogin() {
    this.authService.googleLogin();
  }
}
