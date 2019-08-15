import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private localStorage: LocalStorageService
    , private afa: AngularFireAuth) {
    
  }

  setUpSubscriptions()
  {

    this.afa.idToken.subscribe((data) => {
      this.localStorage.set('loginToken', data);
    });
  }

  isLoggedIn(): Boolean {
    return this.localStorage.get('loginToken') != null;

  }

  logout() {
    this.afa.auth.signOut();

  }


}
