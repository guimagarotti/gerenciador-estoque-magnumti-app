import { Component } from '@angular/core';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {

  //id, nome, fabricante, validade, quantidade, lote
  produtos: Array<any> = [
    { id: 1, nome: 'Produto 1', fabricante: 'Magnus', categoria: 'Gato', validade: '27/08/2024', quantidade: 16, lote: 'BR451YWQ' },
    { id: 2, nome: 'Produto 2', fabricante: 'Formula', categoria: 'Cachorro', validade: '05/03/2024', quantidade: 32, lote: 'BR766YZJ' },
    { id: 3, nome: 'Produto 3', fabricante: 'Royal Canin', categoria: 'Aves', validade: '12/12/2023', quantidade: 3, lote: 'BR109LKO' },
    { id: 4, nome: 'Produto 4', fabricante: 'Pedigree', categoria: 'Pássaros', validade: '16/09/2024', quantidade: 67, lote: 'BR483ABR' },
    { id: 5, nome: 'Produto 5', fabricante: 'Magnus', categoria: 'Cachorro', validade: '30/02/2024', quantidade: 24, lote: 'BR049QBN' },
    { id: 6, nome: 'Produto 6', fabricante: 'Askpoof', categoria: 'Gato', validade: '04/05/2023', quantidade: 68, lote: 'BR012VVO' }
  ];

  constructor(private defaultLayoutService: DefaultLayoutService) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);

    setTimeout(() => {
      this.defaultLayoutService.emitToggleSpinner(false);
    }, 1000);
  }
}
