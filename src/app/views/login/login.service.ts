import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  URL = this.baseUrl + '/usuarios';

  constructor(private http: HttpClient) { }

  registerUser(form: any) {
    return this.http.post<any>(`${this.URL}/create`, form, { observe: 'response' });
  }

  verifyUser(form: any) {
    return this.http.get<any>(`${this.URL}/create`);
  }
}
