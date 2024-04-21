export interface ServicoCobranca {
  id?: number;
  idCobranca: number;
  idServico: Array<number>;
  idAcomodacao: number;
  idStatusCobranca?: number;
  dataServico?: string;
  nome?: string;
  crm?: number;
  matricula?: number;
  ativo?: number;
}
