import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Location, DatePipe } from '@angular/common';
import { InternacaoService } from './internacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from '../utils/dark-mode.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, HostListener, Input } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-internacao',
  templateUrl: './internacao.component.html',
  styleUrls: ['./internacao.component.css'],
})
export class InternacaoComponent {
  //#region variaveis
  nroConta: any;
  Operadora: any;
  idUsuario: any;
  Operadoras: any;
  operadoras: any;
  nroRegistro: any;
  closeResult = '';
  listaContas: any;
  hoje = new Date();
  idInternacao: any;
  idEvolucaoRota: any;
  dataSourceContas: any;
  unidadeAtendimento: any;
  dataFinalFormatada: any;
  horaFinalFormatada: any;
  @Input() idEvolucao:any;
  @Input() apelido = null;
  @Input() horaFinal = '';
  @Input() dataFinal = '';
  @Input() paciente = null;
  @Input() registro = null;
  statusInternacao!: number;
  horaInicialFormatada: any;
  dataCriacaoFormatada: any;
  dataInicialFormatada: any;
  @Input() horaInicial: any;
  @Input() dataInicial = '';
  @Input() acomodacao = null;
  @Input() observacao = null;
  @Input() viaCobranca = null;
  @Input() idOperadora = null;
  @Input() idTipoEnvio = null;
  @Input() idAcomodacao = null;
  @Input() nroAcomodacao = null;
  @Input() codigoInterno = null;
  @Input() codigoExterno = null;
  public file: File | any = null;
  @Input() statusValidade = null;
  @Input() idNovaOperadora = null;
  modoEscuroCriarInternacao = false
  @Input() idUnidadeOperadora = null;
  isBotaoDesabilitado: boolean = false;
  @Input() nroRegistroAtendimento = null;
  hora = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  @Input() dataCriacao = this.hoje.toLocaleDateString();
  data = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];
  //#endregion

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private location: Location,
    private token: TokenService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private service: InternacaoService,
    private darkModeService:DarkModeService,
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroCriarInternacao = modoEscuro;
    })
  }

  ngOnInit() {
    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    this.route.queryParamMap.subscribe((params) => {
      this.idUsuario = params.get('idUsuario');
      this.nroRegistro = params.get('nroRegistro');
      this.idEvolucaoRota = params.get('idEvolucao');
      this.unidadeAtendimento = params.get('unidadeAtendimento');
      if(this.idInternacao == undefined){
        this.idInternacao = params.get('idInternacao');
      }
      if(this.idEvolucaoRota == this.idEvolucao || this.idEvolucao == undefined){
        this.idEvolucao = this.idEvolucaoRota;
      }
    });

    this.service
      .getUnidadeOperadora(this.unidadeAtendimento)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.Operadora = data.body;
      });

    if(this.unidadeAtendimento == 4 || this.unidadeAtendimento == 2){
      this.idEvolucao = 1;
    }

    this.service.getOperadoras().subscribe((data: any) => {
      this.operadoras = data.body;
    });

    if (this.nroRegistro != null) {
      this.service
        .getInternacao(this.nroRegistro,this.idEvolucao,this.unidadeAtendimento)
        .subscribe((data: any) => {
          this.idInternacao = data.body.id;
          this.dataFinal = data.body.dataFinal;
          this.horaFinal = data.body.horaFinal;
          this.idEvolucao = data.body.idEvolucao;
          this.dataInicial = data.body.dataInicial;
          this.horaInicial = data.body.horaInicial;
          this.statusInternacao = data.body.idStatusInternacao || 1;

          if ((this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11 || this.unidadeAtendimento == 4 || this.unidadeAtendimento == 2) && data.body.acomodacaoObject) {
            this.nroAcomodacao = data.body.nroAcomodacao;
            this.acomodacao = data.body.acomodacaoObject.id;
          }

          this.dataCriacaoFormatada = data.body.dataCriacao;
          this.paciente = data.body.registroAtendimentoObject.paciente;
          this.idOperadora = data.body.unidadeOperadoraObject.id;
          this.valorIdOperadora();
          this.nroRegistroAtendimento = data.body.registroAtendimentoObject.nroRegistroAtendimento;

          this.dataCriacaoFormatada = this.datePipe.transform(this.dataCriacaoFormatada,'dd/MM/yyyy');
          this.dataCriacao = this.dataCriacaoFormatada;

          this.dataInicialFormatada = this.datePipe.transform(this.dataInicial,'dd/MM/yyyy');
          this.dataInicial = this.dataInicialFormatada;

          this.dataFinalFormatada = this.datePipe.transform(this.dataFinal,'dd/MM/yyyy');
          this.dataFinal = this.dataFinalFormatada;

          this.horaInicialFormatada = this.datePipe.transform(this.horaInicial,'HH:mm');
          this.horaInicial = this.horaInicialFormatada;

          this.horaFinalFormatada = this.datePipe.transform(this.horaFinal,'HH:mm');
          this.horaFinal = this.horaFinalFormatada;

          this.service.getContas(this.idInternacao).subscribe((data: any) => {
            // console.log(data.body);
            this.listaContas = data.body;
            this.dataSourceContas = new MatTableDataSource<any>(
              this.listaContas
            );
          });
        });
    }

    if (this.idInternacao != null) {
      this.service
        .getInternacaoPorId(this.idInternacao)
        .subscribe((data: any) => {
          console.log(data.body);
          this.dataFinal = data.body.dataFinal;
          this.horaFinal = data.body.horaFinal;
          this.dataInicial = data.body.dataInicial;
          this.horaInicial = data.body.horaInicial;
          this.idOperadora = data.body.idUnidadeOperadora;
          this.dataCriacaoFormatada = data.body.dataCriacao;
          this.statusInternacao = data.body.idStatusInternacao || 1;
          this.paciente = data.body.registroAtendimentoObject.paciente;
          this.nroRegistroAtendimento = data.body.registroAtendimentoObject.nroRegistroAtendimento;

          this.dataCriacaoFormatada = this.datePipe.transform(
            this.dataCriacaoFormatada,
            'dd/MM/yyyy'
          );
          this.dataCriacao = this.dataCriacaoFormatada;

          this.dataInicialFormatada = this.datePipe.transform(
            this.dataInicial,
            'dd/MM/yyyy'
          );
          this.dataInicial = this.dataInicialFormatada;

          this.dataFinalFormatada = this.datePipe.transform(
            this.dataFinal,
            'dd/MM/yyyy'
          );
          this.dataFinal = this.dataFinalFormatada;

          this.horaInicialFormatada = this.datePipe.transform(
            this.horaInicial,
            'HH:mm'
          );
          this.horaInicial = this.horaInicialFormatada;

          this.horaFinalFormatada = this.datePipe.transform(
            this.horaFinal,
            'HH:mm'
          );
          this.horaFinal = this.horaFinalFormatada;

          this.service.getContas(this.idInternacao).subscribe((data: any) => {
            this.listaContas = data.body;
            this.dataSourceContas = new MatTableDataSource<any>(
              this.listaContas
            );
          });
        });
    }
  }

  verificaOperadora() {
    if (this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11) {
      this.service
        .getUnidadeOperadoraPorId(this.idOperadora)
        .subscribe((data: any) => {
          // console.log(data.body);
          if (data.body.idLocalConta != null) {
            this.router.navigate(['/criar-conta'], {
              queryParams: {
                idUsuario:this.idUsuario,
                idInternacao: this.idInternacao,
                unidadeAtendimento: this.unidadeAtendimento,
              },
            });
          } else {
            Swal.fire('', 'Operadora sem via de cobrança', 'error');
          }
        });
    } else {
      // console.log(this.idInternacao);
      this.router.navigate(['/criar-conta'], {
        queryParams: {
          unidadeAtendimento: this.unidadeAtendimento,
          idInternacao: this.idInternacao,
          idUsuario:this.idUsuario
        },
      });
    }
  }

  gerarAdimissao() {
    this.service.getFichaAdimissao(this.idInternacao).subscribe((data: any) => {
      this.renderDownload(data.body, 'relatorio.xlsx');
    });
  }

  renderDownload(data: any, fileName: string) {
    let type = data.type;
    const downloadedFile = new Blob([data as BlobPart], { type: type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  anexarDocumentos() {
    this.service
      .postDoc(this.unidadeAtendimento, this.idInternacao, this.file)
      .subscribe((data: any) => {
        // console.log(data.body);
      });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  limpar() {
    this.idEvolucao = 3;
    this.paciente = null;
    this.dataFinal = '';
    this.horaFinal = '';
    this.dataInicial = '';
    this.horaInicial = '';
    this.idOperadora = null;
    this.idTipoEnvio = null;
    this.nroRegistroAtendimento = null;
    this.dataCriacao = this.hoje.toLocaleDateString();
  }

  localizarInternacao() {
    this.service
      .getInternacao(
        this.nroRegistroAtendimento,
        this.idEvolucao,
        this.unidadeAtendimento
      )
      .subscribe((data: any) => {
        //Validação para internação inexistente
        if (data.body == null) {
          this.service
            .getRegistro(this.nroRegistroAtendimento, this.unidadeAtendimento)
            .subscribe((data: any) => {
              //Validação para registro inexistente
              if (data.body != null) {
                Swal.fire({
                  title: 'Não existe uma internação com esse atendimento.',
                });
                this.paciente = data.body.paciente;
                this.dataInicial = '';
                this.dataFinal = '';
                this.horaInicial = '';
                this.horaFinal = '';
                this.dataCriacao = this.hoje.toLocaleDateString();
              } else {
                Swal.fire({
                  title: 'Esse atendimento não existe, deseja criar?',
                  showDenyButton: true,
                  confirmButtonText: 'Sim',
                  denyButtonText: `Não`,
                }).then((result) => {
                  if (result.isDenied) {
                    this.paciente = null;
                    this.dataInicial = '';
                    this.dataFinal = '';
                    this.horaInicial = '';
                    this.horaFinal = '';
                    this.nroRegistroAtendimento = null;
                    this.dataCriacao = this.hoje.toLocaleDateString();
                  }
                });
              }
            });
        } else {
          this.dataInicial = data.body.dataInicial;
          this.dataFinal = data.body.dataFinal;
          this.horaInicial = data.body.horaInicial;
          this.horaFinal = data.body.horaFinal;
          this.paciente = data.body.registroAtendimentoObject.paciente;
          this.idInternacao = data.body.id;
          this.idOperadora = data.body.unidadeOperadoraObject.id;
          this.idTipoEnvio =
            data.body.unidadeOperadoraObject.operadoraObject.tipoEnvioObject.id;

          this.dataInicialFormatada = this.datePipe.transform(
            this.dataInicial,
            'dd/MM/yyyy'
          );
          this.dataInicial = this.dataInicialFormatada;

          this.dataFinalFormatada = this.datePipe.transform(
            this.dataFinal,
            'dd/MM/yyyy'
          );
          this.dataFinal = this.dataFinalFormatada;

          this.horaInicialFormatada = this.datePipe.transform(
            this.horaInicial,
            'HH:mm'
          );
          this.horaInicial = this.horaInicialFormatada;

          this.horaFinalFormatada = this.datePipe.transform(
            this.horaFinal,
            'HH:mm'
          );
          this.horaFinal = this.horaFinalFormatada;

          this.service.getContas(this.idInternacao).subscribe((data: any) => {
            this.listaContas = data.body;
            this.dataSourceContas = new MatTableDataSource<any>(
              this.listaContas
            );
            // console.log(data.body);
          });
        }
      });
  }

  valorIdOperadora() {
    this.service.getOperadoraPorId(this.idOperadora).subscribe((data: any) => {
      // console.log(data.body);
      this.idUnidadeOperadora = data.body.idOperadora;
    });
  }

  criarInternacao() {
    this.isBotaoDesabilitado = true;
    const temErro =
      (this.idEvolucao == 1 && !this.dataFinal && !this.horaFinal) ||
      (this.idEvolucao == 2 && !this.dataFinal && !this.horaFinal) ||
      this.idOperadora == 1 ||
      !this.horaInicial;

    if (temErro) {
      Swal.fire('', 'Não foi possivel salvar internação', 'error');
    } else {
      if(this.idEvolucao != 3){
        if (this.horaFinal != null && this.horaFinal != "") {
          this.horaFinal = this.dataFinal + ' ' + this.horaFinal + ':00';
        }
        if (this.dataFinal != null && this.dataFinal != "") {
          this.dataFinal = this.dataFinal + ' 00:00:00';
        }
      }

      this.horaInicial = this.dataInicial + ' ' + this.horaInicial + ':00';
      this.dataInicial = this.dataInicial + ' 00:00:00';
      this.service
        .postInternacao(
          this.nroRegistroAtendimento,
          this.paciente,
          this.dataInicial,
          this.horaInicial,
          this.dataFinal,
          this.horaFinal,
          this.idEvolucao,
          this.unidadeAtendimento,
          this.idUnidadeOperadora,
          this.idOperadora,
          this.statusInternacao,
          this.acomodacao,
          this.nroAcomodacao
        )
        .subscribe({
          next: (data: any) => {
            setTimeout(() => {
              this.isBotaoDesabilitado = false;
            }, 3000);
            this.idInternacao = data.body.id;
            this.idEvolucao = data.body.idEvolucao;
            this.idEvolucaoRota = null;
            Swal.fire('', 'Internação salva com sucesso', 'success');
          },
          error(data: any) {
            if (data.error.errors.Mensagens != null) {
              Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
            } else {
              Swal.fire('', 'Não foi possivel salvar internação', 'error');
            }
          },
          complete: () => {
            this.ngOnInit();
          },
        });
    }
  }

  criaOperadora() {
    this.service
      .postOperadora(
        this.unidadeAtendimento,
        this.idNovaOperadora,
        this.codigoExterno,
        this.codigoInterno,
        this.apelido,
        this.viaCobranca
      )
      .subscribe((data: any) => {
        this.modalService.dismissAll();
        this.ngOnInit();
      });
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.voltar();
  }

  LocalChecklist = [
    { id: 1, nome: 'AMHP' },
    { id: 2, nome: 'Hospital' },
  ];

  colunasContas = [
    'atendimento',
    'nroConta',
    'paciente',
    'convenio',
    'data',
    'statusConta',
    'statusValidade',
    'editar',
  ];

  Evolucao = [
    { id: 1, nome: 'ALTA' },
    { id: 2, nome: 'ÓBITO' },
    { id: 3, nome: 'PARCIAL' },
    { id: 4, nome: 'HOME CARE' },
    { id: 5, nome: 'NÃO ENCONTRADO' },
    { id: 8, nome: 'APARTAMENTO' },
    { id: 9, nome: 'MELHORADO' },
    { id: 10, nome: 'TRANSFERIDO' },
    { id: 11, nome: 'A PEDIDO' },
    { id: 12, nome: 'NI UTI' },
  ];

  StatusConta = [
    { id: 1, nome: 'Pendente' },
    { id: 2, nome: 'Pronto' },
  ];

  Envio = [
    { id: 1, nome: 'Digital' },
    { id: 2, nome: 'Meio Físico' },
  ];

  Motivo = [
    { id: 1, nome: 'Autorização' },
    { id: 2, nome: 'Prorrogação' },
    { id: 3, nome: 'Doc. Inicial' },
    { id: 4, nome: 'Boletim Anestésico' },
    { id: 5, nome: 'Controle Fisio' },
    { id: 6, nome: 'Pedido Médico' },
    { id: 7, nome: 'Prescrição' },
    { id: 8, nome: 'Laudo' },
    { id: 9, nome: 'Parecer' },
    { id: 10, nome: 'Assinatura Paciente' },
    { id: 11, nome: 'Consumo' },
  ];

  Acomodacao = [
    { id: 1, nome: 'Apartamento' },
    { id: 2, nome: 'Enfermaria' },
    { id: 3, nome: 'Centro Cirurgico' },
    { id: 4, nome: 'UTI Adulto' },
    { id: 5, nome: 'UTI Neonatal' },
    { id: 6, nome: 'UTI Pediatrica' },
  ];

  viaCobrancas = [
    { name: 'AMHP', id: 1 },
    { name: 'HOSPITAL', id: 2 },
    { name: 'AMHP DIRETO', id: 3 },
    { name: 'AMGS', id: 4 },
  ];
}
