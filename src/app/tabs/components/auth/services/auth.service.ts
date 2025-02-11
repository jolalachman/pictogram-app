import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject(null as User | null);
  user$: Observable<User | null> = this.user.asObservable();

  constructor(private router: Router) {
    this.initializeAuthListener();
  }

  private initializeAuthListener() {
    FirebaseAuthentication.addListener('authStateChange', (user) => {
      if (user) {
        this.user.next(user.user);
      } else {
        this.user.next(null);
      }
    });
  }

  private async signInWithGoogle(){
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
  }

  // Method for Google login
  async googleLogin(): Promise<void> {
    try {
      const result = await this.signInWithGoogle();
      const user = result;
      if (user) {
        this.router.navigate(['/tabs/tab1']);

      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }

  async logout(): Promise<void> {
    return await FirebaseAuthentication.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    return await FirebaseAuthentication.getCurrentUser().then(x => !!x.user);
  }

  async getUserId(): Promise<string | boolean | undefined> {
    return await FirebaseAuthentication.getCurrentUser().then(x => x.user?.uid);
  }
}
