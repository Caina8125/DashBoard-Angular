import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from '../utils/dark-mode.service';
import { TelaRelatoriosService } from './tela-relatorios.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-relatorios',
  templateUrl: './tela-relatorios.component.html',
  styleUrls: ['./tela-relatorios.component.css'],
})
export class TelaRelatoriosComponent implements OnInit {
  //#region
  idUsuario: any;
  @Input() status = null;
  unidadeAtendimento: any;
  @Input() usuario1 = null;
  @Input() usuario2 = null;
  @Input() usuario3 = null;
  @Input() usuario4 = null;
  @Input() usuario5 = null;
  @Input() usuario6 = null;
  @Input() operadora = null;
  @Input() operadora2 = null;
  @Input() statusConta = null;
  modaEscuroRelatorios = false;
  listaColaboradores: any = [];
  @Input() motivoPendencia = null;
  listaMotivosPendencia: any = [];
  @Input() motivoPendencia1 = null;
  listaUnidadeOperadoras: any = [];
  //#endregion

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private service: TelaRelatoriosService,
    private darkModeService: DarkModeService,
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modaEscuroRelatorios = modoEscuro;
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.unidadeAtendimento = params.get('unidadeAtendimento');
      this.idUsuario = params.get('idUsuario');
    });

    this.service
      .getMotivosPendencia()
      .subscribe({
        next:(data:any)=>{
          // console.log(data.body);
          this.listaMotivosPendencia = data.body;
        }
      })

    this.service
      .getUnidadeOperadoras(this.unidadeAtendimento)
      .subscribe({
        next:(data:any)=>{
          // console.log(data.body);
          this.listaUnidadeOperadoras = data.body
        }
      })

    this.service.getColaboradores().subscribe((data: any) => {
      // console.log(data.body);
      if(data.status == 401){
        this.router.navigate(['/', 'login']);
      }
      this.listaColaboradores = data.body;
    });
  }

  gerarContasSemEvolucao(){
    this.service
      .getRelatorioContasAusentesEvolucao(this.unidadeAtendimento,this.usuario3)
      .subscribe({
        next:(data:any)=>{
          // console.log(data.body);
          if(data.body == null){
            Swal.fire('','Esse usuário não possui contas com evolução ausente','warning')
          }else{
            this.renderDownload(
              data.body,
              `contasSemEvolução.xlsx`
            );
          }
        },
        error:()=>{
          Swal.fire('','Não foi possível gerar o relatório','error');
        }
      })
  }

  gerarContasPendentesPorOperadora(){
    this.service
      .getContasPorOperadoraEUsuario(this.unidadeAtendimento,this.usuario4,this.operadora2)
      .subscribe({
        next:(data:any)=>{
          // console.log(data.body);
          if(data.body == null){
            Swal.fire('','Esse usuário não possui contas com evolução ausente','warning')
          }else{
            this.renderDownload(
              data.body,
              `contas.xlsx`
            );
          }
        },
        error:()=>{
          Swal.fire('','Não foi possível gerar o relatório','error');
        }
      })
  }

  gerarContasPendentes() {
    this.service
      .getContasPendentes(this.unidadeAtendimento,this.usuario1)
      .subscribe({
        next:(data:any)=>{
          this.renderDownload(
            data.body,
            `contasPendentes.xlsx`
          );
        },
        error:()=>{
          Swal.fire('','Não foi possível gerar o relatório','error');
        }
      })
  }

  gerarGuiasAuditoria(){
    this.service
      .getRelatorioAuditoria(this.status,this.operadora)
      .subscribe({
        next:(data:any)=>{
          if(data.status == 204){
            Swal.fire('',`Esse convênio não possui guias na auditoria`,'warning');
          }else{
            this.renderDownload(
              data.body,
              `guiasNaAuditoria.xlsx`
            );
          }
        },
        error:(err)=>{
          // console.log(err);
          Swal.fire('',`${err.status}`,'error');
        }
      })
  }

  gerarInternacoes(){
    this.service
      .getInternacoes(this.unidadeAtendimento)
      .subscribe({
        next:(data:any)=>{
          this.renderDownload(
            data.body, 'CTI - Relatorio_Evolucao.xlsx'
          );
        },
        error:(err)=>{
          Swal.fire('',`${err.status}`,'error')
        }
      })
  }

  gerarCobrancasPendentes(){
    this.service
      .getCobrancasPendentes(this.unidadeAtendimento)
      .subscribe({
        next:(data:any)=>{
          this.renderDownload(
            data.body, 'CTI - Relatorio_Cobranças_Pendentes.xlsx'
          );
        },
        error:(err)=>{
          Swal.fire('',`${err.status}`,'error')
        }
      })
  }

  gerarPendenciasProntas(){
    this.service
      .getPendenciasProntas(this.unidadeAtendimento,this.motivoPendencia1,this.usuario5)
      .subscribe({
        next:(data:any)=>{
          this.renderDownload(
            data.body, 'CTI - Relatorio_Pendencias_Prontas.xlsx'
          );
        },
        error:(err)=>{
          Swal.fire('',`${err.status}`,'error')
        }
      })
  }

  gerarGuiasMotivoPendencia(){
    this.service
      .getRelatorioPorMotivo(this.unidadeAtendimento,this.usuario2,this.motivoPendencia)
      .subscribe({
        next:(data:any)=>{
          this.renderDownload(
            data.body,
            `contasPorMotivo.xlsx`
          );
        },
        error:(err)=>{
          // console.log(err);
          Swal.fire('',`${err.status}`,'error');
        }
      })
  }

  gerarContasPorStatus(){
    this.service
      .getContasPendentesPorStatus(this.unidadeAtendimento,this.usuario6,this.statusConta)
      .subscribe({
        next:(data)=>{
          this.renderDownload(
            data.body,
            `contasPorMotivo.xlsx`
          );
        },
        error:(err)=>{
          // console.log(err);
          Swal.fire('',`${err.status}`,'error');
        }
      })
  }

  relatoriosContasPorStatus(){
    this.service
      .getRelatorioPorMotivo(this.unidadeAtendimento,this.usuario2,this.motivoPendencia)
      .subscribe({
        next:(data:any)=>{
          this.renderDownload(
            data.body,
            `contasPorMotivo.xlsx`
          );
        },
        error:(err)=>{
          // console.log(err);
          Swal.fire('',`${err.status}`,'error');
        }
      })
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

  voltar() {
    this.location.back();
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code == 'Escape') this.voltar();
  }

  statusGuias = [
    {id:-864513, name:'550 - Em Conferência no Processamento'},
    {id:-879981, name:'416 - Devolução na Conferência'}
  ];

  listaStatusConta = [
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
}
