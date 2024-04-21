import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoInternacaoService } from './historico-internacao.service';

@Component({
  selector: 'app-historico-internacao',
  templateUrl: './historico-internacao.component.html',
  styleUrls: ['./historico-internacao.component.css'],
})
export class HistoricoInternacaoComponent implements OnInit {

  constructor(private service: HistoricoInternacaoService) {}

  @Input() idInternacao!:number;
  dataSourceAuditoria!:DataSource<any>
  @Input() unidadeAtendimento!:number;

  ngOnInit() {
    this.service
      .getAuditoria(this.idInternacao, this.unidadeAtendimento)
      .subscribe({
        next: (data:any) => {
          const listaAuditoria = data.body;
          this.dataSourceAuditoria = new MatTableDataSource<any>(listaAuditoria);
        },
      });
  }

  colunasAuditoria = ['usuario', 'valorAlterado', 'antigo', 'novo', 'data'];
}
