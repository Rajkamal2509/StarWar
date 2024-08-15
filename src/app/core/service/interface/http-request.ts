import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface IHttpRequest {
  headers?: HttpHeaders;
  observe?: any;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: any | "json";
  withCredentials?: boolean;
  body?: any;
}
