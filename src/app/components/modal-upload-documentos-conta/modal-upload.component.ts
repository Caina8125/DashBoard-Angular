import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
import { TipoDocumentoConta } from 'src/app/interfaces/TipoDocumentoConta';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css'],
})
export class ModalUploadComponent implements OnInit {
  constructor(private service: ModalUploadService) {}

  @Input() operadora!: number;
  @Input() numeroConta!: number;
  @Output() documentosCriados: EventEmitter<any> = new EventEmitter<any>();

  documentoConta!: File;
  documentoNome!: string;
  tipoDocumentoId!: number;
  operadoraObject!: string;
  tiposDocumentos!: TipoDocumentoConta[];

  ngOnInit(): void {
    this.service.getTipoDocumento().subscribe({
      next: (data) => {
        this.tiposDocumentos = data ?? [];
      }
    });
  }

  enviarDocumentos(){
    if(this.documentoConta.type === 'application/pdf'){
      const numeroContaString = this.numeroConta.toString();
      const operadoraString = this.operadora.toString();
      const numeroContaBlob: Blob = new Blob([numeroContaString],{ type:'text/plain' });
      const operadoraBlob: Blob = new Blob([operadoraString],{ type:'text/plain' })

      const tipoDocumentoString = this.tipoDocumentoId.toString();
      const tipoDocumentoBlob: Blob = new Blob([tipoDocumentoString], { type: 'text/plain' });
      this.service
        .postDocumento(numeroContaBlob, tipoDocumentoBlob,operadoraBlob,this.documentoConta,this.numeroConta,this.tipoDocumentoId, this.operadora)
        .subscribe({
          next:()=>{
            this.documentosCriados.emit(true);
            Swal.fire('Parabéns!', 'Arquivo enviado com sucesso', 'success');
          },
          error:()=>{
            Swal.fire('Ops...', 'Não foi possivel enviar o arquivo', 'error');
          }
        })
    }else{
      Swal.fire('Opss...','Só são permitidos documentos em PDF','error');
    }
  }

  onChange(event: any) {
    this.documentoConta = event.target.files[0];
    this.documentoNome = this.documentoConta.name;
    if(this.documentoConta.type !== 'application/pdf'){
      Swal.fire('Opss...','Só são permitidos documentos em PDF','error');
    }
  }
}
