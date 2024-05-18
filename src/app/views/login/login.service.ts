import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest } from 'src/app/interfaces/ILoginRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  URL = this.baseUrl + '/usuarios';

  constructor(private http: HttpClient) { }

  getUserById(id: string): any {
    return this.http.get(`${this.URL}/${id}`);
  }

  deleteUser(id: string): any {
    return this.http.delete(`${this.URL}/remove/${id}`);
  }

  authenticateUser(user: any) {
    return this.http.post(`${this.URL}/login`, user);
  }
}
