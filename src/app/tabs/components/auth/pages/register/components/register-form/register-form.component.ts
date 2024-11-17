import { Component } from '@angular/core';
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
import { AuthService } from '../../../../services';
import { AuthModel } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
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
export class RegisterFormComponent {
  passwordRegex: RegExp = /^(?=.{8,}).*$/;

  registerForm = this.fb.group({
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

  register() {
    const authModel: AuthModel = this.registerForm.value;
    this.authService
      .register(authModel)
      .finally(() => this.router.navigate(['tabs/tab1']));
  }
}
