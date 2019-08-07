import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Pineapples, Pineapple } from './models/pineapples';
import { WatchQueryFetchPolicy } from 'apollo-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  rates: Pineapple[];
  loading = true;
  error: any;


  constructor(private apollo: Apollo,
    private afa: AngularFireAuth, private http: HttpClient,
    private localStorageService: LocalStorageService) {

  }


  ngOnInit(): void {
    this.afa.idToken.subscribe((data) => {
      console.log(data);
      this.localStorageService.set('loginToken', data);
    });



  }


  callGraphQLQuery() {

    const token = this.localStorageService.get('loginToken');
    this.apollo
      .watchQuery<Pineapples>({

        query: gql`
        {
          pineapples{
            id
            name
          }
        }
      `, context: {
          headers: new HttpHeaders().set("Authorization", "Bearer " + token),
        },
        fetchPolicy:'network-only'
      
      })
      .valueChanges.subscribe(result => {
        this.rates = result.data && result.data.pineapples;
        this.loading = result.loading;
        this.error = result.errors;
      });


  }

  onLogOut() {
    this.afa.auth.signOut();    
  }

  callServerAuth() {
    this.callAuthEndpoint();
  }

  callServerUnauth() {
    this.http
      .get<any>('https://localhost:5001/api/free').subscribe(d => {
        console.log('unauth');
        console.log(d);

      });
  }

  private callAuthEndpoint() {
    console.log('calling auth endpoint');
    const token = this.localStorageService.get('loginToken');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.http
      .get<any>('https://localhost:5001/api/values', { headers: headers }).subscribe(d => {
        console.log('returning auth endpoint');
        console.log(d);
      });
  }
}
