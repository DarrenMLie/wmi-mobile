import { AxiosRequestConfig, Method } from 'axios';

export function makeRequest<T>(method: Method, url: string, body: T | null = null): AxiosRequestConfig {
  const options: AxiosRequestConfig = {
    method,
    url,
    data: body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return options;
}