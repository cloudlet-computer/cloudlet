import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  from,
} from '@apollo/client';
import {onError} from '@apollo/link-error';

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
    defaultOptions: {
      mutate: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
    link: from([
      authLink,
      onError(({graphQLErrors}) => {
        if (
          graphQLErrors &&
          graphQLErrors.some(
            (error) => error.extensions?.code === 'UNAUTHENTICATED',
          )
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
