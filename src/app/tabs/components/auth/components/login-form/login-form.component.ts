import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonList, IonItem, IonInput, IonText, IonInputPasswordToggle, IonButton} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonInput, IonText, IonInputPasswordToggle, IonButton, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class LoginFormComponent {
  passwordRegex: RegExp = /^(?=.{8,}).*$/;
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]]
  });

  constructor(private fb: FormBuilder) {}

  login() {
    // TODO
    console.log('login');
  }

}
