import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule
  ],
  exports: [HomepageComponent]
})
export class HomepageModule { }
