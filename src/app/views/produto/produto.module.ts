import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { RouterModule } from '@angular/router';
import { EmptyContentModule } from 'src/app/shared/empty-content/empty-content.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';
import { AlertMessageModule } from 'src/app/shared/alert-message/alert-message.module';

@NgModule({
  declarations: [ProdutoComponent, ProdutoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxSpinnerModule,
    RouterModule,
    EmptyContentModule,
    AlertModule,
    HttpClientModule,
    AlertMessageModule
  ],
  exports: [ProdutoComponent, ProdutoFormComponent]
})
export class ProdutoModule { }
