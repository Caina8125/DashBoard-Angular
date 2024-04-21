import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { LoaderService } from '../../loader/loader.service';
import { CriarContasService } from '../criar-contas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, HostListener, Input } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';
import { DarkModeService } from '../../utils/dark-mode.service';
import { ServicoCobranca } from 'src/app/interfaces/ServicoCobranca';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-criar-conta-hospitais',
  templateUrl: './criar-conta-hospitais.component.html',
  styleUrls: ['./criar-conta-hospitais.component.css'],
})
export class CriarContaHospitaisComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private location: Location,
    private token: TokenService,
    private modalService: NgbModal,
    private service: CriarContasService,
    public loadingService: LoaderService,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroCriarConta = modoEscuro;
    });
    this.formUpload = this.fb.group({
      tipoArquivo: [''],
    });
  }

  //#region variaveis
  public ativo: any;
  public codigos: any;
  public idConta: any;
  public nroConta: any;
  public dataAlta: any;
  public plantoes: any;
  public horaFinal: any;
  public idUsuario: any;
  public idServico = [];
  public localConta = 0;
  public operadoras: any;
  public acomodacao: any;
  public listaGuias: any;
  public horaInicial: any;
  public dataInicial: any;
  public nomeArquivo: any;
  public dataCriacao: any;
  public closeResult = '';
  public servico: any = [];
  public listaPlatoes: any;
  public mostraOlho = true;
  public idInternacao: any;
  public listaCodigos: any;
  public botaodsbld = false;
  public statusDaConta: any;
  public servicos: any = [];
  public medicoServico: any;
  public viasDeCobranca: any;
  public idCobranca!: number;
  public dataSourceGuias: any;
  public servicosHSL: any = [];
  public apelidoOperadora: any;
  public formUpload!: FormGroup;
  public dataSourcePlatoes: any;
  public dataSourceCodigos: any;
  public ativoCorpoClincio: any;
  public listaCorpoClinico: any;
  public codigoConvenio!: number;
  public dataSourcePlantoes: any;
  public idCentroCirurgico1: any;
  public idCentroCirurgico2: any;
  public idCentroCirurgico3: any;
  public idUnidadeOperadora: any;
  public dataHoraAtendimento: any;
  public crmSegundoCirurgiao: any;
  public dataCentroCirurgico1: any;
  public dataCentroCirurgico2: any;
  public dataCentroCirurgico3: any;
  public crmPrimeiroCirurgiao: any;
  public crmTerceiroCirurgiao: any;
  public modoEscuroCriarConta: any;
  public cobrancasCorpoClinico: any;
  public crmSegundoAuxEquipeUm: any;
  public unidadeAtendimento!: number;
  public crmPrimeiroAuxEquipeUm: any;
  public dataSourceCorpoClinico: any;
  public crmTerceiroAuxEquipeUm: any;
  public centrosCirurgicos: any = [];
  public crmSegundoAuxEquipeTres: any;
  public crmSegundoAuxEquipeDois: any;
  public crmTerceiroAuxEquipeDois: any;
  public crmTerceiroAuxEquipeTres: any;
  public crmPrimeiroAuxEquipeTres: any;
  public crmPrimeiroAuxEquipeDois: any;
  public mostraOlhoCorpoClinico = true;
  public selected = new FormControl(0);
  public matriculaSegundoCirurgiao: any;
  public opcoesMedicoPendencia: any = []
  public matriculaPrimeiroCirurgiao: any;
  public matriculaTerceiroCirurgiao: any;
  public dataSourceServicosCobrados: any;
  public opcoesSegundoCirurgiao: any = [];
  public matriculaSegundoAuxEquipeUm: any;
  public matriculaPrimeiroAuxEquipeUm: any;
  public opcoesTerceiroCirurgiao: any = [];
  public opcoesPrimeiroCirurgiao: any = [];
  public listaServicosCobrados: any[] = [];
  public listaPlantoesCobrados: any[] = [];
  public matriculaTerceiroAuxEquipeUm: any;
  public matriculaSegundoAuxEquipeTres: any;
  public matriculaSegundoAuxEquipeDois: any;
  public opcoesSegundoAuxEquipeUm: any = [];
  public plantoesSelecionados: number[] = [];
  public matriculaTerceiroAuxEquipeDois: any;
  public matriculaTerceiroAuxEquipeTres: any;
  public matriculaPrimeiroAuxEquipeTres: any;
  public opcoesPrimeiroAuxEquipeUm: any = [];
  public matriculaPrimeiroAuxEquipeDois: any;
  public opcoesTerceiroAuxEquipeUm: any = [];
  public opcoesSegundoAuxEquipeDois: any = [];
  public opcoesSegundoAuxEquipeTres: any = [];
  public opcoesTerceiroAuxEquipeTres: any = [];
  public opcoesTerceiroAuxEquipeDois: any = [];
  public opcoesPrimeiroAuxEquipeTres: any = [];
  public opcoesPrimeiroAuxEquipeDois: any = [];
  data = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];

  public PD = null;
  public PN = null;
  public INP = null;
  public exames: any;
  public dataExame: any;
  public paciente = null;
  public registro!: string;
  public observacao = null;
  public idStatusConta = 1;
  @Input() dadosConta: any;
  public idTipoEnvio = null;
  public idOperadora = null;
  public idLocalCheklist = 0;
  public numeroConta!: number;
  public idStatusValidade = 0;
  public statusServico = null;
  public dataAtendimento: any;
  public nroAcomodacao = null;
  public horaAtendimento: any;
  public centroCirurgicos = [];
  public periodoParcial = null;
  public segundoCirurgiao = null;
  public terceiroCirurgiao = null;
  public primeiroCirurgiao = null;
  public centroCirurgico: any = [];
  public segundoAuxEquipeUm = null;
  public terceiroAuxEquipeUm = null;
  public primeiroAuxEquipeUm = null;
  public observacaoPendencia = null;
  public segundoAuxEquipeDois = null;
  public segundoAuxEquipeTres = null;
  public terceiroAuxEquipeDois = null;
  public terceiroAuxEquipeTres = null;
  public primeiroAuxEquipeDois = null;
  public primeiroAuxEquipeTres = null;
  public idAcomodacao: any | null = null;
  //#endregion

  ngOnInit() {
    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    this.nroConta = this.dadosConta.nroConta;
    this.idUsuario = this.dadosConta.idUsuario;
    this.idInternacao = this.dadosConta.idInternacao;
    this.unidadeAtendimento = this.dadosConta.unidadeAtendimento;

    this.service
      .getStatusConta()
      .subscribe((data:any)=>{
        this.statusDaConta = data.body;
      })

    this.service.getAllLocalConta().subscribe((items: any) => {
      this.viasDeCobranca = items.body;
    });

    this.service
      .getUnidadeOperadoras(this.unidadeAtendimento)
      .subscribe((data: any) => {
        this.operadoras = data.body;
      });

    this.service
      .getTodosServicos(this.unidadeAtendimento)
      .subscribe((data: any) => {
        this.servicos = data.body;
        this.removeCentroCirurgico();
      });

      if (
        this.unidadeAtendimento == 3 ||
        this.unidadeAtendimento == 5 ||
        this.unidadeAtendimento == 6 ||
        this.unidadeAtendimento == 7
      ) {
        this.service.getServicosPlantoes(1).subscribe((data: any) => {
          this.servicosHSL = data.body;
        });
      }
      //_________________________________________________________________________________________

      // Santa lúcia norte
      else if (this.unidadeAtendimento == 2) {
        this.service.getServicosPorUnidade(2).subscribe((data: any) => {
          // console.log(data.body);
          this.servicosHSL = data.body;
        });
      }
      //_____________________________________________________________________________________________

      // Restante(incluindo cti).
      else if (this.unidadeAtendimento != 2) {
        this.service
          .getServicosPlantoes(this.unidadeAtendimento)
          .subscribe((data: any) => {
            this.servicosHSL = data.body;
          });
      }

    if (this.idInternacao != null) {
      this.service
        .getInfoContaPorInternacao(this.idInternacao)
        .subscribe((data: any) => {
          // console.log(data.body);
          if (this.unidadeAtendimento == 4 || this.unidadeAtendimento == 2) {
            this.idAcomodacao = data.body.acomodacaoObject.id;
            this.nroAcomodacao = data.body.nroAcomodacao;
          }
          var dataAlta = data.body.dataFinal;
          var horaFinal = data.body.horaFinal;
          var horaInicial = data.body.horaInicial;
          var dataInicial = data.body.dataInicial;
          var dataCriacao = data.body.dataCriacao;
          this.localConta = data.body.localConta;
          this.idOperadora = data.body.unidadeOperadoraObject.id;
          this.horaFinal = this.datePipe.transform(horaFinal, 'HH:mm');
          this.idUnidadeOperadora = data.body.unidadeOperadoraObject.id;
          this.dataAlta = this.datePipe.transform(dataAlta, 'dd/MM/yyyy');
          this.nomeArquivo = data.body.registroAtendimentoObject.paciente;
          this.horaInicial = this.datePipe.transform(horaInicial, 'HH:mm');
          this.codigoConvenio = data.body.unidadeOperadoraObject.codigoInterno;
          this.dataInicial = this.datePipe.transform(dataInicial, 'dd/MM/yyyy');
          this.dataCriacao = this.datePipe.transform(dataCriacao, 'dd/MM/yyyy');
          this.idTipoEnvio = data.body.unidadeOperadoraObject.operadoraObject.tipoEnvioObject.id;
        });
    }

    if (this.nroConta != null) {
      this.service
        .getInfoContasPorNroConta(this.nroConta, this.unidadeAtendimento)
        .subscribe((data: any) => {
          this.idConta = data.body.id;
          this.registro = data.body.registro;
          this.observacao = data.body.observacao;
          this.localConta = data.body.localConta;
          var dataCriacao = data.body.dataCriacao;
          this.numeroConta = data.body.numeroConta;
          this.localConta = data.body.idLocalConta;
          this.idInternacao = data.body.idInternacao;
          this.idStatusConta = data.body.idStatusConta;
          this.nroAcomodacao = data.body.nroAcomodacao;
          this.periodoParcial = data.body.periodoParcial;
          this.dataAtendimento = data.body.dataAtendimento;
          this.horaAtendimento = data.body.horaAtendimento;
          this.idLocalCheklist = data.body.idLocalChecklist;
          this.idAcomodacao = data.body.acomodacaoObject.id;
          this.idStatusValidade = data.body.idStatusValidade;
          var dataAlta = data.body.internacaoObject.dataFinal;
          var horaFinal = data.body.internacaoObject.horaFinal;
          this.idOperadora = data.body.unidadeOperadoraObject.id;
          var dataInicial = data.body.internacaoObject.dataInicial;
          var horaInicial = data.body.internacaoObject.horaInicial;
          this.dataInicial = data.body.internacaoObject.dataInicial;
          this.horaFinal = this.datePipe.transform(horaFinal, 'HH:mm');
          this.idUnidadeOperadora = data.body.unidadeOperadoraObject.id;
          this.dataAlta = this.datePipe.transform(dataAlta, 'dd/MM/yyyy');
          this.apelidoOperadora = data.body.unidadeOperadoraObject.apelido;
          this.horaInicial = this.datePipe.transform(horaInicial, 'HH:mm');
          this.codigoConvenio = data.body.unidadeOperadoraObject.codigoInterno;
          this.dataCriacao = this.datePipe.transform(dataCriacao, 'dd/MM/yyyy');
          this.dataInicial = this.datePipe.transform(dataInicial, 'dd/MM/yyyy');
          this.nomeArquivo = data.body.internacaoObject.registroAtendimentoObject.paciente;
          this.idTipoEnvio = data.body.unidadeOperadoraObject.operadoraObject.tipoEnvioObject.id;

          this.obterGuiasDaconta(this.nroConta, this.codigoConvenio);
          this.service
            .getCobrancaPorIdConta(this.idConta)
            .subscribe((data: any) => {
              this.idCobranca = data.body.id;
              this.obterCodigos(0);
              this.obterCentroCirurgico();
              this.obterQuantidadePlantoes();
              this.obterServicosEPlantoes(0);
              this.obterServicoCentroCirurgico(0, this.idCobranca);
            });

          this.dataAtendimento = this.datePipe.transform(
            this.dataAtendimento,
            'dd/MM/yyyy'
          );
          this.horaAtendimento = this.datePipe.transform(
            this.horaAtendimento,
            'HH:mm'
          );
        });
    }
  }

  trocarStatusGuia(idGuia: any) {
    Swal.fire({
      title: 'Tem certeza que deseja devolver esta guia?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.postTrocaStatusGuia(idGuia).subscribe({
          next: (data: any) => {
            Swal.fire('', 'Status da guia alterado', 'success');
          },
          error: () => {
            Swal.fire(
              '',
              'Não possivel alterar o status da guia alterado',
              'error'
            );
          },
          complete: () => {
            this.obterGuiasDaconta(this.nroConta, this.codigoConvenio);
          },
        });
      }
    });
  }

  obterGuiasDaconta(nroConta: any, codigoOperadora: any) {
    this.service.getGuias(nroConta, codigoOperadora).subscribe({
      next: (data) => {
        this.listaGuias = data.body;
        this.dataSourceGuias = new MatTableDataSource(this.listaGuias);
      },
    });
  }

  removeCentroCirurgico() {
    this.servicos.forEach((element: any, index: number) => {
      if (element.descricao === 'CENTRO-CIRURGICO') {
        this.servicos.splice(index, 1);
      }
    });
  }

  open(content: any) {
    this.modalService.open(content).result.then(
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

  atualizaStatusServico(servico: any, descricao: any) {
    if (descricao == 'CENTRO-CIRURGICO') {
      this.service
        .putCentroCirurgico(servico, this.statusServico)
        .subscribe(() => {
          this.obterServico(0, this.idCobranca);
          this.modalService.dismissAll();
        });
    } else {
      this.service
        .putStatusServicos(servico, this.statusServico)
        .subscribe(() => {
          this.service
            .getServicoPorConta(0, this.idCobranca)
            .subscribe((data: any) => {
              this.obterServico(0, this.idCobranca);
              this.idServico = data.body.id;
              this.modalService.dismissAll();
            });
        });
    }
  }

  calcularData() {
    this.service
      .getQtdDiasVencimento(this.dataAtendimento, this.idUnidadeOperadora)
      .subscribe((data: any) => {
        var diasParaVencimento = data.body;
        if (diasParaVencimento > 15) this.idStatusValidade = 1;
        else if (diasParaVencimento >= 1 && diasParaVencimento <= 15)
          this.idStatusValidade = 2;
        else if (diasParaVencimento <= 0) this.idStatusValidade = 3;
      });
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.voltar();
  }

  criarConta() {
    if (this.idOperadora == 1)
      Swal.fire('', 'Não foi possivel criar a conta', 'error');
    else {
      if (this.dataAtendimento != null) {
        this.dataAtendimento = this.dataAtendimento + ' 00:00:00';
      }
      if (this.dataAtendimento.length >= 28) {
        this.dataAtendimento = this.dataAtendimento.substring(0, 19);
      }
      if (this.dataAtendimento === undefined) {
        Swal.fire('', 'Informe uma data válida!', 'error');
        return;
      }
      if (this.horaAtendimento === undefined) {
        Swal.fire('', 'Informe uma hora válida!', 'error');
        return;
      }
      this.dataHoraAtendimento = this.dataAtendimento + ' ' + this.horaAtendimento + ':00';
      if (this.localConta === undefined) {
        Swal.fire('', 'Selecione a via de cobrança!', 'error');
        this.horaAtendimento = '';
        return;
      }
      this.service
        .postConta(
          this.idConta,
          this.idInternacao,
          this.idOperadora,
          this.idLocalCheklist,
          this.idStatusConta,
          this.numeroConta,
          this.registro,
          this.observacao,
          this.observacaoPendencia,
          this.dataAtendimento,
          this.horaAtendimento,
          this.nroAcomodacao,
          this.idAcomodacao,
          this.idStatusValidade,
          this.unidadeAtendimento,
          this.localConta,
          this.periodoParcial
        )
        .subscribe({
          next: (data: any) => {
            this.idConta = data.body.id;
            this.idCobranca = data.body.idCobranca;
            Swal.fire('Conta Salva', '', 'success');
          },
          error: (data: any) => {
            if (data.error.errors.Mensagens != null) {
              Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
            } else {
              Swal.fire('', 'Não foi possivel salvar essa conta', 'error');
            }
          },
        });
      //______________________________________________________________________________________________
    }
  }

  obterPlantoesDaConta(ativo: any) {
    this.service.getPlantoesDaConta(ativo, this.idCobranca).subscribe({
      next: (data: any) => {
        const arr1 = data.body.cobrancasCorpoClinico;
        const arr2 = data.body.servicosCobrancas;
        this.listaPlantoesCobrados = [...arr1, ...arr2];
        this.listaPlantoesCobrados = this.listaPlantoesCobrados.filter(
          (objeto) => objeto.idServico !== 48
        );

        this.dataSourcePlantoes = new MatTableDataSource<any>(
          this.listaPlantoesCobrados
        );
    },
    });
  }

  obterServico(ativo: any, idCobranca: any) {
      this.service
        .getServicoPorConta(ativo, idCobranca)
        .subscribe((data: any) => {
          const arr1 = data.body.cobrancasCorpoClinico;
          const arr2 = data.body.servicosCobrancas;
          this.listaServicosCobrados = [...arr1, ...arr2];
          this.dataSourceServicosCobrados = new MatTableDataSource<any>(
            this.listaServicosCobrados
          );
          this.idServico = data.body.id;
        });
  }

  async obterServicosEPlantoes(ativo: any,dados?:any) {
    if(dados){
      this.dataSourceServicosCobrados = new MatTableDataSource<any>(dados);
    }else{
      this.listaServicosCobrados = [];
      await this.service
        .getPlantoesDaConta(ativo, this.idCobranca)
        .subscribe((data: any) => {
          const arr1 = data.body.cobrancasCorpoClinico;
          const arr2 = data.body.servicosCobrancas;
          this.listaServicosCobrados = [...arr1, ...arr2];
          this.dataSourceServicosCobrados = new MatTableDataSource<any>(
            this.listaServicosCobrados
          );
        });
    }
  }

  obterPlatoes(ativo: any, idCobranca: any) {
    this.service.getPlantoes(ativo, idCobranca).subscribe((data: any) => {
      this.listaPlatoes = data.body.servicosCobrancas;
      this.dataSourcePlatoes = new MatTableDataSource(this.listaPlatoes);
    });
  }

  obterServicoCentroCirurgico(ativo: any, idCobranca: any) {
    this.service
      .getCorpoClinicoAtivoEInativo(ativo, idCobranca)
      .subscribe((data: any) => {
        this.listaCorpoClinico = data.body;
        this.dataSourceCorpoClinico = new MatTableDataSource<any>(
          this.listaCorpoClinico
        );
        if (data.body.length != 0) {
          this.idCentroCirurgico1 = data.body[0].idCentroCirurgico;
        }
      });
  }

  obterCentroCirurgico() {
    this.centrosCirurgicos = [];
    this.service
      .getCentroCirurgico(0, this.idCobranca)
      .subscribe((data: any) => {
        this.centroCirurgicos = data.body;
        const centroCirurgico = data.body;
        centroCirurgico.forEach((element: any) => {
          this.centrosCirurgicos.push(element);
        });
      });
  }

  mostraServicosInativos() {
    this.mostraOlho = !this.mostraOlho;
    // console.log(this.mostraOlho);
    if (this.mostraOlho == false) {
      this.obterServicosEPlantoes(1);
    } else {
      this.obterServicosEPlantoes(0);
    }
  }

  mostraCorpoClinicoInativos() {
    this.mostraOlhoCorpoClinico = !this.mostraOlhoCorpoClinico;
    if (this.mostraOlhoCorpoClinico == false) {
      this.obterServicoCentroCirurgico(1, this.idCobranca);
    }
    if (this.mostraOlhoCorpoClinico == true) {
      this.obterServicoCentroCirurgico(0, this.idCobranca);
    }
  }

  trocarAtivoCorpoClinico(idCobrancaCorpoClinico: any, ativo: any) {
    if (ativo == 0) {
      this.ativoCorpoClincio = 1;
    }
    if (ativo == 1) {
      this.ativoCorpoClincio = 0;
    }
    this.editarAtivoCorpoClinico(
      idCobrancaCorpoClinico,
      this.ativoCorpoClincio
    );
  }

  editarAtivoCorpoClinico(idCobrancaCorpoClinico: any, ativo: any) {
    if (this.mostraOlhoCorpoClinico == true) {
      Swal.fire({
        title: 'Tem certeza que deseja desativar esse serviço?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.service
            .putCorpoClincio(idCobrancaCorpoClinico, ativo)
            .subscribe({
              next: () => {
                Swal.fire('', 'Serviço desativado com sucesso', 'success');
                this.obterServicoCentroCirurgico(0, this.idCobranca);
              },
              error: (data: any) => {
                if (data.error.errors.Mensagens != null) {
                  Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
                } else {
                  Swal.fire(
                    '',
                    'Não foi possivel desativado esse corpo clinico',
                    'error'
                  );
                }
              },
            });
        }
      });
    }
    if (this.mostraOlhoCorpoClinico == false) {
      Swal.fire({
        title: 'Tem certeza que deseja ativar esse serviço?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.service
            .putCorpoClincio(idCobrancaCorpoClinico, ativo)
            .subscribe({
              next: () => {
                Swal.fire('', 'Serviço ativado com sucesso', 'success');
                this.obterServicoCentroCirurgico(0, this.idCobranca);
              },
              error: (data: any) => {
                // console.log(data);
                if (data.error.errors.Mensagens != null) {
                  Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
                } else {
                  Swal.fire(
                    '',
                    'Não foi possivel ativar esse corpo clinico',
                    'error'
                  );
                }
              },
            });
        }
      });
    }
  }

  trocaValorAtivo(servicoId: any, ativo: any, descricao: any) {
    if (ativo == 0) {
      this.ativo = 1;
    }
    if (ativo == 1) {
      this.ativo = 0;
    }

    this.editarAtivoServico(servicoId, this.ativo, descricao);
  }

  editarAtivoServico(idServico: any, ativo: any, descricao: any) {
    if (this.mostraOlho == true) {
      Swal.fire({
        title: 'Tem certeza que deseja desativar serviço?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          if (descricao == 'CENTRO-CIRURGICO') {
            this.service.putCentroCirurgicoAtivo(idServico, ativo).subscribe({
              next: () => {
                // console.log(data.body);
                Swal.fire('', 'Serviço desativado com sucesso', 'success');
                this.obterServico(0, this.idCobranca);
              },
              error: (data: any) => {
                if (data.error.errors.Mensagens != null) {
                  Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
                } else {
                  Swal.fire(
                    '',
                    `Não foi possivel desativar o serviço`,
                    'error'
                  );
                }
              },
            });
          } else {
            this.service.putAtivoServicos(idServico, ativo).subscribe(() => {
              Swal.fire('', 'Serviço desativado com sucesso', 'success');
              this.obterServicosEPlantoes(0);
            });
          }
        }
      });
    }
    if (this.mostraOlho == false) {
      Swal.fire({
        title: 'Tem certeza que deseja ativar serviço?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          if (descricao == 'CENTRO-CIRURGICO') {
            this.service.putCentroCirurgicoAtivo(idServico, ativo).subscribe({
              next: () => {
                // console.log(data.body);
                Swal.fire('', 'Serviço desativado com sucesso', 'success');
                this.obterServico(1, this.idCobranca);
              },
              error: (data: any) => {
                if (data.error.errors.Mensagens != null) {
                  Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
                } else {
                  Swal.fire(
                    '',
                    `Não foi possivel desativar o serviço`,
                    'error'
                  );
                }
              },
            });
          } else {
            this.service.putAtivoServicos(idServico, ativo).subscribe(() => {
              Swal.fire('', 'Serviço ativado com sucesso', 'success');
              this.service
                .getServicoPorConta(1, this.idCobranca)
                .subscribe((data: any) => {
                  this.listaServicosCobrados = data.body;
                  this.dataSourceServicosCobrados = new MatTableDataSource<any>(
                    this.listaServicosCobrados
                  );
                  this.idServico = data.body.id;
                });
            });
          }
        }
      });
    }
  }

  gerarCheckList() {
    this.service.getChecklist(this.idConta, this.idCobranca).subscribe({
      next: (data) => {
        // console.log(data);
        this.renderDownload(
          data.body,
          `${this.numeroConta}-${this.nomeArquivo}.xlsx`
        );
      },
      error: () => {
        this.getErro();
      },
    });
  }

  getErro() {
    this.service.getErroChecklist(this.idConta, this.idCobranca).subscribe({
      next: (data) => {
        // console.log(data);
        this.renderDownload(
          data.body,
          `${this.numeroConta}-${this.nomeArquivo}.xlsx`
        );
      },
      error: (data) => {
        if (data.error.errors.Mensagens != null) {
          Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
        } else {
          Swal.fire('', 'Não foi possivel salvar essa conta', 'error');
        }
      },
    });
  }

  renderDownload(data: any, fileName: string) {
    let type = data.type;
    const downloadedFile = new Blob([data as BlobPart], { type: type });
    const a = document.createElement('a');
    // a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  //#region busca profissionais - SERÁ REESCRITO
  buscaPrimeiroCirurgiao(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        // console.log(data.body);
        this.opcoesPrimeiroCirurgiao = data.body;
      });
    }
  }

  buscaPrimeiroAuxEquipeUm(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesPrimeiroAuxEquipeUm = data.body;
      });
    }
  }

  buscaSegundoAuxEquipeUm(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesSegundoAuxEquipeUm = data.body;
      });
    }
  }

  buscaTerceiroAuxEquipeUm(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesTerceiroAuxEquipeUm = data.body;
      });
    }
  }

  buscaSegundoCirurgiao(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesSegundoCirurgiao = data.body;
      });
    }
  }

  buscaPrimeiroAuxEquipeDois(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesPrimeiroAuxEquipeDois = data.body;
      });
    }
  }

  buscaSegundoAuxEquipeDois(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesSegundoAuxEquipeDois = data.body;
      });
    }
  }

  buscaTerceiroAuxEquipeDois(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesTerceiroAuxEquipeDois = data.body;
      });
    }
  }

  buscaTerceiroCirurgiao(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesTerceiroCirurgiao = data.body;
      });
    }
  }

  buscaPrimeiroAuxEquipeTres(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesPrimeiroAuxEquipeTres = data.body;
      });
    }
  }

  buscaSegundoAuxEquipeTres(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesSegundoAuxEquipeTres = data.body;
      });
    }
  }

  buscaTerceiroAuxEquipeTres(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesTerceiroAuxEquipeTres = data.body;
      });
    }
  }
  //#endregion

  adicionaCentroCirurgico() {
    if (
      this.dataCentroCirurgico1 != null ||
      this.dataCentroCirurgico2 != null ||
      this.dataCentroCirurgico3 != null
    ) {
      if (
        this.primeiroCirurgiao != null ||
        this.primeiroAuxEquipeUm != null ||
        this.segundoAuxEquipeUm != null ||
        this.terceiroAuxEquipeUm != null
      ) {
        this.service
          .postCentroCirurgico(
            this.idCobranca,
            1,
            2,
            27,
            0,
            this.dataCentroCirurgico1
          )
          .subscribe({
            next: (data: any) => {
              this.idCentroCirurgico1 = data.body.id;
              this.enviaProfissionais();
              this.obterCentroCirurgico();
              this.obterServico(0, this.idCobranca);
            },
          });
      }

      if (
        this.segundoCirurgiao != null ||
        this.primeiroAuxEquipeDois != null ||
        this.segundoAuxEquipeDois != null ||
        this.terceiroAuxEquipeDois != null
      ) {
        this.service
          .postCentroCirurgico(
            this.idCobranca,
            2,
            2,
            27,
            0,
            this.dataCentroCirurgico2
          )
          .subscribe((data: any) => {
            this.idCentroCirurgico2 = data.body.id;
            this.enviaProfissionais();
          });
      }

      if (
        this.terceiroCirurgiao != null ||
        this.primeiroAuxEquipeTres != null ||
        this.segundoAuxEquipeTres != null ||
        this.terceiroAuxEquipeTres != null
      ) {
        this.service
          .postCentroCirurgico(
            this.idCobranca,
            3,
            2,
            27,
            0,
            this.dataCentroCirurgico3
          )
          .subscribe((data: any) => {
            this.idCentroCirurgico3 = data.body.id;
            this.enviaProfissionais();
          });
      }
    } else {
      Swal.fire(
        '',
        'É necessário que a data do centro cirurgico seja preenchida',
        'error'
      );
    }
  }

  enviaProfissionais() {
    if (this.idCentroCirurgico1 != undefined) {
      this.opcoesPrimeiroCirurgiao.forEach((element: any) => {
        if (this.primeiroCirurgiao == element.PessoaFisica.Pessoa.NomeRazao) {
          this.crmPrimeiroCirurgiao = element.CodigoConselho;
          this.matriculaPrimeiroCirurgiao = element.Credenciado.Matricula;
          return;
        }
      });
      if (this.crmPrimeiroCirurgiao != undefined) {
        this.service
          .postCorpoClinico(
            this.idCentroCirurgico1,
            this.primeiroCirurgiao,
            this.crmPrimeiroCirurgiao,
            this.matriculaPrimeiroCirurgiao,
            1,
            0
          )
          .subscribe({
            next: () => {
              Swal.fire('Centro cirurgico salvo', '', 'success');
              this.service
                .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
                .subscribe((data: any) => {
                  this.listaCorpoClinico = data.body;
                  this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                    this.listaCorpoClinico
                  );
                });
            },
            error: (err) => {
              Swal.fire('', `${err.error.errors.Mensagens}`, 'error');
            },
          });
      }

      this.opcoesPrimeiroAuxEquipeUm.forEach((element: any) => {
        if (this.primeiroAuxEquipeUm == element.PessoaFisica.Pessoa.NomeRazao) {
          this.crmPrimeiroAuxEquipeUm = element.CodigoConselho;
          this.matriculaPrimeiroAuxEquipeUm = element.Credenciado.Matricula;
          return;
        }
      });
      if (this.crmPrimeiroAuxEquipeUm != undefined) {
        this.service
          .postCorpoClinico(
            this.idCentroCirurgico1,
            this.primeiroAuxEquipeUm,
            this.crmPrimeiroAuxEquipeUm,
            this.matriculaPrimeiroAuxEquipeUm,
            2,
            0
          )
          .subscribe(() => {
            Swal.fire('Centro cirurgico salvo', '', 'success');
            this.service
              .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
              .subscribe((data: any) => {
                this.listaCorpoClinico = data.body;
                this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                  this.listaCorpoClinico
                );
              });
          });
      }

      this.opcoesSegundoAuxEquipeUm.forEach((element: any) => {
        if (this.segundoAuxEquipeUm == element.PessoaFisica.Pessoa.NomeRazao) {
          this.crmSegundoAuxEquipeUm = element.CodigoConselho;
          this.matriculaSegundoAuxEquipeUm = element.Credenciado.Matricula;
          return;
        }
      });
      if (this.crmSegundoAuxEquipeUm != undefined) {
        this.service
          .postCorpoClinico(
            this.idCentroCirurgico1,
            this.segundoAuxEquipeUm,
            this.crmSegundoAuxEquipeUm,
            this.matriculaSegundoAuxEquipeUm,
            3,
            0
          )
          .subscribe(() => {
            Swal.fire('Centro cirurgico salvo', '', 'success');
            this.service
              .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
              .subscribe((data: any) => {
                this.listaCorpoClinico = data.body;
                this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                  this.listaCorpoClinico
                );
              });
          });
      }

      this.opcoesTerceiroAuxEquipeUm.forEach((element: any) => {
        if (this.terceiroAuxEquipeUm == element.PessoaFisica.Pessoa.NomeRazao) {
          this.crmTerceiroAuxEquipeUm = element.CodigoConselho;
          this.matriculaTerceiroAuxEquipeUm = element.Credenciado.Matricula;
          return;
        }
      });
      if (this.crmTerceiroAuxEquipeUm != undefined) {
        this.service
          .postCorpoClinico(
            this.idCentroCirurgico1,
            this.terceiroAuxEquipeUm,
            this.crmTerceiroAuxEquipeUm,
            this.matriculaTerceiroAuxEquipeUm,
            4,
            0
          )
          .subscribe(() => {
            Swal.fire('Centro cirurgico salvo', '', 'success');
            this.service
              .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
              .subscribe((data: any) => {
                this.listaCorpoClinico = data.body;
                this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                  this.listaCorpoClinico
                );
              });
          });
      }
    }

    this.opcoesSegundoCirurgiao.forEach((element: any) => {
      if (this.segundoCirurgiao == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmSegundoCirurgiao = element.CodigoConselho;
        this.matriculaSegundoCirurgiao = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmSegundoCirurgiao != undefined) {
      if (this.idCentroCirurgico2 == undefined) {
        this.adicionaCentroCirurgico();
      }
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico2,
          this.segundoCirurgiao,
          this.crmSegundoCirurgiao,
          this.matriculaSegundoCirurgiao,
          1,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesPrimeiroAuxEquipeDois.forEach((element: any) => {
      if (this.primeiroAuxEquipeDois == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmPrimeiroAuxEquipeDois = element.CodigoConselho;
        this.matriculaPrimeiroAuxEquipeDois = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmPrimeiroAuxEquipeDois != undefined) {
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico2,
          this.primeiroAuxEquipeDois,
          this.crmPrimeiroAuxEquipeDois,
          this.matriculaPrimeiroAuxEquipeDois,
          2,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesSegundoAuxEquipeDois.forEach((element: any) => {
      if (this.segundoAuxEquipeDois == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmSegundoAuxEquipeDois = element.CodigoConselho;
        this.matriculaSegundoAuxEquipeDois = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmSegundoAuxEquipeDois != undefined) {
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico2,
          this.segundoAuxEquipeDois,
          this.crmSegundoAuxEquipeDois,
          this.matriculaSegundoAuxEquipeDois,
          3,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesTerceiroAuxEquipeDois.forEach((element: any) => {
      if (this.terceiroAuxEquipeDois == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmTerceiroAuxEquipeDois = element.CodigoConselho;
        this.matriculaTerceiroAuxEquipeDois = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmTerceiroAuxEquipeDois != undefined) {
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico2,
          this.terceiroAuxEquipeDois,
          this.crmTerceiroAuxEquipeDois,
          this.matriculaTerceiroAuxEquipeDois,
          4,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesTerceiroCirurgiao.forEach((element: any) => {
      if (this.terceiroCirurgiao == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmTerceiroCirurgiao = element.CodigoConselho;
        this.matriculaTerceiroCirurgiao = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmTerceiroCirurgiao != undefined) {
      if (this.idCentroCirurgico3 == undefined) {
        this.adicionaCentroCirurgico();
      }
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico3,
          this.terceiroCirurgiao,
          this.crmTerceiroCirurgiao,
          this.matriculaTerceiroCirurgiao,
          1,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesPrimeiroAuxEquipeTres.forEach((element: any) => {
      if (this.primeiroAuxEquipeTres == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmPrimeiroAuxEquipeTres = element.CodigoConselho;
        this.matriculaPrimeiroAuxEquipeTres = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmPrimeiroAuxEquipeTres != undefined) {
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico3,
          this.primeiroAuxEquipeTres,
          this.crmPrimeiroAuxEquipeTres,
          this.matriculaPrimeiroAuxEquipeTres,
          2,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesSegundoAuxEquipeTres.forEach((element: any) => {
      if (this.segundoAuxEquipeTres == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmSegundoAuxEquipeTres = element.CodigoConselho;
        this.matriculaSegundoAuxEquipeTres = element.Credenciado.Matricula;
        return;
      }
    });
    if (this.crmSegundoAuxEquipeTres != undefined) {
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico3,
          this.segundoAuxEquipeTres,
          this.crmSegundoAuxEquipeTres,
          this.matriculaSegundoAuxEquipeTres,
          3,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }

    this.opcoesTerceiroAuxEquipeTres.forEach((element: any) => {
      if (this.terceiroAuxEquipeTres == element.PessoaFisica.Pessoa.NomeRazao) {
        this.crmTerceiroAuxEquipeTres = element.CodigoConselho;
        this.matriculaTerceiroAuxEquipeTres = element.CodigoConselho;
        return;
      }
    });
    if (this.crmTerceiroAuxEquipeTres != undefined) {
      this.service
        .postCorpoClinico(
          this.idCentroCirurgico3,
          this.terceiroAuxEquipeTres,
          this.crmTerceiroAuxEquipeTres,
          this.matriculaTerceiroAuxEquipeTres,
          4,
          0
        )
        .subscribe(() => {
          Swal.fire('Centro cirurgico salvo', '', 'success');
          this.service
            .getCorpoClinicoAtivoEInativo(0, this.idCobranca)
            .subscribe((data: any) => {
              this.listaCorpoClinico = data.body;
              this.dataSourceCorpoClinico = new MatTableDataSource<any>(
                this.listaCorpoClinico
              );
            });
        });
    }
  }

  enviarPlantoesExames() {
    this.plantoesSelecionados = [];

    if (this.PD == true) {
      this.plantoesSelecionados.push(9);
    }
    if (this.PN == true) {
      this.plantoesSelecionados.push(11);
    }

    if (this.INP == true) {
      this.plantoesSelecionados.push(12);
    }
    if (this.exames) {
      this.exames.forEach((element: any) => {
        this.plantoesSelecionados.push(element.id);
      });
    }
    const servicos: ServicoCobranca[] = [
      {
        idCobranca: this.idCobranca,
        idServico: this.plantoesSelecionados,
        idAcomodacao: this.idAcomodacao,
        dataServico: this.dataExame,
        nome: this.medicoServico?.PessoaFisica.Pessoa.NomeRazao,
        crm: this.medicoServico?.CodigoConselho,
        matricula: this.medicoServico?.Credenciado.Matricula,
      }
    ]

    if (this.plantoesSelecionados.length > 0) {
      this.service
        .postPlantoesCTI(
          servicos
        )
        .subscribe({
          next: () => {
            Swal.fire(
              'Parabéns!',
              'Serviços adicionados com sucesso',
              'success'
            );
            this.obterServico(0, this.idCobranca);
          },
          error(err) {
            Swal.fire('Ops...', `${err.error.errors.Mensagens}`, 'error');
          },
        });
    }
  }

  salvarCodigos() {
    // console.log(this.centroCirurgicos[0]);
    this.service
      .postCodigos(this.centroCirurgicos[0], 0, this.codigos)
      .subscribe({
        next: () => {
          // console.log(data);
        },
        error: (err: any) => {
          Swal.fire('', `${err.error.errors.Mensagens}`, 'error');
        },
        complete: () => {
          Swal.fire('', 'Codigos salvos com sucesso!', 'success');
          this.obterCodigos(0);
        },
      });
  }

  obterCodigos(ativo: any) {
    this.service.getCodigosCentroCirurgico(ativo, this.idCobranca).subscribe({
      next: (data) => {
        // console.log(data);
        this.listaCodigos = data;
        this.dataSourceCodigos = new MatTableDataSource(this.listaCodigos);
      },
      error: () => {
        // console.log(err);
      },
    });
  }

  obterCodigosAtivosEInativos() {
    this.mostraOlho = !this.mostraOlho;
    // console.log(this.mostraOlho);
    if (this.mostraOlho == false) {
      this.obterCodigos(1);
    } else {
      this.obterCodigos(0);
    }
  }

  trocarValorAtivo(id: any, ativo: any) {
    if (ativo == 1) {
      ativo = 0;
    } else {
      ativo = 1;
    }

    if (this.mostraOlho == true) {
      Swal.fire({
        title: 'Tem certeza que deseja desativar esse código?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.service.putCodigoCentroCirurgico(id, ativo).subscribe({
            next: () => {
              Swal.fire('', 'Código desativado com sucesso', 'success');
            },
            error: (err) => {
              Swal.fire('', `${err.error}`, 'error');
            },
            complete: () => {
              this.obterCodigosAtivosEInativos();
            },
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Tem certeza que deseja ativar esse código?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.service.putCodigoCentroCirurgico(id, ativo).subscribe({
            next: () => {
              Swal.fire('', 'Código ativado com sucesso', 'success');
            },
            error: (err) => {
              Swal.fire('', `${err.error}`, 'error');
            },
            complete: () => {
              this.obterCodigosAtivosEInativos();
            },
          });
        }
      });
    }
  }

  obterQuantidadePlantoes() {
    this.service.getQuantidadePlantoes(0, this.idCobranca).subscribe({
      next: (data: any) => {
        this.plantoes = data.body;
      },
    });
  }

  Envio = [
    { id: 1, nome: 'Digital' },
    { id: 2, nome: 'Meio Físico' },
  ];

  LocalChecklist = [
    { id: 0, nome: 'Selecione um local' },
    { id: 1, nome: 'AMHP' },
    { id: 2, nome: 'Hospital' },
  ];

  StatusCobranca = [
    { id: 2, nome: 'Cobrança Pendente' },
    { id: 1, nome: 'Cobrança Pronto' },
  ];

  StatusCentroCirurgico = [
    { id: 2, nome: 'Médico Pendente' },
    { id: 1, nome: 'Médico Pronto' },
  ];

  Acomodacao = [
    { id: 1, nome: 'Apartamento' },
    { id: 2, nome: 'Enfermaria' },
    { id: 3, nome: 'Centro Cirurgico' },
    { id: 4, nome: 'UTI Adulto' },
    { id: 5, nome: 'UTI Neonatal' },
    { id: 6, nome: 'UTI Pediatrica' },
    { id: 15, nome: 'Day Clinic' },
  ];

  colunasServicos = [
    'servicos',
    'acomodacao',
    'statusCobranca',
    'medico',
    // 'valor',
    'dataServico',
    'editar',
    'limpar',
  ];

  colunasCorpoClinico = [
    'grauParticipacao',
    'nome',
    'equipe',
    'data',
    'limpar',
  ];

  listaStatusValidade = [
    { id: 1, descricao: 'Validade normal' },
    { id: 2, descricao: 'Proximo de vencer' },
    { id: 3, descricao: 'Vencido' },
    // { id:4, descricao:'Conta Pronta'},
    // { id:5, descricao:'Concluido'},
  ];

  colunasPlantoes = [
    'data',
    'descricao',
    'status',
    'medico',
    'editar',
    'limpar',
  ];

  servicosApartamento = [
    { id: 1, nome: 'VISITA MÉDICA' },
    { id: 7, nome: 'PARECER MÉDICO' },
    { id: 30, nome: 'ELETROCARDIOGRAMA (ECG)' },
    { id: 34, nome: 'ECODOPPLERCARDIOGRAMA TRANSTORÁCICO' },
  ];

  codigosCentroCirurgico = ['display', 'descricao', 'icone'];

  colunasGuias = [
    'numeroGuia',
    'nomeBeneficiario',
    'prontuario',
    'tipoGuia',
    'apelido',
    'statusAtendimento',
    'devolver',
  ];
}
