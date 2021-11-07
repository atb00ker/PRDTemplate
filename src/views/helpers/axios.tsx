import axios, { AxiosError, AxiosResponse } from 'axios';
import { ServerPath } from '../enums/UrlPath';
import { IAuth, IToken } from '../types/IUser';
const port = location.protocol === 'http:' ? process.env.REACT_APP_PORT : '443';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.baseURL = `${location.protocol}//${location.hostname}:${port}`;

export type HTTPResponse<T> = AxiosResponse<T>;
export type HTTPError = Error | AxiosError;

const getAuthHeader = () => {
  const token: string = 'test';
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAuthTokenRequest = (credentials: IAuth): Promise<HTTPResponse<IToken>> => {
  return axios.post(ServerPath.Login, credentials, getAuthHeader())
    .catch((error: HTTPError) => {
      const url = new URL(ServerPath.Register, axios.defaults.baseURL).toString();
      console.error(`Cant't get ${url} because ${error}`);
      throw error;
    });
};
