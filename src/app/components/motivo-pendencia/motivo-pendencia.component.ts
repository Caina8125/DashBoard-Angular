import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoPendenciaService } from './motivo-pendencia.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-motivo-pendencia',
  templateUrl: './motivo-pendencia.component.html',
  styleUrls: ['./motivo-pendencia.component.css'],
})
export class MotivoPendenciaComponent implements OnInit {

  dataPendencia: any;
  medicoResolveu: any;
  closeResult!: string;
  medicoPendencia: any;
  motivoPendenciaList = [];
  @Input() idConta!: number;
  motivoPendencia: any = [];
  listaMotivoPendencia: any;
  observacaoPendencia = null;
  unidadeAtendimento!: number;
  dataSourceMotivosPendencias: any;
  data = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private modalService: NgbModal,private service: MotivoPendenciaService,private route: ActivatedRoute,) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const unidadeAtendimento = params.get('unidadeAtendimento') || '';
      this.unidadeAtendimento = parseInt(unidadeAtendimento);
    })

    this.service.getTodosMotivosPendencia().subscribe((data: any) => {
      this.motivoPendencia = data.body;
    });

    this.service.getObservacaoPendecia(this.idConta).subscribe((data: any) => {
      this.observacaoPendencia = data.body.observacaoPendencia;
    });

    this.service.getContaPendencia(this.idConta).subscribe((data: any) => {
      this.listaMotivoPendencia = data.body;
      this.dataSourceMotivosPendencias = new MatTableDataSource<any>(
        this.listaMotivoPendencia
      );
    });
  }

  criarMotivoPendencia() {
    this.motivoPendenciaList.forEach((motivoPendencia) => {
      this.service
        .postMotivo(motivoPendencia,this.idConta,1,this.dataPendencia,this.medicoPendencia)
        .subscribe({
          next: () => {
            this.service
              .getContaPendencia(this.idConta)
              .subscribe((data: any) => {
                this.listaMotivoPendencia = data.body;
                this.dataSourceMotivosPendencias = new MatTableDataSource<any>(this.listaMotivoPendencia);
              });
          },
          error: (err) => {
            Swal.fire('', err.error.errors.Mensagens[0], 'error');
          },
          complete: () => {
            Swal.fire('', 'Motivo pendencia criado com sucesso', 'success');
          },
        });
    });

    if (this.observacaoPendencia != null) {
      this.service
        .putObservacaoPendencia(this.idConta, this.observacaoPendencia)
        .subscribe(() => {
          this.service
            .getObservacaoPendecia(this.idConta)
            .subscribe((data: any) => {
              this.observacaoPendencia = data.body.body.observacaoPendencia;
            });
        });
    }
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

  editarMotivoPendencia(id: any,pendente: any,idMotivo: any,data: any,nomeMedico: any,medicoQueResolveu?: any) {
    if (pendente == 1) {
      pendente = 0;
    }
    this.service
      .putMotivoPendencia(id,idMotivo,this.idConta,pendente,data,nomeMedico,medicoQueResolveu)
      .subscribe({
        next: () => {
          this.service
            .getContaPendencia(this.idConta)
            .subscribe((data: any) => {
              this.listaMotivoPendencia = data.body;
              this.dataSourceMotivosPendencias = new MatTableDataSource<any>(this.listaMotivoPendencia);
            });
          this.modalService.dismissAll();
        },
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  colunasMotivos = [
    'codigo',
    'nome',
    'medico',
    'data',
    'medicoQueResolveu',
    'ativo',
  ];
}
