import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueComponent } from './estoque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EstoqueItemComponent } from './estoque-item/estoque-item.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EmptyContentModule } from 'src/app/shared/empty-content/empty-content.module';
import { ToastModule } from 'primeng/toast';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertMessageModule } from 'src/app/shared/alert-message/alert-message.module';

@NgModule({
  declarations: [EstoqueComponent, EstoqueItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    EmptyContentModule,
    ToastModule,
    AlertModule,
    AlertMessageModule
  ],
  exports: [EstoqueComponent]
})
export class EstoqueModule { }
