import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { LoaderService } from '../../loader/loader.service';
import { CriarContasService } from '../criar-contas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, HostListener, Input } from '@angular/core';
import { DarkModeService } from '../../utils/dark-mode.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { ServicoCobranca } from 'src/app/interfaces/ServicoCobranca';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-criar-conta-cti',
  templateUrl: './criar-conta-cti.component.html',
  styleUrls: ['./criar-conta-cti.component.css'],
})
export class CriarContaCtiComponent {
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
  public nroConta: any;
  public dataAlta: any;
  public servicos: any;
  public plantoes: any;
  public horaFinal: any;
  public idUsuario: any;
  public idServico = [];
  public localConta = 0;
  public operadoras: any;
  public acomodacao: any;
  public listaGuias: any;
  public horaInicial: any;
  public idConta!: number;
  public viaCobranca: any;
  public dataInicial: any;
  public nomeArquivo: any;
  public dataCriacao: any;
  public closeResult = '';
  public servico: any = [];
  public listaPlatoes: any;
  public mostraOlho = true;
  public idInternacao: any;
  public statusDaConta: any;
  public codigoConvenio: any;
  public idCobranca!: number;
  public dataSourceGuias: any;
  public servicosHSL: any = [];
  public formUpload!: FormGroup;
  public dataSourcePlatoes: any;
  public ativoCorpoClincio: any;
  public listaCorpoClinico: any;
  public dataSourcePlantoes: any;
  public idUnidadeOperadora: any;
  public dataHoraAtendimento: any;
  public modoEscuroCriarConta: any;
  public idCentroCirurgico!: number;
  public cobrancasCorpoClinico: any;
  public unidadeAtendimento!: number;
  public dataSourceCorpoClinico: any;
  public mostraOlhoCorpoClinico = true;
  public selected = new FormControl(0);
  isBotaoDesabilitado: boolean = false;
  public dataSourceServicosCobrados: any;
  public listaServicosCobrados: any[] = [];
  public listaPlantoesCobrados: any[] = [];
  data = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];

  public Uti = [];
  public Utin = [];
  public Utip = [];
  public paciente = null;
  public enfermaria = [];
  public apartamento = [];
  public registro!: string;
  public observacao = null;
  public idStatusConta = 1;
  public enfermariaHSL = [];
  public idTipoEnvio = null;
  public idOperadora = null;
  public apartamentoHSL = [];
  public idLocalCheklist = 0;
  public numeroConta!: number;
  public idStatusValidade = 0;
  public statusServico = null;
  public dataAtendimento: any;
  public nroAcomodacao = null;
  public horaAtendimento: any;
  public idAcomodacao!: number;
  public periodoParcial = null;
  public observacaoPendencia = null;
  @Input() dadosConta!: any;
  //#endregion

  ngOnInit() {
    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    this.nroConta = this.dadosConta.nroConta;
    this.idUsuario = this.dadosConta.idUsuario;
    this.idInternacao = this.dadosConta.idInternacao;
    this.unidadeAtendimento = this.dadosConta.unidadeAtendimento;

    this.service.getStatusConta().subscribe((data: any) => {
      this.statusDaConta = data.body;
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

    this.service
      .getServicosPlantoes(this.unidadeAtendimento)
      .subscribe((data: any) => {
        this.servicosHSL = data.body;
      });

    if (this.idInternacao != null) {
      this.service
        .getInfoContaPorInternacao(this.idInternacao)
        .subscribe((data: any) => {
          this.idAcomodacao = data.body.acomodacaoObject.id;
          this.nroAcomodacao = data.body.nroAcomodacao;
          this.idStatusConta = 7;
          this.dataInicial = data.body.dataInicial;
          this.viaCobranca = data.body.unidadeOperadoraObject.idLocalConta;
          this.registro = data.body.registroAtendimentoObject.nroRegistroAtendimento;
          this.registro = this.registro.toString();
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
          this.idTipoEnvio =
            data.body.unidadeOperadoraObject.operadoraObject.tipoEnvioObject.id;
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
          console.log(data.body);
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
          this.horaInicial = this.datePipe.transform(horaInicial, 'HH:mm');
          this.dataAlta = this.datePipe.transform(dataAlta, 'dd/MM/yyyy');
          this.codigoConvenio = data.body.unidadeOperadoraObject.codigoInterno;
          this.dataCriacao = this.datePipe.transform(dataCriacao, 'dd/MM/yyyy');
          this.dataInicial = this.datePipe.transform(dataInicial, 'dd/MM/yyyy');
          this.nomeArquivo = data.body.internacaoObject.registroAtendimentoObject.paciente;
          this.idTipoEnvio = data.body.unidadeOperadoraObject.operadoraObject.tipoEnvioObject.id;

          this.viaCobranca = data.body.unidadeOperadoraObject.idLocalConta;

          this.obterGuiasDaconta(this.nroConta, this.codigoConvenio);
          this.service
            .getCobrancaPorIdConta(this.idConta)
            .subscribe((data: any) => {
              this.idCobranca = data.body.id;
              this.obterQuantidadePlantoes();
              this.obterServico(0, this.idCobranca);
              this.obterServicoCentroCirurgico(0, this.idCobranca);
              this.obterPlantoesDaConta(0);
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

  obterGuiasDaconta(nroConta: any, codigoOperadora: any) {
    this.service.getGuias(nroConta, codigoOperadora, '22010').subscribe({
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
              // console.log(data.body);
              this.obterServico(0, this.idCobranca);
              this.obterPlatoes(0, this.idCobranca);
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
    this.isBotaoDesabilitado = true;
    if (this.idOperadora == 1){
      Swal.fire('', 'Não foi possivel criar a conta', 'error');
      this.isBotaoDesabilitado = false;
    }
    else {
      if (this.dataAtendimento === undefined) {
        Swal.fire('', 'Informe uma data válida!', 'error');
        this.isBotaoDesabilitado = false;
        return;
      }
      if (this.horaAtendimento === undefined) {
        Swal.fire('', 'Informe uma hora válida!', 'error');
        this.isBotaoDesabilitado = false;
        return;
      }
      this.dataHoraAtendimento = this.dataAtendimento + ' ' + this.horaAtendimento + ':00';
      if (this.viaCobranca == null) {
        this.viaCobranca = 0;
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
          this.dataHoraAtendimento,
          this.nroAcomodacao,
          this.idAcomodacao,
          this.idStatusValidade,
          this.unidadeAtendimento,
          this.viaCobranca,
          this.periodoParcial
        )
        .subscribe({
          next: (data: any) => {
            // console.log(data.body);
            this.idConta = data.body.id;
            this.idCobranca = data.body.idCobranca;
            this.nroConta = data.body.numeroConta;
            this.isBotaoDesabilitado = false;
            // this.router.navigateByUrl(`/criar-conta?unidadeAtendimento=${this.unidadeAtendimento}&nroConta=${this.nroConta}&idUsuario=${this.idUsuario}`);
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
    }
  }

  obterPlantoesDaConta(ativo: any,dados?:any) {
    if(dados){
      this.dataSourcePlantoes = new MatTableDataSource<any>(dados);
    }else{
      this.service.getPlantoesDaConta(ativo, this.idCobranca).subscribe({
        next: (data: any) => {
          const arr1 = data.body.cobrancasCorpoClinico;
          const arr2 = data.body.servicosCobrancas;
          const arr3 = data.body.servicosCobrancasPlantao;
          this.listaPlantoesCobrados = [...arr1, ...arr2, ...arr3];
          this.listaPlantoesCobrados = this.listaPlantoesCobrados.filter((objeto) => objeto.idServico !== 48);
          this.dataSourcePlantoes = new MatTableDataSource<any>(this.listaPlantoesCobrados);
        },
      });
    }
  }

  obterServico(ativo: any, idCobranca: any, dados?:any) {
    if(dados){
      this.dataSourceServicosCobrados = new MatTableDataSource<any>(dados);
    }else{
      this.service
        .getServicoPorConta(ativo, idCobranca)
        .subscribe((data: any) => {
          const arr1 = data.body.cobrancasCorpoClinico;
          const arr2 = data.body.servicosCobrancas;
          this.listaServicosCobrados = [...arr1, ...arr2];
          this.idServico = data.body.id;
          this.dataSourceServicosCobrados = new MatTableDataSource<any>(this.listaServicosCobrados);
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
        // console.log(data.body);
        this.listaCorpoClinico = data.body;
        this.dataSourceCorpoClinico = new MatTableDataSource<any>(
          this.listaCorpoClinico
        );
        if (data.body.length != 0) {
          this.idCentroCirurgico = data.body[0].idCentroCirurgico;
        }
      });
  }

  mostraServicosInativos() {
    this.mostraOlho = !this.mostraOlho;
    if (this.mostraOlho == false) {
      this.obterPlantoesDaConta(1);
      this.obterServico(1, this.idCobranca);
    } else {
      this.obterPlantoesDaConta(0);
      this.obterServico(0, this.idCobranca);
    }
  }

  inativarConta(idConta: number) {
    Swal.fire({
      title: `Realmente deseja excluir a conta ${this.numeroConta} ? \n Essa ação é irreversível !`,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',

    }).then((result: any) => {
      if (result.isConfirmed) {

        this.service.putInativarConta(idConta).subscribe({
          next:()=>{
            Swal.fire('', `Conta ${this.numeroConta} Excluída com sucesso`, 'success');
            this.router.navigate([`lista-contas`],{
              queryParams: {
                unidadeAtendimento: this.unidadeAtendimento,
                idUsuario: this.idUsuario
              }
            });
          }
        })
      }
    });
  }

  trocaValorAtivo(servicoId: any, ativo: any) {
    if (ativo == 0) {
      this.ativo = 1;
    }
    if (ativo == 1) {
      this.ativo = 0;
    }

    console.log(this.ativo);
    this.editarAtivoServico(servicoId, this.ativo);
  }

  editarAtivoServico(idServico: any, ativo: any) {
    if (this.mostraOlho == true) {
      Swal.fire({
        title: 'Qual o motivo para desativar serviço?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
        html: '<textarea id="swal-textarea" rows="4" cols="40"></textarea>',
        preConfirm: () => {
          const textAreaValue = (<HTMLTextAreaElement>document.getElementById('swal-textarea')).value;
          return textAreaValue; // Retorna o valor inserido para usar se necessário
        }
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.service.putAtivoServicos(idServico, ativo).subscribe((data) => {
            const idServicoCobranca = data.id;
            this.service
              .postObservacaoInativaServico(result.value,idServicoCobranca)
              .subscribe({
                next:()=>{
                  Swal.fire('', 'Serviço desativado com sucesso', 'success');
                  this.obterPlantoesDaConta(0);
                  this.obterServico(0, this.idCobranca);
                }
              })
          });
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
          this.service.putAtivoServicos(idServico, ativo).subscribe(() => {
            Swal.fire('', 'Serviço ativado com sucesso', 'success');
            this.obterPlantoesDaConta(1);
            this.obterServico(1, this.idCobranca);
            this.service
              .getServicoPorConta(1, this.idCobranca)
              .subscribe((data: any) => {
                this.listaServicosCobrados = data.body;
                this.dataSourceServicosCobrados = new MatTableDataSource(this.listaServicosCobrados);
                this.idServico = data.body.id;
              });
          });
        }
      });
    }
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

  trocarValorAtivo(id: any, ativo: any) {
    if (ativo == 0) {
      ativo = 1;
    } else {
      ativo = 0;
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
          });
        }
      });
    }
  }

  gerarNotaDeDebito() {
    this.service
      .getNotaDeDebito(
        this.idConta,
        this.viaCobranca,
        this.idCobranca,
        this.unidadeAtendimento
      )
      .subscribe({
        next: (data) => {
          if (
            this.viaCobranca == 1 ||
            this.viaCobranca == 2 ||
            this.viaCobranca == 3
          ) {
            this.renderDownload(
              data.body,
              `${this.numeroConta}-${this.nomeArquivo}.docx`
            );
          } else {
            this.renderDownload(
              data.body,
              `${this.numeroConta}-${this.nomeArquivo}.zip`
            );
          }
        },
      });
  }

  obterQuantidadePlantoes() {
    this.service.getQuantidadePlantoes(0, this.idCobranca).subscribe({
      next: (data: any) => {
        this.plantoes = data.body;
      },
    });
  }

  StatusCobranca = [
    { id: 2, nome: 'Cobrança Pendente' },
    { id: 1, nome: 'Cobrança Pronto' },
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
    'dataServico',
    'editar',
    'limpar',
  ];

  listaStatusValidade = [
    { id: 1, descricao: 'Validade normal' },
    { id: 2, descricao: 'Proximo de vencer' },
    { id: 3, descricao: 'Vencido' },
  ];

  colunasPlantoes = [
    'data',
    'descricao',
    'status',
    'medico',
    'editar',
    'limpar',
  ];

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
