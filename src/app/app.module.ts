import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './containers/header/header.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EstoqueModule } from './views/estoque/estoque.module';
import { HomepageModule } from './views/homepage/homepage.module';
import { LoginModule } from './views/login/login.module';
import { ProdutoModule } from './views/produto/produto.module';
import { AboutUsComponent } from './views/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    EstoqueModule,
    HomepageModule,
    LoginModule,
    ProdutoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }