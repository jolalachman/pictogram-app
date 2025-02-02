import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonList,
  IonItem,
  IonInput,
  IonText,
  IonInputPasswordToggle,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonInput,
    IonText,
    IonInputPasswordToggle,
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class LoginFormComponent {
  @Output() changeState = new EventEmitter();
  passwordRegex: RegExp = /^(?=.{8,}).*$/;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(this.passwordRegex)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const authModel: AuthModel = this.loginForm.value;
    this.authService
      .login(authModel)
      .then(
        onfulfilled => {
          this.router.navigate(['tabs/tab1'])
        },
        onrejected => {
          //TODO: Toast
          console.log(onrejected);
        });
  }

  goToRegister(event: Event) {
    this.changeState.emit(event);
  }
}
