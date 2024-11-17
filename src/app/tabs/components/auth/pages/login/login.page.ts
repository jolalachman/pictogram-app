import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LoginFormComponent } from './components';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    LoginFormComponent,
    TranslateModule,
  ],
})
export class LoginPage {
  constructor() {}
}
