import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHttpRequest } from '../interface/http-request';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) {}

  //Method is to process the http GET method in the API
  get<T>(url: string, options?: IHttpRequest): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  //To process the POST method
  post<T>(url: string, params: any, options?: IHttpRequest): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http
      .post<T>(url, params, options)
      .pipe(catchError(this.handleError));
  }

  //To process the PUT method
  put<T>(url: string, params: any, options?: IHttpRequest): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http
      .put<T>(url, params, options)
      .pipe(catchError(this.handleError));
  }

  // To process the DELETE method
  delete<T>(url: string, options?: IHttpRequest): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // return throwError(error);

    let errorMessage : any = '';

    if (error.error instanceof ErrorEvent) {
 
      // client-side error
 
      errorMessage =` Error : ${error.error.message}`;
 
    } else {
 
      // server-side error
 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 
    }

    // window.alert(errorMessage);
 
    return throwError(errorMessage);
 
  }
}
