// React Forms
export type ILogin = {
  username: string;
  password: string;
};

export type IToken = {
  token: string;
};

// AuthContext

export type IAuthDispatcher = {
  type: string;
  user?: IAuthDispatcherUser;
};

export type IAuthContext = {
  state: IAuth;
  dispatcher: React.Dispatch<IAuthDispatcher>;
};

export type IAuthDispatcherUser = {
  username: string;
  token: string;
};

export type IAuth = {
  isAuthenticated: boolean;
  isReady: boolean;
  token: string;
  username: string;
};
