import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { ServicosCtiService } from './servicos-cti.service';
import { ServicoCobranca } from 'src/app/interfaces/ServicoCobranca';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-servicos-cti',
  templateUrl: './servicos-cti.component.html',
  styleUrls: ['./servicos-cti.component.css'],
})
export class ServicosCtiComponent implements OnInit {
  @Input() idConta!: number;
  @Input() idCobranca!: number;
  @Input() idAcomodacao!: number;
  @Output() plantoesRecebidos: EventEmitter<any> = new EventEmitter<any>();
  @Output() servicosRecebidos: EventEmitter<any> = new EventEmitter<any>();

  PD = null;
  PN = null;
  INP = null;
  exames: any;
  idServico = [];
  examesCTI: any;
  dataExame: any;
  medicoServico: any;
  botaodsbld = false;
  unidadeAtendimento!: number;
  listaServicosCobrados: any[] = [];
  opcoesPrimeiroCirurgiao: any = [];
  listaPlantoesCobrados: any[] = [];
  plantoesSelecionados: number[] = [];
  servicosSelecionados: ServicoCobranca[] = [];

  constructor(
    public loadingService: LoaderService,
    private service: ServicosCtiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const unidadeAtendimento = params.get('unidadeAtendimento') || '';
      this.unidadeAtendimento = parseInt(unidadeAtendimento);
    });

    this.service
      .getExamesCTI(this.unidadeAtendimento)
      .subscribe((data: any) => {
        this.examesCTI = data.body;
      });
  }

  formatarNome(medico: any): string {
    return medico?.PessoaFisica?.Pessoa?.NomeRazao || '';
  }

  async criarCobranca() {
    this.service.postCobranca(this.idConta).subscribe({
      next: (data: any) => {
        this.idCobranca = data.body.id;
        this.servicosSelecionados = [
          {
            idCobranca: this.idCobranca,
            idServico: this.plantoesSelecionados,
            idAcomodacao: this.idAcomodacao,
            dataServico: this.dataExame,
            nome: this.medicoServico?.PessoaFisica.Pessoa.NomeRazao,
            crm: this.medicoServico?.CodigoConselho,
            matricula: this.medicoServico?.Credenciado.Matricula,
          },
        ];
        this.service.postPlantoesCTI(this.servicosSelecionados).subscribe({
          next: (data) => {
            Swal.fire(
              'Parabéns!',
              'Serviços adicionados com sucesso',
              'success'
            );
            this.obterServico(0, this.idCobranca);
            this.obterPlantoesDaConta(0);
          },
          error(err) {
            Swal.fire('Ops...', `${err.error.errors.Mensagens}`, 'error');
          },
        });
      },
      error(err) {
        Swal.fire('Ops...', `${err.error.errors.Mensagens}`, 'error');
      },
    });
  }

  async enviarPlantoesExames() {
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

    if (this.idCobranca == undefined || this.idCobranca == 0) {
      await this.criarCobranca();
    } else {
      this.servicosSelecionados = [
        {
          idCobranca: this.idCobranca,
          idServico: this.plantoesSelecionados,
          idAcomodacao: this.idAcomodacao,
          dataServico: this.dataExame,
          nome: this.medicoServico?.PessoaFisica.Pessoa.NomeRazao,
          crm: this.medicoServico?.CodigoConselho,
          matricula: this.medicoServico?.Credenciado.Matricula,
        },
      ];
      if (this.plantoesSelecionados.length > 0) {
        console.log(this.servicosSelecionados);
        this.service.postPlantoesCTI(this.servicosSelecionados).subscribe({
          next: (data) => {
            console.log(data.body);
            Swal.fire(
              'Parabéns!',
              'Serviços adicionados com sucesso',
              'success'
            );
            this.obterServico(0, this.idCobranca);
            this.obterPlantoesDaConta(0);
          },
          error(err) {
            Swal.fire('Ops...', `${err.error.errors.Mensagens}`, 'error');
          },
        });
      }
    }
  }

  obterServico(ativo: any, idCobranca: any) {
    this.service
      .getServicoPorConta(ativo, idCobranca)
      .subscribe((data: any) => {
        const arr1 = data.body.cobrancasCorpoClinico;
        const arr2 = data.body.servicosCobrancas;
        this.listaServicosCobrados = [...arr1, ...arr2];
        this.idServico = data.body.id;
        this.servicosRecebidos.emit(this.listaServicosCobrados);
      });
  }

  obterPlantoesDaConta(ativo: any) {
    this.service.getPlantoesDaConta(ativo, this.idCobranca).subscribe({
      next: (data: any) => {
        const arr1 = data.body.cobrancasCorpoClinico;
        const arr2 = data.body.servicosCobrancas;
        const arr3 = data.body.servicosCobrancasPlantao;
        this.listaPlantoesCobrados = [...arr1, ...arr2, ...arr3];
        this.listaPlantoesCobrados = this.listaPlantoesCobrados.filter((objeto) => objeto.idServico !== 48);
        this.plantoesRecebidos.emit(this.listaPlantoesCobrados);
      },
    });
  }

  buscaPrimeiroCirurgiao(crm: any) {
    if (crm > 0) {
      this.service.getProfissionalSaude(crm).subscribe((data: any) => {
        this.opcoesPrimeiroCirurgiao = data.body;
      });
    }
  }
}
