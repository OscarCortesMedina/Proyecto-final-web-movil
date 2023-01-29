import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const API_AUTH_URL = environment.API.API_URL + environment.API.API_AUTH_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData:any): Observable<any> {
    return this.http.post<any>(API_AUTH_URL, loginData);
  }
}
