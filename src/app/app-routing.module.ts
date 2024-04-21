import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TelaAdminComponent } from './components/tela-admin/tela-admin.component';
import { TelaUploadComponent } from './components/tela-upload/tela-upload.component';
import { ListaContaComponent } from './components/lista-contas/lista-contas.component';
import { CriarContasComponent } from './components/criar-contas/criar-contas.component';
import { InternacaoComponent } from './components/criar-internacao/internacao.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas.component';
import { ListaServicosComponent } from './components/lista-servicos/lista-servicos.component';
import { TelaDeEscohaComponent } from './components/tela-de-escolha/tela-de-escoha.component';
import { TelaRelatoriosComponent } from './components/tela-relatorios/tela-relatorios.component';
import { ListaInternacaoComponent } from './components/lista-internacao/lista-internacao.component';
import { CadastroOperadoraComponent } from './components/cadastro-operadora/cadastro-operadora.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'login-admin',
    component:AdminComponent
  },
  {
    path:'admin-menu',
    component:TelaAdminComponent
  },
  {
    path:'admin/users',
    component:UsuariosComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'lista-internacao',
    component:ListaInternacaoComponent,
  },
  {
    path:'lista-servicos',
    component:ListaServicosComponent,
  },
  {
    path:'criar-internacao',
    component:InternacaoComponent
  },
  {
    path:'criar-conta',
    component:CriarContasComponent
  },
  {
    path:'tela-de-escolha',
    component:TelaDeEscohaComponent,
  },
  {
    path:'lista-contas',
    component:ListaContaComponent,
  },
  {
    path:'tela-upload',
    component:TelaUploadComponent
  },
  {
    path:'cadastro-operadoras',
    component:CadastroOperadoraComponent
  },
  {
    path:'estatisticas',
    component:EstatisticasComponent
  },
  {
    path:'relatorios',
    component:TelaRelatoriosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
