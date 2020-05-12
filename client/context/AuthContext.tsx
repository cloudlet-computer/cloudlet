import React, {createContext, useState} from 'react';

const AuthContext = createContext<{
  loggedIn: boolean;
  login(token: string): void;
  logout(): void;
}>({
  loggedIn: false,
  login() {
    throw new Error('Missing AuthProvider; did you forget to render it?');
  },
  logout() {
    throw new Error('Missing AuthProvider; did you forget to render it?');
  },
});

function AuthProvider({children}: {children: React.ReactNode}) {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('Authorization') != null,
  );

  const login = (token: string) => {
    localStorage.setItem('Authorization', token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('Authorization');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{login, logout, loggedIn}}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth};
