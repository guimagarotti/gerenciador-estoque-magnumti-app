import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { ProdutoComponent } from './views/produto/produto.component';
import { EstoqueComponent } from './views/estoque/estoque.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { ProdutoFormComponent } from './views/produto/produto-form/produto-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    data: {
      title: 'Home Page'
    },
  },
  {
    path: 'sobrenos',
    component: AboutUsComponent,
    data: {
      title: 'Sobre nós'
    },
  },
  {
    path: 'produto',
    component: ProdutoComponent,
    data: {
      title: 'Produto'
    },
  },
  {
    path: 'produto/form',
    component: ProdutoFormComponent,
    data: {
      title: 'Produto Form'
    },
  },
  {
    path: 'produto/form/:id',
    component: ProdutoFormComponent,
    data: {
      title: 'Produto Form'
    },
  },
  {
    path: 'estoque',
    component: EstoqueComponent,
    data: {
      title: 'Estoque'
    },
  },
  {
    path: '**',
    component: HomepageComponent,
    data: {
      title: 'Homepage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
