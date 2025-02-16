import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton, 
  IonLabel,
  IonSpinner,
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
    CommonModule,
    IonSpinner
  ],
})
export class AuthPage {
  loading = false;

  constructor(private authService: AuthService) {}

  async googleLogin() {
    this.loading = true;
    this.authService.googleLogin().then(() => this.loading = false);
  }
}
