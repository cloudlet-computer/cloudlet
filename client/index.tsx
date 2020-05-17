import './global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Login, Navbar} from './components';
import {ApolloProvider, AuthProvider, useAuth} from './context';

const Home = React.lazy(() => import('./apps/Home'));
const Notes = React.lazy(() => import('./apps/Notes'));
const Settings = React.lazy(() => import('./apps/Settings'));

function App() {
  const {loggedIn} = useAuth();

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <div>
      <Navbar />
      <React.Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById('main'),
);
