import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueComponent } from './estoque.component';
import { EstoqueFormComponent } from './estoque-form/estoque-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EstoqueItemComponent } from './estoque-item/estoque-item.component';

@NgModule({
  declarations: [EstoqueComponent, EstoqueFormComponent, EstoqueItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports: [EstoqueComponent]
})
export class EstoqueModule { }