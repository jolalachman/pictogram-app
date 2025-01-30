import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { AuthModel } from '../models';
import { Observable } from 'rxjs';

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
    // TODO: Add store so refresh wont affect the result
    return !!this.auth.currentUser;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.auth.currentUser;
  }
  // Observable (aktualizuje się automatycznie)
  getCurrentUserObs(): Observable<User | null> {
    return user(this.auth);
  }
}
