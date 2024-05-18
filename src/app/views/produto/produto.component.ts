import { EstoqueService } from './../estoque/estoque.service';
import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DefaultLayoutService } from 'src/app/containers/default-layout/default-layout.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {

  modalRef?: BsModalRef;

  produtos: Array<any> = [];

  errStatus: boolean = false;
  errType: string = "danger";

  productIdToRemove!: string;

  parameter: string = "";
  status: boolean = true;

  constructor(
    private defaultLayoutService: DefaultLayoutService,
    private estoqueService: EstoqueService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.defaultLayoutService.emitToggleSpinner(true);
    this.getProducts();
  }

  getProducts() {
    this.estoqueService.getProductsByStatus(this.status).subscribe((res: any) => {
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

  getProductsByName() {
    if (this.parameter.length > 0) {
      this.defaultLayoutService.emitToggleSpinner(true);

      this.estoqueService.getProductsByNameContaining(this.parameter).subscribe((res: any) => {
        this.defaultLayoutService.emitToggleSpinner(false);
        this.produtos = res;
        console.log(res);
      }, (err: any) => {
        this.errStatus = true;
        this.errType = "danger";

        setTimeout(() => {
          this.errStatus = false;
        }, 3000);
        this.defaultLayoutService.emitToggleSpinner(false);
      })
    }
  }

  /* getProductsByStatus() {
    this.defaultLayoutService.emitToggleSpinner(true);

    this.estoqueService.getProductsByStatus(this.status).subscribe((res: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      this.produtos = res;
      console.log(res);
    }, (err: any) => {
      this.defaultLayoutService.emitToggleSpinner(false);
      console.log(err);
    })
  } */

  checkEmptyInput() {
    if (this.parameter == '')
      this.getProducts();
  }

  openModal(template: TemplateRef<any>, productId: string) {
    this.productIdToRemove = productId;

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: `gray modal-sm` })
    );
  }

  closeModal() {
    this.modalRef?.hide();
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
      console.log(err.error.text);
      this.defaultLayoutService.emitToggleSpinner(false);
      this.closeModal();
      this.getProducts();

      this.errStatus = true;
      this.errType = "success";

      setTimeout(() => {
        this.errStatus = false;
      }, 3000);
    });
  }

  clearParameter() {
    this.parameter = "";
    this.getProducts();
  }
}
