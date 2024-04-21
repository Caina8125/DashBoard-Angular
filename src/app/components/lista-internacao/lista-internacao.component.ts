import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DarkModeService } from '../utils/dark-mode.service';
import { TokenService } from '../../auth/token/token.service';
import { ListaInternacaoService } from './lista-internacao.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-internacao',
  templateUrl: './lista-internacao.component.html',
  styleUrls: ['./lista-internacao.component.css'],
})
export class ListaInternacaoComponent implements OnInit {
  //#region
  aba = 0;
  pagina = 0;
  pageIndex = 0;
  tipoBusca = 0;
  idUsuario: any;
  listaObito: any;
  dataLog!: string;
  closeResult = '';
  listaAPedido = [];
  listaAltaUTI: any;
  listaAux: any = [];
  listaHomeCare: any;
  pessoaLog!: string;
  acomodacao = false;
  filtroAtivo = false;
  pessoaInclusao: any;
  totalItensAlta: any;
  listaMelhorado = [];
  dataSourceAlta: any;
  totalItensObito: any;
  dataSourceObito: any;
  periodoAtivo = false;
  listaAcomodacao = [];
  listaTransferido = [];
  listaApartmaneto = [];
  listaEvolucaoDia = [];
  arquivoCarregado: any;
  totalItensAltaUTI: any;
  totalItensAPedido: any;
  dataSourceAltaUTI: any;
  dataSourceAPedido: any;
  dataSourceHomeCare: any;
  totalItensHomeCare: any;
  listaAlta = new Array();
  listaNaoEncontrado: any;
  unidadeAtendimento: any;
  usuarioSelecionado: any;
  totalItensParciais: any;
  listaColaboradores = [];
  dataSourceParciais: any;
  dataSourceAuditoria: any;
  totalItensSintetico: any;
  totalItensMelhorado: any;
  dataSourceMelhorado: any;
  dataSourceSintetico: any;
  operadoraSelecioanda: any;
  dataSourceTransferido: any;
  totalItensTransferido: any;
  dataSourceApartamento: any;
  acomodacaoSelecionada: any;
  listaParciais = new Array();
  listaSintetico = new Array();
  totalItensNaoEncontrado: any;
  dataSourceAltaSortAsc = true;
  listaUnidadesOperadoras = [];
  dataSourceNaoEncontrado: any;
  totalItensApartamento!: number;
  modoEscuroListaInternacao = false;


  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  //#endregion

  constructor(
    private router: Router,
    private location: Location,
    private token: TokenService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private service: ListaInternacaoService,
    private darkModeService: DarkModeService,
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroListaInternacao = modoEscuro;
    })
  }

  internacaoForm = new FormGroup({
    usuario: new FormControl(),
    paciente: new FormControl(),
    operadora: new FormControl(),
    dataFinal: new FormControl(),
    tipoBusca: new FormControl(),
    acomodacao: new FormControl(),
    atendimento: new FormControl(),
    dataInicial: new FormControl(),
    usuarioRobo: new FormControl(),
    statusInternacao: new FormControl(),
  });

  ngOnInit() {
    this.filtroAtivo = false;
    this.periodoAtivo = false;
    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    this.route.queryParamMap.subscribe((params) => {
      this.unidadeAtendimento = params.get('unidadeAtendimento');
      this.idUsuario = params.get('idUsuario');
    });

    this.pessoaInclusao = this.idUsuario;
    const pagina = this.getPaginaLocalStorage()
    this.pageIndex = parseInt(pagina,10);
    this.internacaoForm.get('statusInternacao')?.setValue('1');
    this.internacaoForm.get('dataFinal')?.setValue(this.getDataFinalLocalStorage());
    this.internacaoForm.get('acomodacao')?.setValue(this.getAcomodacaoLocalStorage());
    this.internacaoForm.get('dataInicial')?.setValue(this.getDataInicialLocalStorage());
    this.internacaoForm.get('tipoBusca')?.setValue(this.getTipoBuscaLocalStorage() ?? '0');
    this.internacaoForm.get('operadora')?.setValue(this.getOperadoraLocalStorage() ?? '0');
    this.internacaoForm.get('usuario')?.setValue(this.getUsuarioLocalStorage() ?? this.idUsuario);
    if(this.getUsuarioRoboLocalStorage() == 'true'){
      this.internacaoForm.get('usuarioRobo')?.setValue(true);
    }

    this.service.getColaboradores().subscribe((data: any) => {
      // console.log(data);
      if (data.status == 401) {
        this.router.navigate(['/', 'login']);
      } else {
        this.listaColaboradores = data.body;
      }
    });

    //Obtem log de upload
    this.service
      .getLog(this.unidadeAtendimento, 'Upload')
      .subscribe((data: any) => {
        // console.log(data);
        this.dataLog = data.body.dataCriacao;
        this.pessoaLog = data.body.pessoaNome;
      });

    this.service
      .getUnidadeOperadoraPorUnidade(this.unidadeAtendimento)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.listaUnidadesOperadoras = data.body;
      });

    if (this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11) {
      this.service
        .getAcomodacoes(this.unidadeAtendimento)
        .subscribe((data: any) => {
          // console.log(data.body);
          this.listaAcomodacao = data.body;
        });
    }
    this.separacaoFiltro(this.pageIndex,1);
  }

  setSort(dataSource: any, sortBy: string, order: boolean){
    dataSource.data = dataSource.data.sort((a: any, b: any) => {
      a = typeof (a[sortBy]) === 'string' ? a[sortBy].toUpperCase() : a[sortBy];
      b = typeof (b[sortBy]) === 'string' ? b[sortBy].toUpperCase() : b[sortBy];

      if (a < b) { return order ? 1 : -1; }
      if (a > b) { return order ? -1 : 1; }
      return 0;
    });
  }

  separacaoFiltro(pagina: any, statusInternacao?:number) {
    this.filtroAtivo = true;
    this.setLocalStorage();

    //#region Verifica valores nulos e adiciona 0 se for nulo
    if (this.internacaoForm.get('operadora')?.value == null) {
      var operadora = '0';
    } else {
      operadora = this.getOperadoraLocalStorage() ?? '0';
    }

    if (this.internacaoForm.get('atendimento')?.value == null) {
      var atendimento = '0';
    } else {
      atendimento = this.getAtendimentoLocalStorage() ?? '0';
    }

    if (this.internacaoForm.get('dataInicial')?.value == '' || this.internacaoForm.get('dataInicial')?.value == null) {
      var dataInicial = '01-01-0001';
    } else {
      dataInicial = this.getDataInicialLocalStorage() + ' 00:00:00';
    }

    if (this.internacaoForm.get('dataFinal')?.value == null || this.internacaoForm.get('dataFinal')?.value == '') {
      var dataFinal = '01-01-0001';
    } else {
      dataFinal = this.getDataFinalLocalStorage() + ' 23:59:59';
    }

    if (this.internacaoForm.get('dataFinal')?.value == null && this.internacaoForm.get('dataInicial')?.value == null) {
      dataInicial = ' ';
      dataFinal = ' ';
    }

    if (this.internacaoForm.get('usuario')?.value == 'geral') {
      var usuario = 0;
    } else {
      usuario = this.internacaoForm.get('usuario')?.value;
    }

    if (this.internacaoForm.get('acomodacao')?.value == null && this.getAcomodacaoLocalStorage() == null) {
      var acomodacao = '0';
    } else {
      acomodacao = this.getAcomodacaoLocalStorage() ?? '0';
    }

    if (dataInicial == '01-01-0001' && dataFinal == '01-01-0001') {
      dataFinal = ' ';
    }

    var tipoBusca = this.getTipoBuscaLocalStorage() ?? '0';
    //#endregion

    this.service
      .getFiltro(
        this.unidadeAtendimento,
        0,
        usuario,
        operadora,
        statusInternacao,
        atendimento,
        this.internacaoForm.get('paciente')?.value,
        dataInicial,
        dataFinal,
        acomodacao,
        tipoBusca,
        pagina
      )
      .subscribe((data:any)=>{
        const primeiraPosicaoParcial = data.body.listaInternacao.parcial[0];
        const quantidadeParcials = primeiraPosicaoParcial[0]?.quantidade || 0;
        this.totalItensParciais = quantidadeParcials;

        const primeiraPosicaoAlta = data.body.listaInternacao.alta[0];
        const quantidadeAlta = primeiraPosicaoAlta[0]?.quantidade || 0;
        this.totalItensAlta = quantidadeAlta;

        const primeiraPosicaoNE = data.body.listaInternacao.naoEncontrado[0];
        const quantidadeNE = primeiraPosicaoNE[0]?.quantidade || 0;
        this.totalItensNaoEncontrado = quantidadeNE;

        const primeiraPosicaoObito = data.body.listaInternacao.obito[0];
        const quantidadeObito = primeiraPosicaoObito[0]?.quantidade || 0;
        this.totalItensObito = quantidadeObito;

        const primeiraPosicaoApartamento = data.body.listaInternacao.apartamento[0];
        const quantidadeApartamento = primeiraPosicaoApartamento[0]?.quantidade || 0;
        this.totalItensApartamento = quantidadeApartamento;

        const primeiraPosicaoHomeCare = data.body.listaInternacao.homeCare[0];
        const quantidadeHomeCare = primeiraPosicaoHomeCare[0]?.quantidade || 0;
        this.totalItensHomeCare = quantidadeHomeCare;

        const primeiraPosicaoMelhorado = data.body.listaInternacao.melhorado[0];
        const quantidadeMelhorado = primeiraPosicaoMelhorado[0]?.quantidade || 0;
        this.totalItensMelhorado = quantidadeMelhorado;

        const primeiraPosicaoTransferido = data.body.listaInternacao.transferido[0];
        const quantidadeTransferido = primeiraPosicaoTransferido[0]?.quantidade || 0;
        this.totalItensTransferido = quantidadeTransferido;

        const primeiraPosicaoAPedido = data.body.listaInternacao.apedido[0];
        const quantidadeAPedido = primeiraPosicaoAPedido[0]?.quantidade || 0;
        this.totalItensAPedido = quantidadeAPedido;

        this.listaParciais = data.body.listaInternacao.parcial[0];
        this.dataSourceParciais = new MatTableDataSource(this.listaParciais);

        this.listaAlta = data.body.listaInternacao.alta[0];
        this.dataSourceAlta = new MatTableDataSource(this.listaAlta);

        this.listaNaoEncontrado = data.body.listaInternacao.naoEncontrado[0];
        this.dataSourceNaoEncontrado = new MatTableDataSource(this.listaNaoEncontrado);

        this.listaObito = data.body.listaInternacao.obito[0];
        this.dataSourceObito = new MatTableDataSource(this.listaObito);

        this.listaApartmaneto = data.body.listaInternacao.apartamento[0];
        this.dataSourceApartamento = new MatTableDataSource(this.listaApartmaneto);

        this.listaHomeCare = data.body.listaInternacao.homeCare[0];
        this.dataSourceHomeCare = new MatTableDataSource(this.listaHomeCare);

        this.listaMelhorado = data.body.listaInternacao.melhorado[0];
        this.dataSourceMelhorado = new MatTableDataSource(this.listaMelhorado);

        this.listaTransferido = data.body.listaInternacao.transferido[0];
        this.dataSourceTransferido = new MatTableDataSource(this.listaTransferido);

        this.listaAPedido = data.body.listaInternacao.apedido[0];
        this.dataSourceAPedido = new MatTableDataSource(this.listaAPedido);
      })
  }

  open(content: any,idInternacao?:any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' })
      .result.then(
        (result:any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason:any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    if(idInternacao){
      this.obterRegistro(idInternacao);
    }
  }

  obterRegistro(registro:any){
    this.service
      .getAuditoriaPorRegistro(this.unidadeAtendimento,registro)
      .subscribe({
        next:(data:any)=>{
          // console.log(data.body);
          const listaAuditoria = data.body;
          this.dataSourceAuditoria = new MatTableDataSource(listaAuditoria);
        }
      })
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  limparFiltros(){
    localStorage.removeItem('dataInicial');
    this.internacaoForm.get('dataInicial')?.setValue(null);

    localStorage.removeItem('dataFinal');
    this.internacaoForm.get('dataFinal')?.setValue(null);

    localStorage.removeItem('acomodacao');
    this.internacaoForm.get('acomodacao')?.setValue(null);

    localStorage.removeItem('operadora');
    this.internacaoForm.get('operadora')?.setValue(null);

    localStorage.removeItem('atendimento');
    this.internacaoForm.get('atendimento')?.setValue(null);

    this.separacaoFiltro(this.pageIndex,1);
  }

  //#region LocalStorage
  setLocalStorage() {
    if (this.internacaoForm.get('dataInicial')?.value != '' && this.internacaoForm.get('dataInicial')?.value != null) {
      localStorage.setItem('dataInicial',this.internacaoForm.get('dataInicial')?.value);
    }

    if (this.internacaoForm.get('dataFinal')?.value != '' && this.internacaoForm.get('dataFinal')?.value != null) {
      localStorage.setItem('dataFinal',this.internacaoForm.get('dataFinal')?.value);
    }

    if (this.internacaoForm.get('acomodacao')?.value != '' && this.internacaoForm.get('acomodacao')?.value != null) {
      localStorage.setItem('acomodacao',this.internacaoForm.get('acomodacao')?.value);
    }

    if (this.internacaoForm.get('operadora')?.value != '' && this.internacaoForm.get('operadora')?.value != null) {
      localStorage.setItem('operadora',this.internacaoForm.get('operadora')?.value);
    }

    if (this.internacaoForm.get('atendimento')?.value != '' && this.internacaoForm.get('atendimento')?.value != null) {
      localStorage.setItem('atendimento',this.internacaoForm.get('atendimento')?.value);
    }

    if (this.internacaoForm.get('usuario')?.value != '' && this.internacaoForm.get('usuario')?.value != null) {
      localStorage.setItem('usuario',this.internacaoForm.get('usuario')?.value);
    }

    if (this.internacaoForm.get('usuarioRobo')?.value != null) {
      localStorage.setItem('usuarioRobo', this.internacaoForm.get('usuarioRobo')?.getRawValue());
    }

    if(this.internacaoForm.get('tipoBusca')?.value != null){
      localStorage.setItem('tipoBusca', this.internacaoForm.get('tipoBusca')?.getRawValue());
    }

    localStorage.setItem('pagina', this.pageIndex.toString());
  }

  getOperadoraLocalStorage() {
    return localStorage.getItem('operadora') ?? null;
  }

  getAtendimentoLocalStorage() {
    return localStorage.getItem('atendimento') ?? null;
  }

  getDataInicialLocalStorage() {
    return localStorage.getItem('dataInicial') ?? null;
  }

  getDataFinalLocalStorage() {
    return localStorage.getItem('dataFinal') ?? null;
  }

  getAcomodacaoLocalStorage() {
    return localStorage.getItem('acomodacao') ?? null;
  }

  getUsuarioLocalStorage() {
    return localStorage.getItem('usuario') ?? null;
  }

  getUsuarioRoboLocalStorage() {
    return localStorage.getItem('usuarioRobo') ?? null;
  }

  getTipoBuscaLocalStorage() {
    return localStorage.getItem('tipoBusca') ?? 0;
  }

  getPaginaLocalStorage(){
    return localStorage.getItem('pagina') ?? '0';
  }
  //#endregion

  limparLista() {
    this.dataSourceAlta = null;
    this.dataSourceObito = null;
    this.listaAlta = new Array();
    this.listaObito = new Array();
    this.dataSourceAltaUTI = null;
    this.dataSourceParciais = null;
    this.listaNaoEncontrado = null;
    this.listaParciais = new Array();
    this.dataSourceNaoEncontrado = null;
  }

  //Troca de pagina
  handlePageEvent(e: PageEvent, evolucao: number) {
    this.pageIndex = e.pageIndex;
    this.pageIndex = this.pageIndex * 10;
    this.setLocalStorage();
    //#region Verifica valores nulos e adiciona 0 se for nulo
    if (this.internacaoForm.get('operadora')?.value == null) {
      var operadora = '0';
    } else {
      operadora = this.getOperadoraLocalStorage() ?? '0';
    }

    if (this.internacaoForm.get('atendimento')?.value == null) {
      var atendimento = '0';
    } else {
      atendimento = this.getAtendimentoLocalStorage() ?? '0';
    }

    if (this.internacaoForm.get('dataInicial')?.value == '' || this.internacaoForm.get('dataInicial')?.value == null) {
      var dataInicial = '01-01-0001';
    } else {
      dataInicial = this.getDataInicialLocalStorage() + ' 00:00:00';
    }

    if (this.internacaoForm.get('dataFinal')?.value == null || this.internacaoForm.get('dataFinal')?.value == '') {
      var dataFinal = '01-01-0001';
    } else {
      dataFinal = this.getDataFinalLocalStorage() + ' 23:59:59';
    }

    if (this.internacaoForm.get('dataFinal')?.value == null && this.internacaoForm.get('dataInicial')?.value == null) {
      dataInicial = ' ';
      dataFinal = ' ';
    }

    if (this.internacaoForm.get('usuario')?.value == 'geral') {
      var usuario = 0;
    } else {
      usuario = this.internacaoForm.get('usuario')?.value;
    }

    if (this.internacaoForm.get('acomodacao')?.value == null && this.getAcomodacaoLocalStorage() == null) {
      var acomodacao = '0';
    } else {
      acomodacao = this.getAcomodacaoLocalStorage() ?? '0';
    }

    if (dataInicial == '01-01-0001' && dataFinal == '01-01-0001') {
      dataFinal = ' ';
    }

    var tipoBusca = this.getTipoBuscaLocalStorage() ?? 0;
    //#endregion

    this.service
      .getFiltroComSkip(
        this.unidadeAtendimento,
        evolucao,
        acomodacao,
        usuario,
        operadora,
        this.internacaoForm.get('statusInternacao')?.value,
        atendimento,
        this.internacaoForm.get('paciente')?.value,
        dataInicial,
        dataFinal,
        tipoBusca,
        this.pageIndex
      )
      .subscribe({
        next:(data:any)=>{
          const evolucao = data.body.listaInternacao[0].idEvolucao;
          switch (evolucao) {
            case 1:
              this.listaAlta = data.body.listaInternacao[0];
              this.dataSourceAlta = new MatTableDataSource(this.listaAlta);
              break;
            case 2:
              this.listaObito = data.body.listaInternacao;
              this.dataSourceObito = new MatTableDataSource(this.listaObito);
              break;
            case 3:
              this.listaParciais = data.body.listaInternacao;
              this.dataSourceParciais = new MatTableDataSource(this.listaParciais);
              break;
            case 4:
              this.listaHomeCare = data.body.listaInternacao;
              this.dataSourceHomeCare = new MatTableDataSource(this.listaHomeCare);
              break;
            case 5:
              this.listaNaoEncontrado = data.body.listaInternacao;
              this.dataSourceNaoEncontrado = new MatTableDataSource(this.listaNaoEncontrado);
              break;
            case 8:
              this.listaApartmaneto = data.body.listaInternacao;
              this.dataSourceApartamento = new MatTableDataSource(this.listaApartmaneto);
              break;
            case 9:
              this.listaMelhorado = data.body.listaInternacao;
              this.dataSourceMelhorado = new MatTableDataSource(this.listaMelhorado);
              break;
            case 10:
              this.listaTransferido = data.body.listaInternacao;
              this.dataSourceTransferido = new MatTableDataSource(this.listaTransferido);
              break;
            case 11:
              this.listaAPedido = data.body.listaInternacao;
              this.dataSourceAPedido = new MatTableDataSource(this.listaAPedido);
              break;
          }
        }
      })
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.voltar();
  }

  selecionarAba(event: any) {
    this.aba = event.index;
    localStorage.removeItem('pagina');
    this.pageIndex = 0;
    this.separacaoFiltro(this.pageIndex,1)
  }

  colunas = [
    'usuario',
    'nroRegistroAtendimento',
    'paciente',
    'dataInicial',
    'operadora',
    'acomodacao',
    'leito',
    'diasInternado',
    'evoluido',
    'abrirContas',
  ];

  colunasAltas = [
    'usuario',
    'nroRegistroAtendimento',
    'paciente',
    'dataInicial',
    'operadora',
    'acomodacao',
    'leito',
    'diasInternado',
    'abrirContas',
  ];

  colunasTabelaUpload = ['atendimento', 'nomePaciente', 'Editar'];

  colunasAuditria = ['coluna','antigo','novo', 'dataCriacao'];
}
