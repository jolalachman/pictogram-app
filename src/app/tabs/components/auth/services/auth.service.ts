import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable to track the user
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    // Initialize user$ as an observable that tracks user changes
    this.user$ = user(this.auth);
  }

  // Method for Google login
  async googleLogin(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      console.log('User:', user);
      // Handle the user here (e.g., store user info or set user state)
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }

  // Method to log out
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Method to get the current user as observable
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
