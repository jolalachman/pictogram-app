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
  user$: Observable<User | null>;
  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }


  async googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      console.log('User:', user);
      // Handle the user here
    } catch (error) {
      console.error(error);
    }
    
  }

  logout() {
    return signOut(this.auth);
  }

  get isAuthenticated() {
    return !!this.auth.currentUser;
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
  
}
