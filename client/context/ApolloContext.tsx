import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  from,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

import {useAuth} from './AuthContext';

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: any) => {
    const {headers} = context;
    const token = localStorage.getItem('Authorization');

    return {
      headers: {
        ...headers,
        authorization: token == null ? '' : token,
      },
    };
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

function WrappedApolloProvider({children}: {children: React.ReactNode}) {
  const {logout} = useAuth();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      authLink,
      onError(({graphQLErrors}) => {
        // TODO: Handle errors
        //       https://www.apollographql.com/docs/react/api/link/apollo-link-error/

        if (
          graphQLErrors &&
          graphQLErrors.some(({message}) => message.includes('not accessible'))
        ) {
          logout();
        }
      }),
      httpLink,
    ]),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export {WrappedApolloProvider as ApolloProvider};
