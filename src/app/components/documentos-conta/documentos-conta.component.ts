import { Component, Input, OnInit } from '@angular/core';
import { DocumentoConta } from 'src/app/interfaces/DocumentoConta';
import { DocumentosContaService } from './documentos-conta.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentos-conta',
  templateUrl: './documentos-conta.component.html',
  styleUrls: ['./documentos-conta.component.css'],
})
export class DocumentosContaComponent implements OnInit {

  dataSource !: any;
  public closeResult!: string;
  @Input() operadora!: number;
  @Input() numeroConta!: number;
  listaDocumento!: DocumentoConta[];

  constructor(
    private modalService: NgbModal,
    private service: DocumentosContaService,
  ) {}

  public ativo = 1;

  ngOnInit(): void {
    this.obterDocumentosPorConta();
  }


  trocaValorAtivo(idDocumento: any, ativo: any) {
    if (ativo == 0) {
      this.ativo = 1;
    }
    if (ativo == 1) {
      this.ativo = 0;
    }

    this.editarAtivoServico(idDocumento, this.ativo);
  }

  editarAtivoServico(idDocumento: any, ativo: any)
    {
      this.service.putReprovarDocumento(idDocumento,ativo).subscribe((data: any) => {
        Swal.fire("Documento Excluído", '', 'success')
      });
      this.obterDocumentosPorConta();
    }


  obterDocumentosPorConta() {
    this.service.getListarDocumentosPorConta(this.numeroConta).subscribe({
      next: (data) => {
        this.listaDocumento = data ?? [];
        this.listaDocumento = this.listaDocumento.map((element, index) => {
          return { ...element, posicao: index + 1 };
        });
        this.dataSource = this.listaDocumento;
      },
    });
  }

  verDocumento(id:number){
    this.service
      .getDocumento(id)
      .subscribe({
        next:(data)=>{
          const url = data;
          window.open(url,'_blank')
        },
        error:(err)=>{
          console.error(err.error.text)
          const url = err.error.text
          window.open(url,'_blank')
        }
      })
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

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else return `with: ${reason}`;
  }

  colunasArquivos = [
    'posicao',
    'nomeArquivoFisico',
    'tipoDocumentoNome',
    'visualizarDoc',
    'ValidadoIA',
    'Ativo'
  ]
}
