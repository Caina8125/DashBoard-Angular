import { TipoDocumentoConta } from "./TipoDocumentoConta"

export interface DocumentoConta{
  id: number,
  numeroConta:number,
  tipoDocumentoCensoContaId:number,
  arquivo:Arquivo,
  tipoDocumentoCenso:TipoDocumentoConta,
  imagemArquivo:string
}

export interface Arquivo{
  id:number,
  nome:string,
  nomeDoArquivoFisico:string,
  contentType:string,
  imagemArquivo:string
}
