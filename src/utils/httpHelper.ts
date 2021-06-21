import { AxiosRequestConfig, Method } from 'axios';
import SecureStore from 'utils/secureStore';

interface headersType {
  Accept: string;
  'Content-Type': string;
  Authorization?: string;
}

export async function makeRequest<T>(method: Method, url: string, body: T | null = null): Promise<AxiosRequestConfig> {
  const jwt = await SecureStore.getItem('jwt');
  const headers: headersType = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (jwt) {
    headers['Authorization'] = 'Bearer ' + jwt
  }

  const options: AxiosRequestConfig = {
    method,
    url,
    data: body,
    headers,
  };

  return options;
}
