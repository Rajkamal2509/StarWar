import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarwarService {

  constructor(private http: HttpClient) {}

  fetchResource(url: string): Observable<any> {
    return this.http.get<any>(url);
  }



  fetchMultipleResourcesURL(urls: string[]): Observable<any[]> {

    if (urls.length === 0) {
      return new Observable<string[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    return forkJoin(urls.map(url => this.http.get(url)));
  }
  fetchMultipleResources(urls: string[]): Observable<string[]> {
    if (urls.length === 0) {
      return new Observable<string[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    const requests = urls.map(url => this.fetchResource(url));
    return forkJoin(requests).pipe(
      map((responses: any[]) => responses.map(response => response.name))
    );
  }
}
