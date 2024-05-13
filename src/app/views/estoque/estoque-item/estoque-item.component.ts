import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-estoque-item',
  templateUrl: './estoque-item.component.html',
  styleUrls: ['./estoque-item.component.css'],
})
export class EstoqueItemComponent {

  modalRef?: BsModalRef;

  @Input() produto: any;
  @Output() eventRemoveProduct: EventEmitter<number> = new EventEmitter<number>();

  countByValidate: number = 0;

  alertStatus: boolean = false;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.verifyStorageLevel();
  }

  openModalWithClass(template: TemplateRef<any>, modalClass: string) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: `gray ${modalClass}` })
    );
  }

  closeModal() {
    this.modalRef?.hide();
  }

  emitRemoveProduct(id: number) {
    this.eventRemoveProduct.emit(id);
    this.closeModal();
  }

  verifyStorageLevel() {
    const porcentagemMinima = this.produto.minimumLevel * 0.2;

    if (this.produto.quantity <= this.produto.minimumLevel ||
      this.produto.quantity <= this.produto.minimumLevel + porcentagemMinima) {
      this.countByValidate++;
    } else if (this.produto.quantity >= this.produto.maximumLevel) {
      this.countByValidate++;
    }

    if (this.countByValidate > 0) {
      this.alertStatus = true;

      setTimeout(() => {
        this.alertStatus = false;
      }, 3000);
    }
  }

  verifyQuantityLevelForColor() {
    const porcentagemMinima = this.produto.minimumLevel * 0.2;

    if (this.produto.quantity <= this.produto.minimumLevel ||
      this.produto.quantity <= this.produto.minimumLevel + porcentagemMinima) {
      return 'text-danger fw-bold';
    } else if (this.produto.quantity >= this.produto.maximumLevel) {
      this.countByValidate++;
      return '';
    } else {
      return '';
    }
  }
}
