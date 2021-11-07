import React, { useEffect, useReducer } from 'react';
import { AuthReducer } from '../../enums/Reducers';
import { deleteAuthTokenRequest, HTTPResponse } from '../../helpers/axios';
import { IAuth, IAuthContext, IAuthDispatcher } from '../../types/User';

const AuthContext = React.createContext({} as IAuthContext);
const AuthProvider: React.FC = ({ children }) => {
  const localStorageTokenKey = 'usertoken',
    localStorageUsernameKey = 'username';

  const authInitial: IAuth = {
    isAuthenticated: false,
    isReady: false,
    token: '',
    username: '',
  };

  useEffect(() => {
    const token = localStorage.getItem(localStorageTokenKey);
    const username = localStorage.getItem(localStorageUsernameKey);
    if (token && username) authDispatch({ type: AuthReducer.Login, user: { token, username } });
    else authDispatch({ type: AuthReducer.Logout });
  }, []);

  const authReducer = (state: IAuth, action: IAuthDispatcher) => {
    switch (action.type) {
      case AuthReducer.Login:
        const token = action.user?.token || '';
        const username = action.user?.username || '';
        localStorage.setItem(localStorageTokenKey, token);
        localStorage.setItem(localStorageUsernameKey, username);
        const auth: IAuth = {
          isAuthenticated: true,
          isReady: true,
          token,
          username,
        };
        return auth;
      case AuthReducer.Logout:
        localStorage.removeItem(localStorageTokenKey);
        localStorage.removeItem(localStorageUsernameKey);
        return { ...authInitial, isReady: true };
      default:
        return state;
    }
  };

  const [auth, authDispatch] = useReducer(authReducer, authInitial);

  return (
    <AuthContext.Provider value={{ state: auth, dispatcher: authDispatch }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
