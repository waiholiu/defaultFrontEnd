import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Pineapples, Pineapple } from '../models/pineapples';
import gql from 'graphql-tag';


const gqlDeletePineapple = gql`
mutation($deleteId: Int ){
  deletePineapple(pineappleId: $deleteId)
}`;

const gqlGetPineappleList = gql`
{
  pineapples{
    id
    name
  }
}`;


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


  async deletePineapple(pineappleId) {
    const result = await this.apollo.mutate({
      mutation: gqlDeletePineapple,
      variables: {
        deleteId: pineappleId
      }
    }).subscribe({
      next: () => this.getPineappleList(),
      error: (error) => console.log(error)
    });

  }


  ngOnInit() {

    this.getPineappleList();

  }


  private getPineappleList() {
    this.apollo
      .watchQuery<Pineapples>({
        query: gqlGetPineappleList
        , fetchPolicy: 'network-only'
      })
      .valueChanges.subscribe(result => {
        this.pineapples = result.data && result.data.pineapples;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
