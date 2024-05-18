import { CategoryTypeEnum } from './../produto/produto-form/Enums/CategoryTypeEnum.enum';
import { Component } from '@angular/core';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';
import jsPDF from 'jspdf';
import { EstoqueService } from './estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {

  produtos: Array<any> = [];

  categoryType = CategoryTypeEnum;
  selectedCategoryType: CategoryTypeEnum = CategoryTypeEnum.CACHORRO;

  errStatus: boolean = false;
  errType: string = "danger";

  parameter: string = "";

  constructor(
    private defaultLayoutService: DefaultLayoutService,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);

    this.getProducts();
  }

  getProducts() {
    this.estoqueService.getProductsByStatus(true).subscribe((res: any) => {
      this.produtos = res;
      this.defaultLayoutService.emitToggleSpinner(false);
    }, (err: any) => {
      this.errStatus = true;
      this.errType = "danger";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
      this.defaultLayoutService.emitToggleSpinner(false);
    })
  }

  checkEmptyInput() {
    if (this.parameter == '')
      this.getProducts();
  }

  getProductsByName() {
    if (this.parameter.length > 0) {
      this.defaultLayoutService.emitToggleSpinner(true);

      this.estoqueService.getProductsByNameContaining(this.parameter).subscribe((res: any) => {
        this.defaultLayoutService.emitToggleSpinner(false);
        this.produtos = res;
      }, (err: any) => {
        this.defaultLayoutService.emitToggleSpinner(false);
        this.errStatus = true;
        this.errType = "danger";

        setTimeout(() => {
          this.errStatus = false;
        }, 3000);
      })
    }
  }

  getProductsByCategory() {
    this.defaultLayoutService.emitToggleSpinner(true);

    this.estoqueService.getProductsByCategory(this.selectedCategoryType).subscribe((res: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.produtos = res;
    }, (err: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.errStatus = true;
      this.errType = "danger";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    })
  }

  receiveEventRemoveProduct(productId: number) {
    this.removeProduto(productId);
  }

  removeProduto(productId: any): void {
    this.defaultLayoutService.emitToggleSpinner(true);

    this.estoqueService.deleteProduct(productId).subscribe((res: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.errStatus = true;
      this.errType = "danger";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    }, (err: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.getProducts();

      this.errStatus = true;
      this.errType = "success";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    });
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

  clearParameter() {
    this.parameter = "";
    this.getProducts();
  }
}
