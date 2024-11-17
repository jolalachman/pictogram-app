import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, LoginFormComponent, TranslateModule],
})
export class AuthPage {
  constructor() {}
}
