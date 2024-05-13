import { Component } from '@angular/core';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {

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
      { id: 1, name: 'Produto 1', status: true, manufacturer: 'Magnus', category: 'Gato', date: '27/08/2024', quantity: 16, code: 'BR451YWQ', minimumLevel: 10, maximumLevel: 100 },
      { id: 2, name: 'Produto 2', status: true, manufacturer: 'Formula', category: 'Cachorro', date: '05/03/2024', quantity: 32, code: 'BR766YZJ', minimumLevel: 25, maximumLevel: 100 },
      { id: 3, name: 'Produto 3', status: false, manufacturer: 'Royal Canin', category: 'Aves', date: '12/12/2023', quantity: 2, code: 'BR109LKO', minimumLevel: 1, maximumLevel: 100 },
      { id: 4, name: 'Produto 4', status: true, manufacturer: 'Pedigree', category: 'Pássaros', date: '16/09/2024', quantity: 67, code: 'BR483ABR', minimumLevel: 0, maximumLevel: 100 },
      { id: 5, name: 'Produto 5', status: true, manufacturer: 'Magnus', category: 'Cachorro', date: '30/02/2024', quantity: 24, code: 'BR049QBN', minimumLevel: 0, maximumLevel: 100 },
      { id: 6, name: 'Produto 6', status: false, manufacturer: 'Askpoof', category: 'Gato', date: '04/05/2023', quantity: 68, code: 'BR012VVO', minimumLevel: 0, maximumLevel: 100 }
    ]
  }

  receiveEventRemoveProduct(productId: number) {
    this.removeProduto(productId);
  }

  removeProduto(productId: number): void {
    this.produtos = this.produtos.filter(produto => produto.id !== productId);
    console.log(this.produtos);
  }

  gerarRelatorioPDF(produtos: any[]): void {
    const doc = new jsPDF();
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/0${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;
    const horaAtual = `${dataAtual.getHours()}h${dataAtual.getMinutes()}`;

    const centerX = doc.internal.pageSize.getWidth() / 2;
    const centerY = doc.internal.pageSize.getHeight() / 2;
    doc.text('Relatório de Estoque Magnum TI', centerX, 10, { align: 'center' });
    doc.text(`Data: ${dataFormatada} - Horário: ${horaAtual}`, centerX, 20, { align: 'center' });

    let y = 40;
    let pageIndex = 1;

    produtos.forEach(produto => {
      const itemHeight = 80; // Altura estimada de cada item com informações adicionais

      // Verifica se há espaço suficiente na página atual para adicionar o novo item
      const availableSpace = 297 - y; // Altura da página (297 mm é a altura padrão de uma página A4)
      if (itemHeight > availableSpace) {
        doc.addPage(); // Adiciona uma nova página
        y = 40; // Reinicia a posição Y para os dados da nova página
        pageIndex++; // Incrementa o número da página
      }

      doc.setFontSize(17);
      doc.text(`${produto.name}`, 10, y);
      doc.setFontSize(12);
      doc.text(`Fabricante: ${produto.manufacturer}`, 10, y + 10);
      doc.text(`Categoria: ${produto.category}`, 10, y + 20);
      doc.text(`Quantidade em Estoque: ${produto.quantity}`, 10, y + 30);
      doc.text(`Validade: ${produto.date}`, 10, y + 40);
      doc.text(`Nível Mínimo no Estoque: ${produto.minimumLevel}`, 10, y + 50);
      doc.text(`Nível Máximo no Estoque: ${produto.maximumLevel}`, 10, y + 60);
      doc.text(`-------------------------------------------------------------------`, 10, y + 70);
      y += itemHeight; // Incrementa a posição Y para o próximo produto
    });

    for (let i = 1; i <= pageIndex; i++) {
      doc.setFontSize(10);
      doc.setPage(i);
      doc.text(`Página ${i}`, 10, 10);
    }

    doc.save('relatorio_estoque.pdf');
  }
}
