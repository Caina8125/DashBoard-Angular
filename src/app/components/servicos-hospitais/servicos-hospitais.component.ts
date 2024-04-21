import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ServicoCobranca } from 'src/app/interfaces/ServicoCobranca';
import { ServicosHospitaisService } from './servicos-hospitais.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Acomodacao } from 'src/app/interfaces/Conta';

@Component({
  selector: 'app-servicos-hospitais',
  templateUrl: './servicos-hospitais.component.html',
  styleUrls: ['./servicos-hospitais.component.css'],
})
export class ServicosHospitaisComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ServicosHospitaisService
  ) {}

  Uti = [];
  pj!: number;
  senha!: number;
  equipe!: number;
  enfermaria = [];
  codigo!: number;
  medico!: string;
  apartamento = [];
  servico!: string;
  servicos: any = [];
  enfermariaHSL = [];
  dataServico!: Date;
  apartamentoHSL = [];
  acomodacao!: number;
  acomodacoes!: Acomodacao[];
  grauDeParticipacao!: number;
  unidadeAtendimento!: number;
  listaServicosCobrados: any[] = [];
  data = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];

  @Input() idCobranca!: number;
  @Input() dataAtendimento!: string;
  @Output() servicosCobrados: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const unidadeAtendimento = params.get('unidadeAtendimento') || '';
      this.unidadeAtendimento = parseInt(unidadeAtendimento);
    });

    if (
      this.unidadeAtendimento == 3 ||
      this.unidadeAtendimento == 5 ||
      this.unidadeAtendimento == 6 ||
      this.unidadeAtendimento == 7
    ) {
      this.service.getServicosPlantoes(1).subscribe((data: any) => {
        this.servicos = data.body;
      });
    } else if (this.unidadeAtendimento == 2) {
      this.service.getServicosPorUnidade(2).subscribe((data: any) => {
        this.servicos = data.body;
      });
    } else if (this.unidadeAtendimento != 2) {
      this.service
        .getServicosPlantoes(this.unidadeAtendimento)
        .subscribe((data: any) => {
          this.servicos = data.body;
        });
    }
  }

  async obterServicosEPlantoes(ativo: any) {
    this.listaServicosCobrados = [];
    await this.service
      .getPlantoesDaConta(ativo, this.idCobranca)
      .subscribe((data: any) => {
        const arr1 = data.body.cobrancasCorpoClinico;
        const arr2 = data.body.servicosCobrancas;
        this.listaServicosCobrados = [...arr1, ...arr2];
        this.servicosCobrados.emit(this.listaServicosCobrados);
      });
  }

  criarServico() {
    const acomodacoesSelecionadas: ServicoCobranca[] = [];

    this.adicionarAcomodacaoSeExistir(
      acomodacoesSelecionadas,
      this.enfermariaHSL,
      2
    );
    this.adicionarAcomodacaoSeExistir(
      acomodacoesSelecionadas,
      this.apartamentoHSL,
      1
    );
    this.adicionarAcomodacaoSeExistir(
      acomodacoesSelecionadas,
      this.Uti,
      4,
      this.dataAtendimento
    );
    this.adicionarAcomodacaoSeExistir(
      acomodacoesSelecionadas,
      this.apartamento,
      1,
      this.dataAtendimento
    );
    this.adicionarAcomodacaoSeExistir(
      acomodacoesSelecionadas,
      this.enfermaria,
      2,
      this.dataAtendimento
    );

    this.service.postServicoCobranca(acomodacoesSelecionadas).subscribe({
      next: () => {
        Swal.fire('', 'Os serviços foram criados', 'success');
        this.obterServicosEPlantoes(0);
      },
      error: (data: any) => {
        const errorMessage =
          data.error.errors?.Mensagens[0] ||
          'Não foi possível salvar esses serviços';
        Swal.fire('', errorMessage, 'error');
      },
    });
  }

  adicionarAcomodacaoSeExistir(
    acomodacoesSelecionadas: ServicoCobranca[],
    idServicoArray: number[],
    idAcomodacao: number,
    dataServico?: string
  ) {
    if (idServicoArray.length > 0) {
      acomodacoesSelecionadas.push({
        idCobranca: this.idCobranca,
        idServico: idServicoArray,
        idAcomodacao,
        dataServico,
      });
    }
  }
}
