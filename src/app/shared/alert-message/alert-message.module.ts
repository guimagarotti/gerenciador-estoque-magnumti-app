import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertMessageComponent } from './alert-message.component';

@NgModule({
  declarations: [AlertMessageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AlertModule
  ],
  exports: [AlertMessageComponent]
})
export class AlertMessageModule { }
