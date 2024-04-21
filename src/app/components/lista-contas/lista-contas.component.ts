import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaContasService } from './lista-contas.service';
import { MatTableDataSource } from '@angular/material/table';
import { DarkModeService } from '../utils/dark-mode.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-conta',
  templateUrl: './lista-contas.html',
  styleUrls: ['./lista-contas.css'],
})
export class ListaContaComponent implements OnInit {
  //#region variaveis
  aba = 0;
  contas: any;
  usuario: any;
  pageIndex = 0;
  idUsuario: any;
  totalContas = 0;
  closeResult: any;
  filtroAtivo = false;
  pessoaInclusao: any;
  listaOperadoras = [];
  totalContasObito = 0;
  dateTime = new Date();
  dataSourceContas: any;
  totalContasAPedido = 0;
  usuarioSelecionado: any;
  totalContasHomeCare = 0;
  unidadeAtendimento: any;
  listaColaboradores = [];
  usuarioDiferente = false;
  totalContasMelhorado = 0;
  operadoraSelecioanda: any;
  totalContasTransferido = 0;
  dataSourceContasObito: any;
  listaStatusConta: any = [];
  totalContasApartamento = 0;
  dataSourceContasAPedido: any;
  dataSourceContasHomeCare: any;
  modoEscuroListaContas = false;
  dataSourceContasMelhorado: any;
  dataSourceContasTransferido: any;
  dataSourceContasApartamento: any;
  //#endregion

  constructor(
    private router: Router,
    private location: Location,
    private token: TokenService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private service: ListaContasService,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroListaContas = modoEscuro;
    });
  }

  contaForm = new FormGroup({
    conta: new FormControl(),
    usuario: new FormControl(),
    paciente: new FormControl(),
    operadora: new FormControl(),
    dataFinal: new FormControl(),
    localConta: new FormControl(),
    statusConta: new FormControl(),
    dataInicial: new FormControl(),
    atendimento: new FormControl(),
    statusValidade: new FormControl(),
  });

  ngOnInit() {
    this.filtroAtivo = false;
    this.usuarioDiferente = false;

    if (!this.token.possuiToken()) {
      this.router.navigate(['/', 'login']);
    }

    this.route.queryParamMap.subscribe((params) => {
      this.unidadeAtendimento = params.get('unidadeAtendimento');
      this.idUsuario = params.get('idUsuario');
    });

    if(this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11){
      this.listaStatusConta = [
        { descricao:'Todos', id:0 },
        { descricao:'Pendência Evolução',id:7 },
        { descricao:'Falta Solicitar',id:8 },
        { descricao:'Troca de Acomodação',id:9 },
        { descricao:'Em Analise',id:3 },
        { descricao:'Falta Contábil',id:10 },
        { descricao:'Em Tratativa',id:11 },
        { descricao:'Negado',id:12 },
        { descricao:'Fazer Relatório',id:14 },
        { descricao:'Relatório Feito',id:16 },
        { descricao:'Falta Lançar na Conta',id:13 },
        { descricao:'Fazer Espelho',id:15 },
        { descricao:'Fechado',id:2 },
      ]
    }else{
      this.listaStatusConta = [
        { descricao:'TODOS', id: 0 },
        { descricao:'PENDÊNCIA', id: 1 },
        { descricao:'FECHADO', id: 2 },
        { descricao:'EM ANÁLISE', id: 3 },
        { descricao:'EM COBRANÇA', id: 4 },
        { descricao:'EM AUDITORIA EXTERNA', id: 5 },
        { descricao:'GLOSA NA AUDITORIA', id: 6 },
        { descricao:'GLOSA NA AUDITORIA', id: 6 },
        { descricao:'ENVIADO PARA DIGITAÇÃO', id: 17 },
      ]
    }

    this.contaForm.get('conta')?.setValue(this.getContaLocalStorage() ?? null);
    this.contaForm.get('localConta')?.setValue(this.getLocalContaLocalStorage() ?? 0);
    this.contaForm.get('operadora')?.setValue(this.getOperadoraLocalStorage() ?? null);
    this.contaForm.get('atendimento')?.setValue(this.getAtendimentoLocalStorage() ?? null);
    this.contaForm.get('usuario')?.setValue(this.getUsuarioLocalStorage() ?? this.idUsuario);
    this.contaForm.get('statusValidade')?.setValue(this.getStatusValidadeLocalStorage() ?? 0);
    if(this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11){
      this.contaForm.get('statusConta')?.setValue(this.getStatusContaLocalStorage() ?? 7);
    }else{
      this.contaForm.get('statusConta')?.setValue(this.getStatusContaLocalStorage() ?? 1);
    }

    this.pessoaInclusao = this.idUsuario;
    const pagina = this.getPaginaLocalStorage()
    this.pageIndex = parseInt(pagina,10);

    this.service.getColaboradores().subscribe((data: any) => {
      if (data.status == 401) {
        this.router.navigate(['/', 'login']);
      }
      this.listaColaboradores = data.body;
    });

    this.service
      .getUnidadeOperadoraPorUnidade(this.unidadeAtendimento)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.listaOperadoras = data.body;
      });

    this.separacaoFiltro();
  }

  separacaoFiltro() {
    //#region verifica valores nulos
    if (this.contaForm.get('atendimento')?.value == null) {
      var atendimento = 0;
    } else {
      atendimento = this.contaForm.get('atendimento')?.value;
    }

    if (this.contaForm.get('conta')?.value == null) {
      var conta = 0;
    } else {
      conta = this.contaForm.get('conta')?.value;
    }

    if (this.contaForm.get('operadora')?.value == null) {
      var operadora = 0;
    } else {
      operadora = this.contaForm.get('operadora')?.value;
    }

    if (this.contaForm.get('dataInicial')?.value != null) {
      var dataInicial = this.contaForm.get('dataInicial')?.value + ' 00:00:00';
    } else {
      dataInicial = ' ';
    }

    if (this.contaForm.get('dataFinal')?.value != null) {
      var dataFinal = this.contaForm.get('dataFinal')?.value + ' 23:59:59';
    } else {
      dataFinal = ' ';
    }

    if (this.contaForm.get('usuario')?.value == 'geral') {
      var usuario = 0;
    } else {
      usuario = this.contaForm.get('usuario')?.value;
    }

    if(this.contaForm.get('statusValidade')?.value == 'geral' || this.unidadeAtendimento != 2 && this.unidadeAtendimento != 4){
      var statusValidade = 0
    }else{
      statusValidade = this.contaForm.get('statusValidade')?.value;
    }
    //#endregion

    this.setLocalStorage();

    this.service
      .getFiltroContas(
        this.unidadeAtendimento,
        atendimento,
        conta,
        0,
        this.contaForm.get('paciente')?.value,
        dataInicial,
        dataFinal,
        usuario,
        operadora,
        this.contaForm.get('localConta')?.value,
        this.contaForm.get('statusConta')?.value,
        statusValidade,
        this.pageIndex
      )
      .subscribe((data: any) => {
        // console.log(data.body[0]);
        var conteudo = data.body[0];
        if (conteudo == undefined) {
          this.totalContas = 0;
          this.contas = [];
        } else {
          this.totalContas = data.body[0].quantidade;
          this.contas = data.body;
        }

        this.dataSourceContas = new MatTableDataSource(this.contas);
        this.filtroAtivo = true;
      });
  }

  //#region localstorage
  setLocalStorage(){
    if(this.contaForm.get('usuario')?.value != '' && this.contaForm.get('usuario')?.value != null){
      localStorage.setItem('usuarioConta',this.contaForm.get('usuario')?.value);
    }

    if(this.contaForm.get('localConta')?.value != '' && this.contaForm.get('localConta')?.value != null){
      localStorage.setItem('localConta',this.contaForm.get('localConta')?.value)
    }

    if(this.contaForm.get('statusConta')?.value != '' && this.contaForm.get('statusConta')?.value != null){
      localStorage.setItem('statusConta',this.contaForm.get('statusConta')?.value)
    }

    if(this.contaForm.get('statusValidade')?.value != '' && this.contaForm.get('statusValidade')?.value != null){
      localStorage.setItem('statusValidade',this.contaForm.get('statusValidade')?.value)
    }

    if(this.contaForm.get('operadora')?.value){
      localStorage.setItem('operadora',this.contaForm.get('operadora')?.value)
    }

    if(this.contaForm.get('atendimento')?.value){
      localStorage.setItem('atendimento',this.contaForm.get('atendimento')?.value)
    }

    if(this.contaForm.get('conta')?.value){
      localStorage.setItem('conta',this.contaForm.get('conta')?.value)
    }

    localStorage.setItem('pagina', this.pageIndex.toString());
  }

  getUsuarioLocalStorage(){
    return localStorage.getItem('usuarioConta') ?? null;
  }

  getLocalContaLocalStorage(){
    return localStorage.getItem('localConta') ?? null;
  }

  getStatusContaLocalStorage(){
    return localStorage.getItem('statusConta' ?? null)
  }

  getStatusValidadeLocalStorage(){
    return localStorage.getItem('statusValidade' ?? null)
  }

  getPaginaLocalStorage(){
    return localStorage.getItem('pagina') ?? '0';
  }

  getOperadoraLocalStorage(){
    return localStorage.getItem('operadora') ?? null;
  }

  getAtendimentoLocalStorage(){
    return localStorage.getItem('atendimento') ?? null;
  }

  getContaLocalStorage(){
    return localStorage.getItem('conta') ?? null;
  }
  //#endregion

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageIndex = this.pageIndex * 10;
    this.setLocalStorage();
    this.separacaoFiltro();
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  selecionarAba(event: any) {
    this.aba = event.index;
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.voltar();
  }

  localContas = [
    { nome: 'GERAL', id: 0 },
    { nome: 'AMHP NORMAL', id: 1 },
    { nome: 'HOSPITAL', id: 2 },
    { nome: 'AMHP DIRETO', id: 3 },
    { nome: 'AMGS', id: 4 },
  ];

  listaStatusValidade = [
    { descricao: 'Validade Normal', id: 1},
    { descricao: 'Proximo de Vencer', id: 2 },
    { descricao: 'Vencido', id: 3 },
    { descricao: 'Checklist Pronto', id: 4 },
    { descricao: 'Concluido', id: 5 },
  ]

  colunas = [
    'usuario',
    'nroRegistroAtendimento',
    'numeroConta',
    'paciente',
    'convenio',
    'localChecklist',
    'parcial',
    'dataInicial',
    'statusConta',
    'statusValidade',
    'edicaoConta',
  ];
}
