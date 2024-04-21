import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstatisticasService } from './estatisticas.service';
import { MatTableDataSource } from '@angular/material/table';
import { DarkModeService } from '../utils/dark-mode.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css'],
})
export class EstatisticasComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private token: TokenService,
    private route: ActivatedRoute,
    private service: EstatisticasService,
    private darkModeService: DarkModeService,
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroEstatisticas = modoEscuro;
    })
  }

  //#region variaveis
  i: any;
  chart: any;
  usuario: any;
  evolucao: any;
  idUsuario: any;
  totalContas: any;
  statusDaConta: any;
  totalInternacoes: any;
  nomeUsuario: any = [];
  unidadeAtendimento:any;
  listaColaboradores: any;
  listaLocalChecklist: any;
  listaUnidadeOperadoras: any;
  listaEstatisticasContas: any;
  dataSourceLocalChecklist: any;
  modoEscuroEstatisticas = false;
  listaEstatisticaContaStatus: any;
  listaEstatisticaContaUsuario: any;
  listaEstatisticasInternacoes: any;
  dataSourceEstatisticasContas: any;
  listaEstatisticaContaOperadora: any;
  dataSourceEstatisticasInternacao: any;
  dataSourceEstatisticaContaStatus: any;
  dataSourceEstatisticaContaUsuario: any;
  listaEstatisticasInternacaoUsuario: any;
  dataSourceEstatisticaContaOperadora: any;
  listaEstatisticasInternacaoEvolucao: any;
  listaEstatisticasInternacaoOperadora: any;
  dataSourceEstatisticaInternacaoUsuario: any;
  dataSourceEstatisticaInternacaoEvolucao: any;
  dataSourceEstatisticaInternacaoOperadora: any;
  //#endregion

  estatisticasForm = new FormGroup({
    opcoes: new FormControl(),
    operadora: new FormControl(),
    usuario: new FormControl(),
    evolucao: new FormControl(),
    statusConta: new FormControl(),
  });

  ngOnInit() {
    if (!this.token.possuiToken())
      this.router.navigate(['/', 'login']);

    this.estatisticasForm.get('opcoes')?.setValue('1');

    this.route.queryParamMap.subscribe((params) => {
      this.unidadeAtendimento = params.get('unidadeAtendimento');
      this.idUsuario = params.get('idUsuario');
    });

    this.service
      .getColaboradores()
      .subscribe((data: any) => {
        if(data.status == 401){
          this.router.navigate(['/', 'login']);
        }
        this.listaColaboradores = data.body
      });

    this.service
      .getOperadoras()
      .subscribe((data: any) => {
        this.listaUnidadeOperadoras = data.body
      });

    // this.createChart();
    // this.retornaEstatisticas();
  }

  // createChart(){
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart
  //     data: {// values on X-Axis
  //       labels: ['', '', '','',''],
	//        datasets: [
  //         {
  //           label: "Não Encontrado",
  //           data: ['467'],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "Parcial",
  //           data: ['542'],
  //           backgroundColor: 'limegreen'
  //         }
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }
  //   });
  // }

  limparFiltro() {
    // this.estatisticasForm.setValue({
    //   opcoes: null,
    //   operadora: null,
    //   usuario: null,
    //   evolucao: null,
    //   statusConta: null,
    // });
    // this.estatisticasForm.get('opcoes')?.setValue('1');
    this.dataSourceEstatisticaInternacaoEvolucao = null;
    this.dataSourceEstatisticaInternacaoOperadora = null;
    this.dataSourceEstatisticaInternacaoUsuario = null;
    this.dataSourceEstatisticaContaUsuario = null;
    this.dataSourceEstatisticaContaOperadora = null;
    this.dataSourceEstatisticaContaStatus = null;
    this.totalInternacoes = null;
    this.totalContas = null;
  }

  retornaEstatisticas() {
    this.limparFiltro();
    if (this.estatisticasForm.get('opcoes')?.value == 1)
    {
      this.service
        .getQuantidadeInternaçao(
          this.unidadeAtendimento,
          this.estatisticasForm.get('operadora')?.value,
          this.estatisticasForm.get('usuario')?.value,
          this.estatisticasForm.get('evolucao')?.value
        )
        .subscribe((data: any) => {
          console.log(data.body);
          this.listaEstatisticasInternacoes = data.body
          this.listaEstatisticasInternacaoEvolucao = data.body.produtividadePorEvolucao;
          this.dataSourceEstatisticaInternacaoEvolucao = new MatTableDataSource(this.listaEstatisticasInternacaoEvolucao);

          this.listaEstatisticasInternacaoOperadora = data.body.produtividadePorUnidadeOperadora;
          this.dataSourceEstatisticaInternacaoOperadora = new MatTableDataSource(this.listaEstatisticasInternacaoOperadora);

          this.listaEstatisticasInternacaoUsuario = data.body.produtividadePorUsuario;
          this.dataSourceEstatisticaInternacaoUsuario = new MatTableDataSource(this.listaEstatisticasInternacaoUsuario);

          this.totalInternacoes = data.body.produtividadePorEvolucao[0].total;
        });
    }
    else if (this.estatisticasForm.get('opcoes')?.value == 2)
    {
      this.service
        .getQuantidadesContas(
          this.unidadeAtendimento,
          this.estatisticasForm.get('operadora')?.value,
          this.estatisticasForm.get('usuario')?.value,
          this.estatisticasForm.get('statusConta')?.value
        )
        .subscribe((data: any) => {
          // console.log(data.body);
          this.listaLocalChecklist = data.body.produtividadeLocalchecklist;
          this.dataSourceLocalChecklist = new MatTableDataSource(this.listaLocalChecklist)

          this.listaEstatisticaContaStatus = data.body.produtividadePorStatusConta;
          this.dataSourceEstatisticaContaStatus = new MatTableDataSource(this.listaEstatisticaContaStatus);

          this.listaEstatisticaContaOperadora = data.body.produtividadePorUnidadeOperadora;
          this.dataSourceEstatisticaContaOperadora = new MatTableDataSource(this.listaEstatisticaContaOperadora);

          this.listaEstatisticaContaUsuario = data.body.produtividadePorUsuario;
          this.dataSourceEstatisticaContaUsuario = new MatTableDataSource(this.listaEstatisticaContaUsuario);

          this.totalContas = data.body.produtividadePorStatusConta[0].total;
        });
    }
    else
    {
      Swal.fire('', 'Selecione uma opção', 'error');
    }
  }

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape')
      this.voltar();
  }

  colunasInternacao = ['descricao', 'quantidade'];

  colunasContas = [
    'usuario',
    'idStatusConta',
    'idUnidadeOperadora',
    'quantidade',
  ];

  evolucoes = [
    { nome: 'Parcias', id: 3 },
    { nome: 'Alta', id: 1 },
    { nome: 'Não Encontrada', id: 4 },
  ];

  statusConta = [
    { nome: 'Pendente', id: 1 },
    { nome: 'Pronto', id: 2 },
  ];
}
