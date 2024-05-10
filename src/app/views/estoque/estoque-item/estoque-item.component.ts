import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-estoque-item',
  templateUrl: './estoque-item.component.html',
  styleUrls: ['./estoque-item.component.css']
})
export class EstoqueItemComponent {

  modalRef?: BsModalRef;

  @Input() produto: any;
  @Output() eventRemoveProduct: EventEmitter<number> = new EventEmitter<number>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

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
}