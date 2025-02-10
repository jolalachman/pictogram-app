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

      //   Specify your app's SHA-1 fingerprint from the Settings page of the Firebase console. Refer to Authenticating Your Client for details on how to get your app's SHA-1 fingerprint.
      // Enable Google Sign-In in the Firebase console:

      //     Open the Auth section in the Firebase console.
      //     Open the Sign-in method tab and enable Google Sign In.



  googleLogin() {
    this.authService.googleLogin();
  }
}
