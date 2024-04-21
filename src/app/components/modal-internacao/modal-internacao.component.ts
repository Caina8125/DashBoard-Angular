import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalInternacaoService } from './modal-internacao.service';

@Component({
  selector: 'app-modal-internacao',
  templateUrl: './modal-internacao.component.html',
  styleUrls: ['./modal-internacao.component.css'],
})
export class ModalInternacaoComponent implements OnInit{

  paciente!: string;
  evolucao!: string;
  dataFinal!: string | null;
  horaFinal!: string | null;
  @Input() nroConta!: number;
  horaInicial!: string | null;
  dataInicial!: string | null;
  @Input() idInternacao!: number;
  @Input() idUnidadeAtendimento!: number;

  constructor(private service: ModalInternacaoService,private datePipe: DatePipe) {}

  ngOnInit(){
    this.service
      .getInfoContasPorNroConta(this.nroConta, this.idUnidadeAtendimento)
      .subscribe({
        next: (data: any) => {
          // console.log(data.body);
          this.paciente = data.body.internacaoObject.registroAtendimentoObject.paciente;
          this.evolucao = data.body.internacaoObject.evolucaoObject.descricao;
          const dataInicial = data.body.internacaoObject.dataInicial;
          const horaInicial = data.body.internacaoObject.horaInicial;
          const dataFinal = data.body.internacaoObject.dataFinal;
          const horaFinal = data.body.internacaoObject.horaFinal;
          if (dataInicial) {
            this.dataInicial = this.datePipe.transform(dataInicial, 'dd/MM/yyyy');
            this.horaInicial = this.datePipe.transform(horaInicial, 'HH:mm');
          }
          if(dataFinal){
            this.dataFinal = this.datePipe.transform(dataFinal, 'dd/MM/yyyy');
            this.horaFinal = this.datePipe.transform(horaFinal, 'HH:mm');
          }
        },
      });
  }
}
