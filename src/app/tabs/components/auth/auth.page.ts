import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LoginFormComponent, RegisterFormComponent } from './components';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    LoginFormComponent,
    TranslateModule,
    RegisterFormComponent
  ],
})
export class AuthPage {
  isLogin = true;

  constructor() {}

  onChangeState(event: Event) {
    this.isLogin = !this.isLogin;
  }
}
