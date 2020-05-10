import './global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ThemeProvider} from 'theme-ui';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import {THEME} from './theme';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
});

const Home = React.lazy(() => import('./apps/Home'));
const Notes = React.lazy(() => import('./apps/Notes'));
const Settings = React.lazy(() => import('./apps/Settings'));

function App() {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </React.Suspense>
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={THEME}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('main'),
);
