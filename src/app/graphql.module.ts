import { LocalStorageService } from 'angular-2-local-storage';
import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

// const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql'; //our test Graphql Server which returns rates
const uri = 'https://localhost:5001/graphql'; //our test Graphql Server which returns rates

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {

  // constructor(
  //   apollo: Apollo,
  //   httpLink: HttpLink,
  //   localStorage: LocalStorageService
  // ) {
  //   const http = httpLink.create({uri});

  //   const authLink = new ApolloLink((operation, forward) => {
  //     // Get the authentication token from local storage if it exists
  //     const token = localStorage.get('loginToken');

  //     // Use the setContext method to set the HTTP headers.
  //     operation.setContext({
  //         headers: {
  //             'Authorization': token ? `Bearer ${token}` : ''
  //         }
  //     });

  //     // Call the next link in the middleware chain.
  //     return forward(operation);
  //   });

  //   apollo.create({
  //     link: authLink.concat(http),
  //     cache: new InMemoryCache()
  //     // other options like cache
  //   });
  // }

}
