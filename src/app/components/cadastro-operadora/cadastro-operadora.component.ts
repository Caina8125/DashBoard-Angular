import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DarkModeService } from './../utils/dark-mode.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CadastroOperadoraService } from './cadastro-operadora.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Tabela {
  idUnidadeOperadora: number;
  idTabela: number;
  ativo: number;
  id: number;
}

@Component({
  selector: 'app-cadastro-operadora',
  templateUrl: './cadastro-operadora.component.html',
  styleUrls: ['./cadastro-operadora.component.css'],
})
export class CadastroOperadoraComponent implements OnInit {
  //#region variaveis
  operadoras: any;
  usuario!: string;
  closeResult = '';
  editTabelas: any;
  listaTabelas: any;
  tabelasSelecionadas: any;
  idUnidadeOperadora!: number;
  unidadeAtendimento!: number;
  listaUnidadeOperadoras: any;
  dataSourceUnidadeOperadoras: any;
  modoEscuroCadastroOperadora = false;

  @Input() editId = null;
  @Input() apelido = null;
  @Input() editApelido = null;
  @Input() viaCobranca = null;
  @Input() idOperadora = null;
  @Input() codigoExterno = null;
  @Input() codigoInterno = null;
  @Input() editCodigoExterno = null;
  @Input() editCodigoInterno = null;
  @Input() editIdUnidadeOperadora = null;
  //#endregion

  constructor(
    private router: Router,
    private location: Location,
    private token: TokenService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private darkModeService: DarkModeService,
    private service: CadastroOperadoraService
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroCadastroOperadora = modoEscuro;
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const unidadeAtendimento = params.get('unidadeAtendimento') || '';
      this.unidadeAtendimento = parseInt(unidadeAtendimento);
      this.usuario = params.get('idUsuario')!;
    });

    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    this.service.getOperadoras().subscribe((data: any) => {
      // console.log(data.body);
      if (data.status == 401) {
        this.router.navigate(['/', 'login']);
      }
      this.operadoras = data.body;
    });

    this.obterUnidaderOperadoras();
  }

  //Edita unidade operadora
  editarOperadora() {
    if (this.viaCobranca == undefined) this.viaCobranca = null;
    this.service
      .putUnidadeOperadora(
        this.editId,
        this.unidadeAtendimento,
        this.editIdUnidadeOperadora,
        this.editCodigoExterno,
        this.editCodigoInterno,
        this.editApelido,
        this.viaCobranca
      )
      .subscribe({
        next: () => {
          Swal.fire('', 'Operadora editada com sucesso', 'success');
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.log(err);
          Swal.fire('', 'Não foi possível editar essa operadora', 'error');
        },
        complete: () => {
          this.obterUnidaderOperadoras();
        },
      });
  }

  //Abre modal
  open(
    content: any,
    id?: any,
    idUnidadeOperadora?: any,
    codigoExterno?: any,
    codigoInterno?: any,
    apelido?: any,
    viaCobranca?: any
  ) {
    if (id) {
      this.editId = id;
      this.editIdUnidadeOperadora = idUnidadeOperadora;
      this.editCodigoExterno = codigoExterno;
      this.editCodigoInterno = codigoInterno;
      this.editApelido = apelido;
      this.viaCobranca = viaCobranca;
      this.service
        .getTabelaPorOperadora(this.editId)
        .subscribe({
          next: (data: any) => {
            this.tabelasSelecionadas = data.body;
          }
        });
    }

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

  isTabelaSelecionada(idTabela: number): boolean {
    const tabelaSelecionada = this.tabelasSelecionadas.find((tabela: Tabela) => tabela.idTabela === idTabela);
    return tabelaSelecionada ? tabelaSelecionada.ativo === 1 : false;
  }

  toggleAtivo(idTabela: number): void {
    const tabelaSelecionada = this.tabelasSelecionadas.find((tabela: Tabela) => tabela.idTabela === idTabela);

    if (tabelaSelecionada) {
      tabelaSelecionada.ativo = tabelaSelecionada.ativo === 1 ? 0 : 1;
    }
  }

  editarTabelaOperadora() {
    this.tabelasSelecionadas.forEach((tabela:any) => {
      this.service
        .putTabelaOperadora(tabela.id,tabela.idUnidadeOperadora, tabela.idTabela, tabela.ativo)
        .subscribe({
          next: () => {
            Swal.fire('', 'Unidade Operadora salva com sucesso', 'success');
            this.obterUnidaderOperadoras();
          },
          error: (data:any) => {
            if (data.error.errors.Mensagens != null) {
              Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
            } else {
              Swal.fire(
                '',
                'Não foi possivel salvar a unidade operadora',
                'error'
              );
            }
          },
          complete: () => {
            this.modalService.dismissAll();
          }
        })
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  //Cria unidade operadora
  criarUnidadeOperadora(nomeModal: any) {
    this.service
      .postOperadora(
        this.unidadeAtendimento,
        this.idOperadora,
        this.codigoExterno,
        this.codigoInterno,
        this.apelido,
        this.viaCobranca
      )
      .subscribe({
        next: (data: any) => {
          this.idUnidadeOperadora = data.body.id;
          // if (this.unidadeAtendimento != 8 && this.unidadeAtendimento != 11){
            Swal.fire('', 'Unidade Operadora salva com sucesso', 'success');
            this.obterUnidaderOperadoras();
          // }
        },
        error: (data: any) => {
          if (data.error.errors.Mensagens != null) {
            Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
          } else {
            Swal.fire(
              '',
              'Não foi possivel salvar a unidade operadora',
              'error'
            );
          }
        },
        complete: () => {
          // if (this.unidadeAtendimento == 8 || this.unidadeAtendimento == 11){
          //   this.service.getTabelas().subscribe({
          //     next: (data) => {
          //       this.listaTabelas = data.body;
          //     },
          //   });
          //   this.open(nomeModal);
          // }
        },
      });
  }

  adicionarTabelaOperadora() {
    this.listaTabelas.forEach((tabela:any) => {
      this.service
        .postTabelaOperadora(this.idUnidadeOperadora, tabela.id)
        .subscribe({
          next: () => {
            Swal.fire('', 'Tabelas salvas com sucesso!', 'success');
            this.obterUnidaderOperadoras();
          },
          error: (data: any) => {
            if (data.error.errors.Mensagens != null) {
              Swal.fire('', `${data.error.errors.Mensagens}`, 'error');
            } else {
              Swal.fire(
                '',
                'Não foi possivel salvar a tabela na unidade operadora!',
                'error'
              );
            }
          },
          complete: () => {
            this.modalService.dismissAll();
          }
        })

    })
  }

  //Obtem unidade Operadora e bota na tabela
  obterUnidaderOperadoras() {
    this.service
      .getUnidadeOperadoras(this.unidadeAtendimento)
      .subscribe((data: any) => {
        // console.log(data.body);
        this.listaUnidadeOperadoras = data.body;
        this.dataSourceUnidadeOperadoras = new MatTableDataSource(
          this.listaUnidadeOperadoras
        );
      });
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.voltar();
  }

  unidadeOperadoras = ['apelido', 'nome', 'codigoInterno', 'via', 'editar'];

  viaCobrancas = [
    { name: 'AMHP', id: 1 },
    { name: 'HOSPITAL', id: 2 },
    { name: 'AMHP DIRETO', id: 3 },
    { name: 'AMGS', id: 4 },
    { name: 'PACOTE', id: 5 },
  ];

  tabelas = [
    { name: 'TUSS', idTabela: 1 },
    { name: 'AMB', idTabela: 2 },
    { name: 'PRÓPRIA', idTabela: 3 },
  ];
}
