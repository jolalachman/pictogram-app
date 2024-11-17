import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { AuthModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register(authModel: AuthModel) {
    try {
      const user = createUserWithEmailAndPassword(
        this.auth,
        authModel.email ?? '',
        authModel.password ?? ''
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(authModel: AuthModel) {
    try {
      const user = signInWithEmailAndPassword(
        this.auth,
        authModel.email ?? '',
        authModel.password ?? ''
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  isAuthenticated() {
    return !!this.auth.currentUser;
  }
}
