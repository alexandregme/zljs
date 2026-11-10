export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
  /**
   * Sends the access token of `AuthProvider` as `Authorization: Bearer`. Off by
   * default, so the token only goes to an API that is turned on for it.
   */
  withAuth?: boolean;
}

export interface HttpRequestConfig {
  payload?: FormData | object;
  params?: object;
  headers?: Record<string, string>;
  silent?: boolean;
}
