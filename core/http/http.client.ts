import axios, { type AxiosError } from "axios";
import { useAppStore } from "../state/app";
import { useToastStore } from "../state/toast";
import type { HttpClientConfig, HttpRequestConfig } from "./http.types";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export class HTTPClient {
  baseUrl: string;
  headers: Record<string, string>;

  constructor(config?: HttpClientConfig) {
    this.baseUrl = config?.baseUrl ?? "/api";
    this.headers = config?.headers ?? {};
  }

  private async request<T = unknown>(
    method: HttpMethod,
    url: string,
    config?: HttpRequestConfig,
  ): Promise<T | undefined> {
    const silent = config?.silent ?? false;
    const headers = { ...this.headers, ...config?.headers };

    if (!silent) useAppStore.getState().startFetching();

    try {
      let response;

      switch (method) {
        case "get":
          response = await axios.get(`${this.baseUrl}${url}`, {
            headers,
            params: config?.params,
          });
          break;
        case "post":
          response = await axios.post(
            `${this.baseUrl}${url}`,
            config?.payload,
            { headers },
          );
          break;
        case "put":
          response = await axios.put(
            `${this.baseUrl}${url}`,
            config?.payload,
            { headers },
          );
          break;
        case "delete":
          response = await axios.delete(`${this.baseUrl}${url}`, {
            headers,
            data: config?.payload,
          });
          break;
        case "patch":
          response = await axios.patch(
            `${this.baseUrl}${url}`,
            config?.payload,
            { headers },
          );
          break;
      }

      return response.data as T;
    } catch (e: unknown) {
      const error = e as AxiosError;
      useToastStore
        .getState()
        .error(`Something went wrong with the server - ${error.message}`);
      return undefined;
    } finally {
      if (!silent) useAppStore.getState().finishFetching();
    }
  }

  async get<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<T | undefined> {
    return this.request<T>("get", url, config);
  }

  async post<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<T | undefined> {
    return this.request<T>("post", url, config);
  }

  async put<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<T | undefined> {
    return this.request<T>("put", url, config);
  }

  async delete<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<T | undefined> {
    return this.request<T>("delete", url, config);
  }

  async patch<T = unknown>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<T | undefined> {
    return this.request<T>("patch", url, config);
  }
}
