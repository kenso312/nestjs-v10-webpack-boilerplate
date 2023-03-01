import { ECONNREFUSED } from 'constants';
import { Injectable, Logger } from '@nestjs/common';
import { NormalException } from '@/exception';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpService {
  private readonly instance: AxiosInstance;

  private readonly logger = new Logger(HttpService.name);

  constructor() {
    const instance = axios.create({
      timeout: 5000,
    });

    instance.interceptors.request.use(
      // Do something before request is sent
      (config) => {
        return config;
      },
      // Do something with request error
      (error: AxiosError) => {
        this.logger.error(error.toJSON());
      }
    );

    instance.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to trigger
      (response) => {
        if (response?.data) this.logger.debug(response.data);

        return response;
      },
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      (error: AxiosError) => {
        if ((error as any)?.errno === ECONNREFUSED * -1)
          throw NormalException.HTTP_REQUEST_TIMEOUT();

        if (error?.response?.data) this.logger.debug(error.response.data);

        this.logger.error(error.toJSON());
      }
    );

    this.instance = instance;
  }

  getInstance() {
    return this.instance;
  }

  async get<T = any, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>
  ): Promise<T> {
    return (await this.instance.get(url, config))?.data;
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.head(url, config))?.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.delete(url, config))?.data;
  }

  async options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.options(url, config))?.data;
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.post(url, data, config))?.data;
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.put(url, data, config))?.data;
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.patch(url, data, config))?.data;
  }
}
