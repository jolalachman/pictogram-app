import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  User, 
} from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { AuthModel } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

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
      console.log("user", user);//zwraca obiekt z userem

      // const auth = getAuth();
      const user1 = this.auth.currentUser;

      console.log("user1", user1);//zwraca null
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

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
  // async getCurrentUser(): Promise<User | null> {
  //   // console.log(this.auth.currentUser);
  //   // const auth = getAuth();
  //   // const user = auth.currentUser;
  //   // console.log(user);

  //   // if (user !== null) {
  //   //   // The user object has basic properties such as display name, email, etc.
  //   //   const displayName = user.displayName;
  //   //   const email = user.email;
  //   //   const photoURL = user.photoURL;
  //   //   const emailVerified = user.emailVerified;
    
  //   //   // The user's ID, unique to the Firebase project. Do NOT use
  //   //   // this value to authenticate with your backend server, if
  //   //   // you have one. Use User.getToken() instead.
  //   //   const uid = user.uid;
  //   //   console.log(user);
  //   // }

  //   return this.auth.currentUser;
  // }
  // Observable (aktualizuje się automatycznie)
  getCurrentUserObs(): Observable<User | null> {
    // console.log(this.auth);
    return user(this.auth);
  }
}
