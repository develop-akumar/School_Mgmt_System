import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiurl: string = environment.apiurl; 

  constructor(private http: HttpClient) {}

  getNotices() {
    return this.http.get(`${this.apiurl}/notice`);
  }

  getEvents():Observable<any>{
    return this.http.get(`${this.apiurl}/event`)
  }
}
