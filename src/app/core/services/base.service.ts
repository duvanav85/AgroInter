import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//Environment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

  private apiUrl: string = environment.apiBaseUrl

  constructor(private serviceHttp: HttpClient) {}

  private static GenerateHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }

  public GenerateParams(param: any): HttpParams {
    let httpParams = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, '' + param[key]);
      }
    }
    return httpParams;
  }

  public Get<R>(urlEndpoint: string, params?: any): Observable<R> {
    const url = `${this.apiUrl}/${urlEndpoint}`;
    const options = { params: this.GenerateParams(params), headers: BaseService.GenerateHeaders() };
    return this.serviceHttp.get<R>(url, options).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public Post<R>(urlEndpoint: string, payload: any): Observable<R> {
    const url = `${this.apiUrl}/${urlEndpoint}`;
    return this.serviceHttp.post<R>(url, payload, { headers: BaseService.GenerateHeaders() }).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
