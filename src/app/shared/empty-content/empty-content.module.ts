import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyContentComponent } from './empty-content.component';

@NgModule({
  declarations: [EmptyContentComponent],
  imports: [
    CommonModule
  ],
  exports: [EmptyContentComponent]
})
export class EmptyContentModule { }
