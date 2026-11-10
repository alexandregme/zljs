export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export interface HttpRequestConfig {
  payload?: FormData | object;
  params?: object;
  headers?: Record<string, string>;
  silent?: boolean;
}
