// import { registroAtendimentoObject } from './RegistroAtendmentoObject';
export interface Internacao{
  dataAtualizacao:any;
  dataCriacao:any;
  dataFinal: any;
  dataInicial:any;
  evolucaoObject:any;
  horaFinal:any;
  horaInicial:any;
  id:any;
  idEvolucao:any;
  idRegistroAtendimento:any;
  pessoaAlteracao:any;
  pessoaInclusao:any;
  registroAtendimentoObject:any;
}

export interface FiltroIntercao{
  idUnidadeAtendimento:number,
  idEvolucao:number,
  idAcomodacao:string,
  idUsuario:number,
  idUnidadeOperadora:string,
  nroRegistroAtendimento:string,
  paciente:string,
  dataInicial:string,
  dataFinal:string,
  dataCriacao:string,
  skip:number
}
