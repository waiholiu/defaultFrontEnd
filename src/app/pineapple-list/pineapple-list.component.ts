import { Apollo, QueryRef } from 'apollo-angular';
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

  pineappleListQuery: QueryRef<Pineapples>;


  async deletePineapple(pineappleId) {
    const result = await this.apollo.mutate({
      mutation: gqlDeletePineapple,
      variables: {
        deleteId: pineappleId
      }, refetchQueries: [{ query: gqlGetPineappleList }]
    }).subscribe({
      next: () => console.log('done'),
      error: (error) => console.log(error)
    });

  }


  ngOnInit() {

    this.getPineappleList();

  }

  private getPineappleList() {
    this.pineappleListQuery = this.apollo
      .watchQuery<Pineapples>({
        query: gqlGetPineappleList
        , fetchPolicy: 'network-only'
      });

    this.pineappleListQuery
      .valueChanges.subscribe(result => {
        this.pineapples = result.data && result.data.pineapples;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
