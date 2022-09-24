import { Injectable, Logger } from '@nestjs/common';
import { NormalException } from '@/exception/normal.exception';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const ECONNREFUSED = 'ECONNREFUSED';
@Injectable()
export class HttpService {
  private readonly instance: AxiosInstance;

  private readonly logger = new Logger(HttpService.name);

  constructor() {
    this.instance = axios.create({
      timeout: 5000,
    });

    this.instance.defaults.transformResponse = (response: AxiosResponse) => {
      return JSON.parse(String(response)).data;
    };

    this.instance.interceptors.request.use(
      // Do something before request is sent
      (config: AxiosRequestConfig) => {
        return config;
      },
      // Do something with request error
      (error: AxiosError) => {
        this.logger.error(error.response || String(undefined));
        return Promise.resolve(error);
      }
    );

    this.instance.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to trigger
      (response: AxiosResponse) => {
        this.logger.debug(response);
        return response;
      },
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      (error: AxiosError) => {
        if (error.code === ECONNREFUSED)
          throw NormalException.HTTP_REQUEST_TIMEOUT();

        this.logger.error(error.response || String(undefined));
        return error.response;
      }
    );
  }

  getInstance() {
    return this.instance;
  }

  async get<T = any, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>
  ): Promise<T> {
    return this.instance.get(url, config);
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.head(url, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  async options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.options(url, config);
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}
