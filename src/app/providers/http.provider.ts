import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../environments/environment'

@Injectable()
export class RestCalls {
  public loggedStatus = false;
  public apiUrl = environment.baseUrl;
  // http: HttpClient
  constructor(private http: HttpClient) {

  }

  getAllCompany(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/users')
      .pipe(tap(users => console.log('get company')))
  }

}