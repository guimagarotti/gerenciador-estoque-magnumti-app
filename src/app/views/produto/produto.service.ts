import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = environment.baseUrl;
  URL = this.baseUrl + '/produtos';

  constructor(private http: HttpClient) { }

  getProducts(parameter: string, page: number, size: number, status: boolean): any {
    return this.http.get(`${this.URL}?parameter=${parameter}&page=${page}&size=${size}&status=${status}`);
  }

  getProduct(id: string): any {
    return this.http.get(`${this.URL}/${id}`);
  }

  postProduct(product: any): any {
    return this.http.post(`${this.URL}`, product);
  }

  putAlert(product: any, id: string): any {
    return this.http.put(`${this.URL}/${id}`, product);
  }

  deleteProduct(id: string): any {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
