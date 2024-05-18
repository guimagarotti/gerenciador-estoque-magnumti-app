import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryTypeEnum } from '../produto/produto-form/Enums/CategoryTypeEnum.enum';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  baseUrl = environment.baseUrl;
  URL = this.baseUrl + '/produtos';

  constructor(private http: HttpClient) { }

  getProducts(): any {
    return this.http.get(`${this.URL}`);
  }

  getProductById(id: string): any {
    return this.http.get(`${this.URL}/${id}`);
  }

  getProductsByStatus(status: boolean) {
    return this.http.get(`${this.URL}/byStatus/${status}`);
  }

  getProductsByCategory(category: CategoryTypeEnum) {
    return this.http.get(`${this.URL}/byCategory/${category}`);
  }

  getProductsByName(productName: string) {
    return this.http.get(`${this.URL}/byName/${productName}`);
  }

  getProductsByNameContaining(parcialProductName: string) {
    return this.http.get(`${this.URL}/byNameContaining/${parcialProductName}`);
  }

  postProduct(product: any): any {
    return this.http.post(`${this.URL}/add`, product);
  }

  putAlert(product: any, id: string): any {
    return this.http.put(`${this.URL}/edit/${id}`, product);
  }

  deleteProduct(id: string): any {
    return this.http.delete(`${this.URL}/remove/${id}`);
  }
}
