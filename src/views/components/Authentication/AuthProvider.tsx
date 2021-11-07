import React, { useReducer } from "react";
import { AuthReducer } from "../../enums/Reducers";
import { IAuth, IAuthContext, IAuthDispatcher } from "../../types/User";

const AuthContext = React.createContext({} as IAuthContext);
const AuthProvider: React.FC = ({ children }) => {

  const authInitial: IAuth = {
    isAuthenticated: false,
    isReady: true,
    token: "",
    username: "",
  };

  const authReducer = (state: IAuth, action: IAuthDispatcher) => {
    switch (action.type) {
      case AuthReducer.Login:
        const auth: IAuth = {
          isAuthenticated: true,
          isReady: true,
          token: action.user?.token || '',
          username: action.user?.username || '',
        };
        return auth;
      case AuthReducer.Logout:
        return authInitial;
      default:
        return state;
    }
  };

  const [auth, authDispatch] = useReducer(authReducer, authInitial);

  return (
    <AuthContext.Provider value={{ state: auth, dispatcher: authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
