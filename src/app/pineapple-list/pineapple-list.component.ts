import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Pineapples, Pineapple } from '../models/pineapples';
import gql from 'graphql-tag';

@Component({
  selector: 'app-pineapple-list',
  templateUrl: './pineapple-list.component.html',
  styleUrls: ['./pineapple-list.component.css']
})
export class PineappleListComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  pineapples: Pineapple[];
  loading = true;
  error: any;
  
  ngOnInit() {

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
      })
      .valueChanges.subscribe(result => {
        this.pineapples = result.data && result.data.pineapples;
        this.loading = result.loading;
        this.error = result.errors;
      });

  }

}
