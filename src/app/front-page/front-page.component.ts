import { Component, OnInit } from '@angular/core';
import { Pineapple, Pineapples } from '../models/pineapples';
import { Apollo } from 'apollo-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalStorageService } from 'angular-2-local-storage';
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {

  rates: Pineapple[];
  loading = true;
  error: any;


  constructor(private apollo: Apollo,
    private afa: AngularFireAuth, private http: HttpClient,
    private localStorageService: LocalStorageService) {

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
      `,
        fetchPolicy:'network-only'
      })
      .valueChanges.subscribe(result => {
        this.rates = result.data && result.data.pineapples;
        this.loading = result.loading;
        this.error = result.errors;
      });


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
