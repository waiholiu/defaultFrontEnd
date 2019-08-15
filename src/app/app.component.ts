import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Pineapples, Pineapple } from './models/pineapples';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private apollo: Apollo, private router : Router,
    private afa: AngularFireAuth, private http: HttpClient,
    private localStorageService: LocalStorageService) {

  }


  ngOnInit(): void {
    this.afa.idToken.subscribe((data) => {
      console.log(data);
      this.localStorageService.set('loginToken', data);
    });

  }

  onLogOut() {
    this.afa.auth.signOut();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
