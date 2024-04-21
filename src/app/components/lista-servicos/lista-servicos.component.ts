import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, HostListener, Input } from '@angular/core';
import { ListaServicosService } from './lista-servicos.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DarkModeService } from '../utils/dark-mode.service';

@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css'],
})
export class ListaServicosComponent {
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private service: ListaServicosService,
    private darkModeService: DarkModeService,
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroListaServicos = modoEscuro;
    })
  }

  //#region variaveis
  aba = 0;
  pageIndex = 0;
  idUsuario: any;
  filtroAtivo = false;
  public closeResult = '';
  listaColaboradores: any;
  usuarioSelecionado: any;
  listaServicosProntos: any;
  operadoraSelecionada: any;
  idUnidadeAtendimento: any;
  totalServicosProntos: any;
  totalServicosPendentes: any;
  listaServicosPendentes: any;
  listaUnidadesOperadoras = [];
  dataSourceServicosProntos: any;
  modoEscuroListaServicos = false;
  listaCentroCirurgicoPronto: any;
  totalCentroCirurgicoPronto: any;
  dataSourceServicosPendentes: any;
  listaCentroCirurgicoPendente: any;
  totalCentroCirurgicoPendente: any;
  dataSourceCentroCirurgicoPronto: any;
  dataSourceCentroCirurgicoPendente: any;

  @Input() statusCentroCirurgico: any;
  @Input() statusServicoCobranca: any;
  //#endregion

  cobrancaForm = new FormGroup({
    conta: new FormControl(),
    usuario: new FormControl(),
    paciente: new FormControl(),
    operadora: new FormControl(),
    dataFinal: new FormControl(),
    dataInicial: new FormControl(),
    atendimento: new FormControl(),
  });

  ngOnInit() {
    this.filtroAtivo = false;
    this.route.queryParamMap.subscribe((params) => {
      this.idUnidadeAtendimento = params.get('unidadeAtendimento');
      this.idUsuario = params.get('idUsuario');
    });

    this.service.getColaboradores().subscribe((data: any) => {
      // console.log(data.body);
      if(data.status == 401){
        this.router.navigate(['/', 'login']);
      }
      this.listaColaboradores = data.body;
    });

    this.service
      .getTodasUnidadeOperadoras(this.idUnidadeAtendimento)
      .subscribe((data: any) => {
        this.listaUnidadesOperadoras = data.body;
      });

    this.cobrancaForm.setValue({
      conta: null,
      paciente: null,
      operadora:null,
      dataFinal: null,
      atendimento: null,
      dataInicial: null,
      usuario: this.idUsuario,
    });

    // this.retornaCentroCirurgico();
    // this.retornaServicos();
    this.onChange(this.idUsuario);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  atualizaStatusCentroCirurgico(corpoClinico: any) {
    this.service
      .putCentroCirurgico(corpoClinico, this.statusCentroCirurgico)
      .subscribe((data: any) => {
        this.retornaCentroCirurgico();
        this.retornaServicos();
        this.modalService.dismissAll();
      });
  }

  atualizaStatusServico(servico: any) {
    this.service
      .putStatusServicos(servico, this.statusServicoCobranca)
      .subscribe((data: any) => {
        this.retornaCentroCirurgico();
        this.retornaServicos();
        this.modalService.dismissAll();
      });
  }

  limparFiltro() {
    this.filtroAtivo = false;
    this.cobrancaForm.get('conta')?.setValue(null);
    this.cobrancaForm.get('paciente')?.setValue(null);
    this.cobrancaForm.get('dataFinal')?.setValue(null);
    this.cobrancaForm.get('dataInicial')?.setValue(null);
    this.cobrancaForm.get('atendimento')?.setValue(null);
    this.ngOnInit();
  }

  seperacaoFiltro() {
    if (
      this.cobrancaForm.get('dataInicial')?.value != null ||
      this.cobrancaForm.get('dataFinal')?.value != null
    ) {
      this.obterFiltroComDatas();
    } else if (
      this.cobrancaForm.get('atendimento')?.value != null ||
      this.cobrancaForm.get('conta')?.value != null ||
      this.cobrancaForm.get('paciente')?.value != null
    ) {
      this.obterFiltroSemDatas();
    }
  }

  obterFiltroSemDatas() {
    this.filtroAtivo = true;

    if(this.idUnidadeAtendimento != 11 && this.idUnidadeAtendimento != 8){
      this.service
        .getCentroCirurgicoFiltradosSemData(
          this.cobrancaForm.get('atendimento')?.value,
          this.cobrancaForm.get('conta')?.value,
          this.cobrancaForm.get('paciente')?.value,
          this.pageIndex,
          this.idUnidadeAtendimento,
          this.idUsuario,
          1
        )
        .subscribe((data: any) => {
          this.totalCentroCirurgicoPronto = data.body.total;
          this.listaCentroCirurgicoPronto = data.body.centroCirurgico;
          // console.log(this.listaCentroCirurgicoPronto);
          this.dataSourceCentroCirurgicoPronto = new MatTableDataSource(
            this.listaCentroCirurgicoPronto
          );
        });

      this.service
        .getCentroCirurgicoFiltradosSemData(
          this.cobrancaForm.get('atendimento')?.value,
          this.cobrancaForm.get('conta')?.value,
          this.cobrancaForm.get('paciente')?.value,
          this.pageIndex,
          this.idUnidadeAtendimento,
          this.idUsuario,
          2
        )
        .subscribe((data: any) => {
          this.totalCentroCirurgicoPendente = data.body.total;
          this.listaCentroCirurgicoPendente = data.body.centroCirurgico;
          // console.log(this.listaCentroCirurgicoPendente);
          this.dataSourceCentroCirurgicoPendente = new MatTableDataSource(
            this.listaCentroCirurgicoPendente
          );
        });
    }

    // PENDENTES
    this.service
      .getServicosFiltradosSemData(
        this.cobrancaForm.get('atendimento')?.value,
        this.cobrancaForm.get('conta')?.value,
        this.cobrancaForm.get('paciente')?.value,
        this.pageIndex,
        this.idUnidadeAtendimento,
        this.idUsuario,
        2
      )
      .subscribe((data: any) => {
        this.totalServicosPendentes = data.body.total;
        this.listaServicosPendentes = data.body.servicoCobranca;
        // console.log(this.listaServicosPendentes);
        this.dataSourceServicosPendentes = new MatTableDataSource(
          this.listaServicosPendentes
        );
      });

    // PRONTOS
    this.service
      .getServicosFiltradosSemData(
        this.cobrancaForm.get('atendimento')?.value,
        this.cobrancaForm.get('conta')?.value,
        this.cobrancaForm.get('paciente')?.value,
        this.pageIndex,
        this.idUnidadeAtendimento,
        this.idUsuario,
        1
      )
      .subscribe((data: any) => {
        this.totalServicosProntos = data.body.total;
        this.listaServicosProntos = data.body.servicoCobranca;
        // console.log(this.listaServicosProntos);
        this.dataSourceServicosProntos = new MatTableDataSource(
          this.listaServicosProntos
        );
      });
  }

  obterFiltroComDatas() {
    this.filtroAtivo = true;

    if (this.aba == 0) {
      //PENDENTES
      this.service
        .getCentroCirurgicoComData(
          this.cobrancaForm.get('dataInicial')?.value,
          this.cobrancaForm.get('dataFinal')?.value,
          1,
          this.idUnidadeAtendimento,
          this.pageIndex,
          this.idUsuario
        )
        .subscribe((data: any) => {
          this.totalCentroCirurgicoPendente = data.body.total;
          this.listaCentroCirurgicoPendente = data.body.centroCirurgico;
          this.dataSourceCentroCirurgicoPendente = new MatTableDataSource(
            this.listaCentroCirurgicoPendente
          );
        });

      //PRONTOS
      this.service
        .getCentroCirurgicoComData(
          this.cobrancaForm.get('dataInicial')?.value,
          this.cobrancaForm.get('dataFinal')?.value,
          2,
          this.idUnidadeAtendimento,
          this.pageIndex,
          this.idUsuario
        )
        .subscribe((data: any) => {
          this.totalCentroCirurgicoPronto = data.body.total;
          this.listaCentroCirurgicoPronto = data.body.centroCirurgico;
          this.dataSourceCentroCirurgicoPronto = new MatTableDataSource(
            this.listaCentroCirurgicoPronto
          );
        });
    }

    if (this.aba == 1) {
      //PRONTOS
      this.service
        .getServicosFiltradosComData(
          this.cobrancaForm.get('dataInicial')?.value,
          this.cobrancaForm.get('dataFinal')?.value,
          1,
          this.idUnidadeAtendimento,
          this.pageIndex,
          this.idUsuario
        )
        .subscribe((data: any) => {
          // console.log(data.body);
          this.totalServicosProntos = data.body.total;
          this.listaServicosProntos = data.body.servicoCobranca;
          this.dataSourceServicosProntos = new MatTableDataSource(
            this.listaServicosProntos
          );
        });

      //PENDENTES
      this.service
        .getServicosFiltradosComData(
          this.cobrancaForm.get('dataInicial')?.value,
          this.cobrancaForm.get('dataFinal')?.value,
          2,
          this.idUnidadeAtendimento,
          this.pageIndex,
          this.idUsuario
        )
        .subscribe((data: any) => {
          // console.log(data.body);
          this.totalServicosPendentes = data.body.total;
          this.listaServicosPendentes = data.body.servicoCobranca;
          this.dataSourceServicosPendentes = new MatTableDataSource(
            this.listaServicosPendentes
          );
        });
    }
  }

  retornaCentroCirurgico() {
    //PRONTO
    this.service
      .getCentroCirurgico(
        this.idUnidadeAtendimento,
        this.pageIndex,
        1,
        this.idUsuario
      )
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalCentroCirurgicoPronto = data.body.total;
        this.listaCentroCirurgicoPronto = data.body.centroCirurgico;
        this.dataSourceCentroCirurgicoPronto = new MatTableDataSource(
          this.listaCentroCirurgicoPronto
        );
      });

    //PENDENTE
    this.service
      .getCentroCirurgico(
        this.idUnidadeAtendimento,
        this.pageIndex,
        2,
        this.idUsuario
      )
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalCentroCirurgicoPendente = data.body.total;
        this.listaCentroCirurgicoPendente = data.body.centroCirurgico;
        this.dataSourceCentroCirurgicoPendente = new MatTableDataSource(
          this.listaCentroCirurgicoPendente
        );
      });
  }

  retornaServicos() {
    // PENDENTES
    this.service
      .getServicos(this.idUnidadeAtendimento, this.pageIndex, 2, this.idUsuario)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalServicosPendentes = data.body.total;
        this.listaServicosPendentes = data.body.servicoCobranca;
        this.dataSourceServicosPendentes = new MatTableDataSource(
          this.listaServicosPendentes
        );
      });

    // PRONTOS
    this.service
      .getServicos(this.idUnidadeAtendimento, this.pageIndex, 1, this.idUsuario)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalServicosProntos = data.body.total;
        this.listaServicosProntos = data.body.servicoCobranca;
        this.dataSourceServicosProntos = new MatTableDataSource(
          this.listaServicosProntos
        );
      });
  }

  retornaTodosCentrosCirurgicos() {
    //PRONTO
    this.service
      .getCentroCirurgico(this.idUnidadeAtendimento, this.pageIndex, 1)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalCentroCirurgicoPronto = data.body.total;
        this.listaCentroCirurgicoPronto = data.body.centroCirurgico;
        this.dataSourceCentroCirurgicoPronto = new MatTableDataSource(
          this.listaCentroCirurgicoPronto
        );
      });

    //PENDENTE
    this.service
      .getCentroCirurgico(this.idUnidadeAtendimento, this.pageIndex, 2)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalCentroCirurgicoPendente = data.body.total;
        this.listaCentroCirurgicoPendente = data.body.centroCirurgico;
        this.dataSourceCentroCirurgicoPendente = new MatTableDataSource(
          this.listaCentroCirurgicoPendente
        );
      });
  }

  retornaTodosServicos() {
    // PENDENTES
    this.service
      .getServicos(this.idUnidadeAtendimento, this.pageIndex, 2)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalServicosPendentes = data.body.total;
        this.listaServicosPendentes = data.body.servicoCobranca;
        this.dataSourceServicosPendentes = new MatTableDataSource(
          this.listaServicosPendentes
        );
      });

    // PRONTOS
    this.service
      .getServicos(this.idUnidadeAtendimento, this.pageIndex, 1)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.totalServicosProntos = data.body.total;
        this.listaServicosProntos = data.body.servicoCobranca;
        this.dataSourceServicosProntos = new MatTableDataSource(
          this.listaServicosProntos
        );
      });
  }

  selecionarAba(event: any) {
    this.aba = event.index;
    // console.log(this.aba);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageIndex = this.pageIndex * 10;
    if(this.idUnidadeAtendimento == 8 || this.idUnidadeAtendimento == 11){
      this.aba = 1;
    }
    if (this.aba == 0) {
      // console.log(this.usuarioSelecionado);
      if (this.usuarioSelecionado == 'geral') {
        this.retornaTodosCentrosCirurgicos();
      } else if (this.usuarioSelecionado == 'usuario selecionado') {
        this.retornaCentroCirurgico();
      } else {
        this.retornaServicosPorOperadora();
        this.retornaCentroCirurgicoPorOperadora();
      }
    } else if (this.aba == 1) {
      if (
        this.cobrancaForm.get('atendimento')?.value != null ||
        this.cobrancaForm.get('conta')?.value != null ||
        this.cobrancaForm.get('paciente')?.value != null ||
        this.cobrancaForm.get('dataInicial')?.value != null ||
        this.cobrancaForm.get('dataFinal')?.value != null
      ) {
        this.seperacaoFiltro();
      } else {
        if (this.idUsuario != 'geral') {
          this.retornaServicos();
        } else {
          this.retornaTodosServicos();
        }
      }
    }
  }

  onChange(event: any) {
    this.filtroAtivo = false;
    this.cobrancaForm.get('conta')?.setValue(null);
    this.cobrancaForm.get('paciente')?.setValue(null);
    this.cobrancaForm.get('dataFinal')?.setValue(null);
    this.cobrancaForm.get('dataInicial')?.setValue(null);
    this.cobrancaForm.get('atendimento')?.setValue(null);
    const selectedValue = event;
    if (selectedValue != 'geral') {
      this.idUsuario = selectedValue;
      this.usuarioSelecionado = 'usuario selecionado';
      this.retornaCentroCirurgico();
      this.retornaServicos();
    } else {
      this.usuarioSelecionado = 'geral';
      this.idUsuario = selectedValue;
      this.retornaTodosCentrosCirurgicos();
      this.retornaTodosServicos();
    }
  }

  onChangeOperadora(event: any) {
    // console.log(event);
    this.operadoraSelecionada = event;
    if (this.operadoraSelecionada == 0) {
      this.onChange(this.idUsuario);
    } else {
      this.usuarioSelecionado = 'usuario selecioando com operadora';
      this.retornaServicosPorOperadora();
      this.retornaCentroCirurgicoPorOperadora();
    }
  }

  retornaServicosPorOperadora() {
    //SERVICOS PENDENTES
    if (this.idUsuario != 'geral') {
      this.service
        .getServicosPorOperadora(
          this.operadoraSelecionada,
          2,
          this.pageIndex,
          this.idUnidadeAtendimento,
          this.idUsuario
        )
        .subscribe((data: any) => {
          this.listaServicosPendentes = data.body.servicoCobranca;
          this.totalServicosPendentes = data.body.total;
          this.dataSourceServicosPendentes = new MatTableDataSource(
            this.listaServicosPendentes
          );
        });

      this.service
        .getServicosPorOperadora(
          this.operadoraSelecionada,
          1,
          this.pageIndex,
          this.idUnidadeAtendimento,
          this.idUsuario
        )
        .subscribe((data: any) => {
          this.listaServicosProntos = data.body.servicoCobranca;
          this.totalServicosProntos = data.body.total;
          this.dataSourceServicosProntos = new MatTableDataSource(
            this.listaServicosProntos
          );
        });
    } else {
      //SERVICOS PRONTOS
      this.service
        .getServicosPorOperadora(
          this.operadoraSelecionada,
          2,
          this.pageIndex,
          this.idUnidadeAtendimento
        )
        .subscribe((data: any) => {
          this.listaServicosPendentes = data.body.servicoCobranca;
          this.totalServicosPendentes = data.body.total;
          this.dataSourceServicosPendentes = new MatTableDataSource(
            this.listaServicosPendentes
          );
        });

      this.service
        .getServicosPorOperadora(
          this.operadoraSelecionada,
          1,
          this.pageIndex,
          this.idUnidadeAtendimento
        )
        .subscribe((data: any) => {
          this.listaServicosProntos = data.body.servicoCobranca;
          this.totalServicosProntos = data.body.total;
          this.dataSourceServicosProntos = new MatTableDataSource(
            this.listaServicosProntos
          );
        });
    }
  }

  retornaCentroCirurgicoPorOperadora() {
    //CENTRO CIRURGICO PENDENTE
    if (this.idUsuario != 'geral') {
      this.service
        .getCentroCirurgicoPorOperadora(
          this.operadoraSelecionada,
          2,
          this.pageIndex,
          this.idUnidadeAtendimento,
          this.idUsuario
        )
        .subscribe((data: any) => {
          this.listaCentroCirurgicoPendente = data.body.centroCirurgico;
          this.totalCentroCirurgicoPendente = data.body.total;
          this.dataSourceCentroCirurgicoPendente = new MatTableDataSource(
            this.listaCentroCirurgicoPendente
          );
        });

      this.service
        .getCentroCirurgicoPorOperadora(
          this.operadoraSelecionada,
          1,
          this.pageIndex,
          this.idUnidadeAtendimento,
          this.idUsuario
        )
        .subscribe((data: any) => {
          this.listaCentroCirurgicoPronto = data.body.centroCirurgico;
          this.totalCentroCirurgicoPronto = data.body.total;
          this.dataSourceCentroCirurgicoPronto = new MatTableDataSource(
            this.listaCentroCirurgicoPronto
          );
        });
    } else {
      this.service
        .getCentroCirurgicoPorOperadora(
          this.operadoraSelecionada,
          2,
          this.pageIndex,
          this.idUnidadeAtendimento
        )
        .subscribe((data: any) => {
          this.listaCentroCirurgicoPendente = data.body.centroCirurgico;
          this.totalCentroCirurgicoPendente = data.body.total;
          this.dataSourceCentroCirurgicoPendente = new MatTableDataSource(
            this.listaCentroCirurgicoPendente
          );
        });

      this.service
        .getCentroCirurgicoPorOperadora(
          this.operadoraSelecionada,
          1,
          this.pageIndex,
          this.idUnidadeAtendimento
        )
        .subscribe((data: any) => {
          this.listaCentroCirurgicoPronto = data.body.centroCirurgico;
          this.totalCentroCirurgicoPronto = data.body.total;
          this.dataSourceCentroCirurgicoPronto = new MatTableDataSource(
            this.listaCentroCirurgicoPronto
          );
        });
    }
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.voltar();
  }

  colunasServicos = [
    'servicos',
    'atendimentos',
    'conta',
    'paciente',
    'convenio',
    'acomodacao',
    'statusConta',
    'editar',
  ];

  colunasCentroCirurgico = [
    'atendimentos',
    'conta',
    'paciente',
    'acomodacao',
    'statusConta',
    'editar',
  ];

  StatusCentroCirurgico = [
    { id: 2, nome: 'Cobrança Pendente' },
    { id: 1, nome: 'Cobrança Pronta' },
  ];
}
