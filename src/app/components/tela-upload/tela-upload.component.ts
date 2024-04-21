import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DarkModeService } from '../utils/dark-mode.service';
import { Component, HostListener, Input } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListaInternacaoService } from '../lista-internacao/lista-internacao.service';

@Component({
  selector: 'app-tela-upload',
  templateUrl: './tela-upload.component.html',
  styleUrls: ['./tela-upload.component.css'],
})
export class TelaUploadComponent {
  //#region
  public usuario: any;
  public paciente: any;
  public redeDor: string[] = ['5', '6', '7']
  public totalAlta = 0;
  public listaAlta = [];
  public idUsuario: any;
  public formUpload!: FormGroup;
  public closeResult = '';
  public totalParciais = 0;
  public listaParciais = [];
  public totalInclusoes = 0;
  public listaInclusoes = [];
  public idEvolucaoRota: any;
  public listaAoCarregar: any;
  modoEscuroTelaUpload = false;
  public listaAltaComInfo: any;
  public totalNaoEncontrado = 0;
  public unidadeAtendimento: any;
  public dataSourceFiltrado: any;
  public file: File | any = null;
  public dataSourceParciais: any;
  public loading: boolean = false;
  public arquivoCarregado = false;
  public listaNaoEncontrados = [];
  public dataSourceInclusoes: any;
  public dataSourceAlta: any;
  public listaAoCarregarAlta: any;
  public listaParciaisComInfo: any;
  public idRegistroAtendimento: any;
  public listaInclusoesComInfo: any;
  public nroRegistroAtendimento: any;
  public listaInternacaoFiltrado: any;
  public listaAoCarregarParciais: any;
  public dataSourceNaoEncontrados: any;
  public dataSourceAoCarregarAlta: any;
  public dataSourceNaoLocalizados: any;
  public listaNaoEncontradosComInfo: any;
  public dataSourceAoCarregarParciais: any;
  public listaAoCarregarNaoEncontrado: any;
  public dataSourceAoCarregarNaoEncontrado: any;
  public listaDaListaInclusoes: Observable<any>[] = [];

  @Input() leito = null;
  @Input() status = null;
  @Input() atendimento = null;
  @Input() statusEdicao = null;
  @Input() contratado = 33619584;
  @Input() atendimentoEdicao = null;
  //#endregion

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private token: TokenService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private service: ListaInternacaoService,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroTelaUpload = modoEscuro;
    });

    this.formUpload = this.fb.group({
      tipoMapa: [''],
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.unidadeAtendimento = params.get('unidadeAtendimento');
      this.usuario = params.get('idUsuario');
    });

    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    // if (this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11) {
    //   Swal.fire('', 'Função desabilitada para esta unidade', 'warning').then(
    //     (result) => {
    //       this.location.back();
    //     }
    //   );
    // }
  }

  limpar() {
    this.dataSourceInclusoes = [];
    this.dataSourceParciais = [];
    this.dataSourceNaoLocalizados = [];
  }

  //Upload cti norte e sul
  onUploadCSV() {
    this.modalService.dismissAll();
    this.loading = true;
    this.limpar();
    this.service
      .postArquivoCsv(this.unidadeAtendimento, this.file)
      .subscribe((data: any) => {
        if (data.status == 401) {
          this.router.navigate(['/', 'login']);
        }
        this.listaAoCarregar = null;
        this.arquivoCarregado = true;
        this.listaInternacaoFiltrado = undefined;

        //#region Inclusões
        //Total de inclusões
        this.totalInclusoes = data.body.totalInclusoes;

        //Adiciona pacientes do arquivo para lista de inclusões
        this.listaInclusoes = data.body.internacao.inclusoes;

        const infoObservablesInclusoes = this.listaInclusoes.map((paciente) => {
          //Pega as infos do paciente
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesInclusoes).subscribe(
          (listaInclusoesComInfo: any[]) => {
            this.listaInclusoesComInfo = listaInclusoesComInfo;
            // console.log(this.listaInclusoesComInfo);
            this.dataSourceInclusoes = new MatTableDataSource(
              this.listaInclusoesComInfo
            );
            this.loading = false;
          }
        );
        //#endregion

        //#region Parcias
        this.totalParciais = data.body.totalParcial;
        this.listaParciais = data.body.internacao.parcial;
        const infoObservablesParciais = this.listaParciais.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesParciais).subscribe(
          (listaParciaisComInfo: any[]) => {
            this.listaParciaisComInfo = listaParciaisComInfo;
            // console.log(this.listaParciaisComInfo);
            this.dataSourceParciais = new MatTableDataSource(
              this.listaParciaisComInfo
            );
            this.loading = false;
          }
        );
        //#endregion

        //#region Não encontrado
        this.totalNaoEncontrado = data.body.totalNãoEncontrado;
        this.listaNaoEncontrados = data.body.internacao.naoEncontrado;
        const infoObservablesNaoEncontrado = this.listaNaoEncontrados.map(
          (paciente) => {
            return this.service.getInfoAtendimento(
              paciente['idRegistroAtendimento']
            );
          }
        );
        forkJoin(infoObservablesNaoEncontrado).subscribe(
          (listaNaoEncontradosComInfo: any[]) => {
            this.listaNaoEncontradosComInfo = listaNaoEncontradosComInfo;
            // console.log(this.listaNaoEncontradosComInfo);
            this.dataSourceNaoLocalizados = new MatTableDataSource(
              this.listaNaoEncontradosComInfo
            );
            this.loading = false;
          }
        );
        //#endregion
      });
  }

  //Upload Santa Marta
  onUploadPDF() {
    this.modalService.dismissAll();
    this.service
      .postUpload(this.unidadeAtendimento, this.file)
      .subscribe((data: any) => {
        if (data.status == 401) {
          this.router.navigate(['/', 'login']);
        }
        this.listaAoCarregar = null;
        this.arquivoCarregado = true;
        this.listaInternacaoFiltrado = undefined;

        //#region Alta
        this.totalAlta = data.body.totalAlta;
        this.listaAlta = data.body.internacao.alta;
        const infoObservablesAlta = this.listaAlta.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesAlta).subscribe((listaAltaComInfo: any[]) => {
          this.listaAltaComInfo = listaAltaComInfo;
          this.dataSourceAoCarregarAlta = new MatTableDataSource(
            this.listaAltaComInfo
          );
          this.loading = false;
        });
        //#endregion

        //#region Parciais
        this.totalParciais = data.body.totalParcial;
        this.listaParciais = data.body.internacao.parcial;
        const infoObservablesParciais = this.listaParciais.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesParciais).subscribe(
          (listaParciaisComInfo: any[]) => {
            this.listaParciaisComInfo = listaParciaisComInfo;
            this.dataSourceParciais = new MatTableDataSource(
              this.listaParciaisComInfo
            );
            this.loading = false;
          }
        );
        //#endregion
      });
  }

  //Upload Santa lucia
  onUploadCSVSantaLucia() {
    this.modalService.dismissAll();
    this.service
      .postUpload(this.unidadeAtendimento, this.file)
      .subscribe((data: any) => {
        if (data.status == 401) {
          this.router.navigate(['/', 'login']);
        }
        this.listaAoCarregar = null;
        this.arquivoCarregado = true;
        this.listaInternacaoFiltrado = undefined;

        //#region Inclusoes
        this.totalInclusoes = data.body.totalInclusoes;
        this.listaInclusoes = data.body.internacao.inclusoes;
        const infoObservablesInclusoes = this.listaInclusoes.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesInclusoes).subscribe(
          (listaInclusoesComInfo: any[]) => {
            this.listaInclusoesComInfo = listaInclusoesComInfo;
            // console.log(this.listaInclusoesComInfo);
            this.dataSourceInclusoes = new MatTableDataSource(
              this.listaInclusoesComInfo
            );
            this.loading = false;
          }
        );
        //#endregion

        //#region Parciais
        this.totalParciais = data.body.totalAlta;
        this.listaParciais = data.body.internacao.alta;
        const infoObservablesParciais = this.listaParciais.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesParciais).subscribe(
          (listaParciaisComInfo: any[]) => {
            this.listaParciaisComInfo = listaParciaisComInfo;
            // console.log(this.listaParciaisComInfo);
            this.dataSourceParciais = new MatTableDataSource(
              this.listaParciaisComInfo
            );
            this.loading = false;
          }
        );
        //#endregion
      });
  }

  onUploadPDFHome() {

    const tipoMapaSelecionado: string = this.formUpload.get('tipoMapa')?.value;
    if (tipoMapaSelecionado === '') {
      Swal.fire('', 'Selecione um tipo de mapa!', 'error');
      return;
    }
    this.modalService.dismissAll();
    this.postPDFHome(tipoMapaSelecionado);
  }

  postPDFHome(tipoMapa: string) {
    this.modalService.dismissAll();

    switch (tipoMapa) {
      case '0':
        this.service
          .postPDFCentroCirurgicoHome(this.unidadeAtendimento, this.file)
          .subscribe((data: any) => {
            if (data.status == 401) {
              this.router.navigate(['/', 'login']);
            }

            this.listaAoCarregar = null;
            this.arquivoCarregado = true;
            this.listaInternacaoFiltrado = undefined;

            //#region Inclusoes
            this.totalInclusoes = data.body.totalInclusoes;
            this.listaInclusoes = data.body.internacao.inclusoes;

            if (this.listaInclusoes !== null) {
              const infoObservablesInclusoes = this.listaInclusoes.map(
                (paciente) => {
                  return this.service.getInfoAtendimento(
                    paciente['idRegistroAtendimento']
                  );
                }
              );
              forkJoin(infoObservablesInclusoes).subscribe(
                (listaInclusoesComInfo: any[]) => {
                  this.listaInclusoesComInfo = listaInclusoesComInfo;
                  // console.log(this.listaInclusoesComInfo);
                  this.dataSourceInclusoes = new MatTableDataSource(
                    this.listaInclusoesComInfo
                  );
                  this.loading = false;
                }
              );
            }
            //#endregion

            //#region Parciais
            this.totalParciais = data.body.totalParcial;
            this.listaParciais = data.body.internacao.parcial;
            if (this.listaParciais !== null) {
              const infoObservablesParciais = this.listaParciais.map(
                (paciente) => {
                  return this.service.getInfoAtendimento(
                    paciente['idRegistroAtendimento']
                  );
                }
              );
              forkJoin(infoObservablesParciais).subscribe(
                (listaParciaisComInfo: any[]) => {
                  this.listaAltaComInfo = listaParciaisComInfo;
                  // console.log(this.listaParciaisComInfo);
                  this.dataSourceParciais = new MatTableDataSource(
                    this.listaAltaComInfo
                  );
                  this.loading = false;
                }
              );
            }
            //#endregion

            //#region Alta
            this.totalAlta = data.body.totalAlta;
            this.listaAlta = data.body.internacao.alta;
            if (this.listaAlta !== null) {
              const infoObservablesAlta = this.listaAlta.map((paciente) => {
                return this.service.getInfoAtendimento(
                  paciente['idRegistroAtendimento']
                );
              });
              forkJoin(infoObservablesAlta).subscribe(
                (listaAltaComInfo: any[]) => {
                  this.listaParciaisComInfo = listaAltaComInfo;
                  // console.log(this.listaParciaisComInfo);
                  this.dataSourceAoCarregarAlta = new MatTableDataSource(
                    this.listaAltaComInfo
                  );
                  this.loading = false;
                }
              );
            }
            //#endregion
          });
        break;

      case '1':
        this.service
          .postPDFInternacaoHome(this.unidadeAtendimento, this.file)
          .subscribe((data: any) => {
            if (data.status == 401) {
              this.router.navigate(['/', 'login']);
            }

            this.listaAoCarregar = null;
            this.arquivoCarregado = true;
            this.listaInternacaoFiltrado = undefined;

            //#region Inclusoes
            this.totalInclusoes = data.body.totalInclusoes;
            this.listaInclusoes = data.body.internacao.inclusoes;

            if (this.listaInclusoes !== null) {
              const infoObservablesInclusoes = this.listaInclusoes.map(
                (paciente) => {
                  return this.service.getInfoAtendimento(
                    paciente['idRegistroAtendimento']
                  );
                }
              );
              forkJoin(infoObservablesInclusoes).subscribe(
                (listaInclusoesComInfo: any[]) => {
                  this.listaInclusoesComInfo = listaInclusoesComInfo;
                  // console.log(this.listaInclusoesComInfo);
                  this.dataSourceInclusoes = new MatTableDataSource(
                    this.listaInclusoesComInfo
                  );
                  this.loading = false;
                }
              );
            }
            //#endregion

            //#region Parciais
            this.totalParciais = data.body.totalParcial;
            this.listaParciais = data.body.internacao.parcial;
            if (this.listaParciais !== null) {
              const infoObservablesParciais = this.listaParciais.map(
                (paciente) => {
                  return this.service.getInfoAtendimento(
                    paciente['idRegistroAtendimento']
                  );
                }
              );
              forkJoin(infoObservablesParciais).subscribe(
                (listaParciaisComInfo: any[]) => {
                  this.listaParciaisComInfo = listaParciaisComInfo;
                  // console.log(this.listaParciaisComInfo);
                  this.dataSourceParciais = new MatTableDataSource(
                    this.listaParciaisComInfo
                  );
                  this.loading = false;
                }
              );
            }
            //#endregion

            //#region Alta
            this.totalAlta = data.body.totalAlta;
            this.listaAlta = data.body.internacao.alta;
            if (this.listaAlta !== null) {
              const infoObservablesAlta = this.listaAlta.map((paciente) => {
                return this.service.getInfoAtendimento(
                  paciente['idRegistroAtendimento']
                );
              });
              forkJoin(infoObservablesAlta).subscribe(
                (listaAltaComInfo: any[]) => {
                  this.listaAltaComInfo = listaAltaComInfo;
                  // console.log(this.listaParciaisComInfo);
                  this.dataSourceAoCarregarAlta = new MatTableDataSource(
                    this.listaAltaComInfo
                  );
                  this.loading = false;
                }
              );
            }
            //#endregion
          });
        break;
    }
  }

  onUploadCSVRedeDor(): void {
    this.modalService.dismissAll();
    this.loading = true;
    this.limpar();
    this.service
      .postCSVRedeDor(this.unidadeAtendimento, this.file)
      .subscribe((data: any) => {
        console.log(data)
        if (data.status == 401) {
          this.router.navigate(['/', 'login']);
        }
        this.listaAoCarregar = null;
        this.arquivoCarregado = true;
        this.listaInternacaoFiltrado = undefined;

        this.totalInclusoes = data.body.totalInclusoes;
        this.listaInclusoes = data.body.internacao.inclusoes;
        const infoObservablesInclusoes = this.listaInclusoes.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesInclusoes).subscribe(
          (listaInclusoesComInfo: any[]) => {
            this.listaInclusoesComInfo = listaInclusoesComInfo;
            // console.log(this.listaInclusoesComInfo);
            this.dataSourceInclusoes = new MatTableDataSource(
              this.listaInclusoesComInfo
            );
            this.loading = false;
          }
        );

        this.totalParciais = data.body.totalParcial;
        this.listaParciais = data.body.internacao.parcial;
        const infoObservablesParciais = this.listaParciais.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesParciais).subscribe(
          (listaParciaisComInfo: any[]) => {
            this.listaParciaisComInfo = listaParciaisComInfo;
            // console.log(this.listaParciaisComInfo);
            this.dataSourceParciais = new MatTableDataSource(
              this.listaParciaisComInfo
            );
            this.loading = false;
          }
        );
      });
  }

  onUploadCSVGama() {
    this.modalService.dismissAll();
    this.loading = true;
    this.limpar();
    this.service
      .postUpload(this.unidadeAtendimento, this.file)
      .subscribe((data: any) => {
        if (data.status == 401) {
          this.router.navigate(['/', 'login']);
        }
        this.listaAoCarregar = null;
        this.arquivoCarregado = true;
        this.listaInternacaoFiltrado = undefined;

        console.log(data.body);
        this.totalAlta = data.body.totalAlta;
        this.listaAlta = data.body.internacao.alta;
        const infoObservablesAlta = this.listaAlta.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesAlta).subscribe((listaAltaComInfo: any[]) => {
          this.listaAltaComInfo = listaAltaComInfo;
          this.dataSourceAoCarregarAlta = new MatTableDataSource(
            this.listaAltaComInfo
          );
          this.loading = false;
        });

        this.totalInclusoes = data.body.totalInclusoes;
        this.listaInclusoes = data.body.internacao.inclusoes;
        const infoObservablesInclusoes = this.listaInclusoes.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesInclusoes).subscribe(
          (listaInclusoesComInfo: any[]) => {
            this.listaInclusoesComInfo = listaInclusoesComInfo;
            // console.log(this.listaInclusoesComInfo);
            this.dataSourceInclusoes = new MatTableDataSource(
              this.listaInclusoesComInfo
            );
            this.loading = false;
          }
        );

        this.totalParciais = data.body.totalParcial;
        this.listaParciais = data.body.internacao.parcial;
        const infoObservablesParciais = this.listaParciais.map((paciente) => {
          return this.service.getInfoAtendimento(
            paciente['idRegistroAtendimento']
          );
        });
        forkJoin(infoObservablesParciais).subscribe(
          (listaParciaisComInfo: any[]) => {
            this.listaParciaisComInfo = listaParciaisComInfo;
            // console.log(this.listaParciaisComInfo);
            this.dataSourceParciais = new MatTableDataSource(
              this.listaParciaisComInfo
            );
            this.loading = false;
          }
        );

        this.totalNaoEncontrado = data.body.totalNãoEncontrado;
        this.listaNaoEncontrados = data.body.internacao.naoEncontrado;
        const infoObservablesNaoEncontrado = this.listaNaoEncontrados.map(
          (paciente) => {
            return this.service.getInfoAtendimento(
              paciente['idRegistroAtendimento']
            );
          }
        );
        forkJoin(infoObservablesNaoEncontrado).subscribe(
          (listaNaoEncontradosComInfo: any[]) => {
            this.listaNaoEncontradosComInfo = listaNaoEncontradosComInfo;
            // console.log(this.listaNaoEncontradosComInfo);
            this.dataSourceNaoLocalizados = new MatTableDataSource(
              this.listaNaoEncontradosComInfo
            );
            this.loading = false;
          }
        );
      });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  private getDismissReason(reason: any): string {
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

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code == 'Escape') this.voltar();
  }

  colunasAoCarregar = [
    'nroRegistroAtendimento',
    'paciente',
    'dataInicial',
    'abrirContas',
  ];

  Status = [
    { id: 1, nome: 'Internados' },
    { id: 2, nome: 'Alta' },
    { id: 3, nome: 'Não Localizados' },
  ];

  Contratado = [{ id: 33619584, nome: 'CTI' }];

  colunasTabelaUpload = ['atendimento', 'nomePaciente', 'Editar'];
}
