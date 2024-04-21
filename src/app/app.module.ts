import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutenticacaoService } from './auth/autenticacao.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { getPortuguesePaginatorIntl } from './linguagem-paginator-intl';
import { RodapeComponent } from './components/rodape/rodape.component';
import { VersionComponent } from './components/version/version.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './components/loader/loading.interceptor';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { SpinnerComponent } from './components/loader/spinner/spinner.component';
import { TelaAdminComponent } from './components/tela-admin/tela-admin.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { OperadorasComponent } from './components/operadoras/operadoras.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { TelaUploadComponent } from './components/tela-upload/tela-upload.component';
import { ListaContaComponent } from './components/lista-contas/lista-contas.component';
import { CriarContasComponent } from './components/criar-contas/criar-contas.component';
import { InternacaoComponent } from './components/criar-internacao/internacao.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas.component';
import { FecharContasComponent } from './components/fechar-contas/fechar-contas.component';
import { ListaServicosComponent } from './components/lista-servicos/lista-servicos.component';
import { TelaDeEscohaComponent } from './components/tela-de-escolha/tela-de-escoha.component';
import { ListaInternacaoService } from './components/lista-internacao/lista-internacao.service';
import { TelaRelatoriosComponent } from './components/tela-relatorios/tela-relatorios.component';
import { ModalInternacaoComponent } from './components/modal-internacao/modal-internacao.component';
import { ListaInternacaoComponent } from './components/lista-internacao/lista-internacao.component';
import { AdicionarPacienteComponent } from './components/adicionar-paciente/adicionar-paciente.component';
import { CadastroOperadoraComponent } from './components/cadastro-operadora/cadastro-operadora.component';
import { HistoricoInternacaoComponent } from './components/historico-internacao/historico-internacao.component';
import { CriarContaHospitaisComponent } from './components/criar-contas/criar-conta-hospitais/criar-conta-hospitais.component';
import { CriarContaCtiComponent } from './components/criar-contas/criar-conta-cti/criar-conta-cti.component';
import { DocumentosContaComponent } from './components/documentos-conta/documentos-conta.component';
import { ModalUploadComponent } from './components/modal-upload-documentos-conta/modal-upload.component';
import { MotivoPendenciaComponent } from './components/motivo-pendencia/motivo-pendencia.component';
import { ServicosCtiComponent } from './components/servicos-cti/servicos-cti.component';
import { ServicosHospitaisComponent } from './components/servicos-hospitais/servicos-hospitais.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    RodapeComponent,
    VersionComponent,
    SpinnerComponent,
    UsuariosComponent,
    TelaAdminComponent,
    CabecalhoComponent,
    ListaContaComponent,
    OperadorasComponent,
    InternacaoComponent,
    TelaUploadComponent,
    RelatoriosComponent,
    CriarContasComponent,
    EstatisticasComponent,
    TelaDeEscohaComponent,
    FecharContasComponent,
    CriarContaCtiComponent,
    ListaServicosComponent,
    TelaRelatoriosComponent,
    ListaInternacaoComponent,
    ModalInternacaoComponent,
    CriarContaHospitaisComponent,
    CadastroOperadoraComponent,
    AdicionarPacienteComponent,
    HistoricoInternacaoComponent,
    DocumentosContaComponent,
    ModalUploadComponent,
    MotivoPendenciaComponent,
    ServicosCtiComponent,
    ServicosHospitaisComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    MatTabsModule,
    BrowserModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    TagInputModule,
    MatChipsModule,
    TextMaskModule,
    // NgxChartsModule,
    MatSelectModule,
    HttpClientModule,
    MatTooltipModule,
    MatSidenavModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    SweetAlert2Module.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl,useValue: getPortuguesePaginatorIntl()
    },
    DatePipe,
    ListaInternacaoService,
    AutenticacaoService,
    TelaDeEscohaComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
