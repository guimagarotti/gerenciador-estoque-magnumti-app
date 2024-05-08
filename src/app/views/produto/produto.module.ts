import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProdutoComponent, ProdutoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxSpinnerModule,
    RouterModule
  ],
  exports: [ProdutoComponent, ProdutoFormComponent]
})
export class ProdutoModule { }
