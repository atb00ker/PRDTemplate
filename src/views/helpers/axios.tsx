import axios, { AxiosError, AxiosResponse } from 'axios';
import { ServerPath } from '../enums/UrlPath';
import { ILogin, IToken } from '../types/User';
const port = location.protocol === 'http:' ? process.env.REACT_APP_PORT : '443';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.baseURL = `${location.protocol}//${location.hostname}:${port}`;

export type HTTPResponse<T> = AxiosResponse<T>;
export type HTTPError = Error | AxiosError;

const getAuthHeader = (token: string) => {
  return { headers: { Authorization: `Token ${token}` } };
};

const commonErrorMsg = (path: string, error: HTTPError) => {
  const url = new URL(path, axios.defaults.baseURL).toString();
  console.error(`Cant't get ${url} because ${error}`);
};

export const getAuthTokenRequest = (credentials: ILogin): Promise<HTTPResponse<IToken>> => {
  return axios.post(ServerPath.Login, credentials).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.Login, error);
    throw error;
  });
};

export const deleteAuthTokenRequest = (token: string): Promise<HTTPResponse<string>> => {
  return axios.get(ServerPath.Logout, getAuthHeader(token)).catch((error: HTTPError) => {
    commonErrorMsg(ServerPath.Logout, error);
    throw error;
  });
};
