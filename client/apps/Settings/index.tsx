import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider, Box, Heading, Container} from 'theme-ui';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import {THEME} from '../../theme';

import {CreateUser} from './components';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
});

export function App() {
  return (
    <Container p={4}>
      <Heading>Settings</Heading>
      <hr />
      <CreateUser />
    </Container>
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('main'),
);
