import axios, { AxiosRequestConfig, ParamsSerializerOptions } from "axios";
import qs from "qs";

export interface HttpClientInterface {
  doRequest(method: string, url: string, params: {}): any;
}

export class AxiosHttpClient implements HttpClientInterface {
  private client;
  constructor() {
    this.client = axios.create({
      timeout: 3000,
      headers: {
        "Accept-Encoding": "application/json", // content negotiation setting. axios default is gzip
      },
      paramsSerializer: {
        serialize: (params: Record<string, any>) => {
          // axios default serializes array to query string as follwing: param[]=value1&param[]=value2
          // to remove indices([]), use qs module and set arrayFormat to "repeat"
          return qs.stringify(params, { arrayFormat: "repeat" }); // param=value1&param=value2
        },
      },
    });
  }

  async doRequest(method: string, url: string, params?: Record<string, any>) {
    const request: AxiosRequestConfig = { method: method, url: url, params: params };
    const response = await this.client.request(request);
    return response.data;
  }
}
