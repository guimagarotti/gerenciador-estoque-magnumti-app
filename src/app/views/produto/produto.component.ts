import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {

  produtos: Array<any> = [];

  constructor(private defaultLayoutService: DefaultLayoutService) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);

    setTimeout(() => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.getProducts();
    }, 1000);
  }

  getProducts() {
    this.produtos = [
      { id: 1, name: 'Produto 1', status: true, manufacturer: 'Magnus', category: 'Gato', date: '27/08/2024', quantity: 16, code: 'BR451YWQ', minimumLevel: 0, maximumLevel: 100 },
      { id: 2, name: 'Produto 2', status: true, manufacturer: 'Formula', category: 'Cachorro', date: '05/03/2024', quantity: 32, code: 'BR766YZJ', minimumLevel: 30, maximumLevel: 100 },
      { id: 3, name: 'Produto 3', status: false, manufacturer: 'Royal', category: 'Aves', date: '12/12/2023', quantity: 3, code: 'BR109LKO', minimumLevel: 0, maximumLevel: 100 },
      { id: 4, name: 'Produto 4', status: true, manufacturer: 'Pedigree', category: 'Pássaros', date: '16/09/2024', quantity: 67, code: 'BR483ABR', minimumLevel: 0, maximumLevel: 100 },
      { id: 5, name: 'Produto 5', status: true, manufacturer: 'Magnus', category: 'Cachorro', date: '30/02/2024', quantity: 24, code: 'BR049QBN', minimumLevel: 0, maximumLevel: 100 },
      { id: 6, name: 'Produto 6', status: false, manufacturer: 'Askpoof', category: 'Gato', date: '04/05/2023', quantity: 68, code: 'BR012VVO', minimumLevel: 0, maximumLevel: 100 }
    ]
  }

  removeProduto(productId: number): void {
    this.produtos = this.produtos.filter(produto => produto.id !== productId);
    console.log(this.produtos);
  }
}
