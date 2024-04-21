import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';
import { ServicoCobranca } from './../../interfaces/ServicoCobranca';

//#region
const APICONTA = environment.apiURLConta;
const APICODIGO = environment.apiURLCodigos;
const APISERVICO = environment.apiURLServicos;
const APIAMHPTISS = environment.apiURLAMHPTISS;
const APICOBRANCA = environment.apiURLCobranca;
const APICHECKLIST = environment.apiURLChecklist;
const APIOPERADORA = environment.apiURLOperadora;
const APIACOMODACAO = environment.apiURLAcomodacao;
const APILOCALCONTA = environment.apiURLLocalConta;
const APIINTERNACAO = environment.apiURLInternacao;
const APISTATUSCONTA = environment.apiURLStatusConta;
const APICONTAPENDENCIA = environment.apiURLContaPendencia;
const APISERVICOBRANCA = environment.apiURLServicoCobranca;
const APISERVICOVALORADO = environment.apiURLServicoValorado;
const APIMOTIVOPENDENCIA = environment.apiURLMotivoPendencia;
const APICENTROCIRURGICO = environment.apiURLCentroCirurgico;
const APIUNIDADEOPERADORA = environment.apiURLUnidadeOperadora;
const APIPROFISSIONALSAUDE = environment.apiURLProfissionalSaude;
const APICOBRANCACORPOCLINICO = environment.apiURLCobrancaCorpoClinico;
const APIOBSERVACAOINATIVASERVICO = environment.apiURLObservacaoInativaServico;
//#endregion

@Injectable({
  providedIn: 'root',
})
export class CriarContasService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public postConta(
    idConta: any,
    idInternacao: any,
    idUnidadeOperadora: any,
    idLocalChecklist: any,
    idStatusConta: any,
    numeroConta: any,
    registro: any,
    observacao: any,
    observacaoPendencia: any,
    dataAtendimento: any,
    horaAtendimento: any,
    nroAcomodacao: any,
    idAcomodacao: any,
    idStatusValidade: any,
    idUnidadeAtendimento: any,
    localConta: any,
    periodoParcial: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APICONTA}/adicionar-conta/${idInternacao}`,
      {
        id: idConta,
        idUnidadeOperadora: idUnidadeOperadora,
        idLocalChecklist: idLocalChecklist,
        idStatusConta: idStatusConta,
        numeroConta: numeroConta,
        registro: registro,
        observacao: observacao,
        observacaoPendencia: observacaoPendencia,
        dataAtendimento: dataAtendimento,
        horaAtendimento: horaAtendimento,
        idAcomodacao: idAcomodacao,
        nroAcomodacao: nroAcomodacao,
        idStatusValidade: idStatusValidade,
        idInternacao: idInternacao,
        idUnidadeAtendimento: idUnidadeAtendimento,
        idLocalConta: localConta,
        periodoParcial: periodoParcial,
      },
      { headers, observe: 'response' }
    );
  }

  public postMotivo(
    idMotivoPendencia: any,
    idConta: any,
    pendente: any,
    dataPendencia?: any,
    nomeProfissional?: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APICONTAPENDENCIA}/adicionar-conta-pendencia/${idConta}?idMotivoPendencia=${idMotivoPendencia}`,
      {
        idConta: idConta,
        idMotivoPendencia: idMotivoPendencia,
        pendente: pendente,
        dataPendencia: dataPendencia,
        nomeProfissional: nomeProfissional,
      },
      { headers, observe: 'response' }
    );
  }

  public postCorpoClinico(
    idCentroCirurgico: any,
    nome: any,
    crm: any,
    matricula: any,
    idGrauParticipacao: any,
    inativo: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APICOBRANCACORPOCLINICO}/adicionar-cobranca-corpo-clinico`,
      {
        idCentroCirurgico: idCentroCirurgico,
        nome: nome,
        crm: crm,
        matricula: matricula,
        idGrauParticipacao: idGrauParticipacao,
        inativo: inativo,
      },
      { headers, observe: 'response' }
    );
  }

  public postServicoCobranca(servicoCobrancas: Array<ServicoCobranca>) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(
      `${APISERVICOBRANCA}/adicionar-servico-cobranca`,
        servicoCobrancas,
      { headers, observe: 'response' }
    );
  }

  public postCobranca(idConta: any,) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APICOBRANCA}/adicionar-cobranca`,
      {
        idAcomodacao: null,
        observacao: '',
        nroAcomodacao: null,
        idProcedimento: null,
        idCorpoClinico: null,
        idConta: idConta,
        dataRealizado: '',
        horaRealizado: '',
        idContratado: null,
        idCredenciado: null,
        idViaAcesso: null,
        idStatusCobranca: 0,
        idCbo: null,
        idGrauParticipacao: null,
      },
      { headers, observe: 'response' }
    );
  }

  public postCentroCirurgico(
    idCobranca: any,
    idEquipeCorpoClinico: any,
    idStatusCobranca: any,
    idServico: any,
    inativo: any,
    dataCentroCirurgico: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APICENTROCIRURGICO}/adicionar-centro-cirurgico`,
      {
        idCobranca: idCobranca,
        idEquipeCorpoClinico: idEquipeCorpoClinico,
        idStatusCobranca: idStatusCobranca,
        idServico: idServico,
        inativo: inativo,
        dataCentroCirurgico: dataCentroCirurgico,
      },
      { headers, observe: 'response' }
    );
  }

  public postPlantoesCTI(
    servicos: ServicoCobranca[]
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(
      `${APISERVICOBRANCA}/adicionar-servico-cobranca`,
      servicos,
      { headers, observe: 'response' }
    );
  }

  public postCodigos(idCentroCirurgico: any, inativo: any, descricao: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APICODIGO}/adicionar-centro-cirurgico`,
      {
        idCentroCirurgico: idCentroCirurgico,
        inativo: inativo,
        descricao: descricao,
      },
      { headers }
    );
  }

  public postTrocaStatusGuia(atendimentoId: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APIPROFISSIONALSAUDE}/atualizar-status-atendimento/${atendimentoId}`,
      { atendimentoId: atendimentoId },
      { headers, observe: 'response' }
    );
  }

  public postServicoValorado(
    codigo: string,
    contratadoId: number,
    operadoraId: number,
    idServicoCobranca: number
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APISERVICOVALORADO}/adicionar-servico-valorado`,
      {
        codigo: codigo,
        contratadoId: contratadoId,
        operadoraId: operadoraId,
        idServicoCobranca: idServicoCobranca,
      },
      { headers, observe: 'response' }
    );
  }

  public postObservacaoInativaServico(observacao:string, idServicoCobranca?:number){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APIOBSERVACAOINATIVASERVICO}/adicionar-Observacao`,
      {
        observacao: observacao,
        idServicoCobranca: idServicoCobranca,
      },
      { headers, observe: 'response' }
    );
  }

  public putMotivoPendencia(
    id: any,
    idMotivoPendencia: any,
    idConta: any,
    pendente: any,
    dataPendencia: any,
    nomeProfissional: any,
    profissionalResponsavel: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICONTAPENDENCIA}/Atualizar-conta-pendencia`,
      {
        id: id,
        idMotivoPendencia: idMotivoPendencia,
        idConta: idConta,
        pendente: pendente,
        dataPendencia: dataPendencia,
        nomeProfissional: nomeProfissional,
        profissionalResponsavel: profissionalResponsavel,
      },
      { headers, observe: 'response' }
    );
  }

  public putObservacaoPendencia(idConta: any, observacao: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICONTA}/adicionar-observacao-pendencia?idConta=${idConta}&observacaoPendencia=${observacao}`,
      { idConta: idConta, observacao: observacao },
      { headers, observe: 'response' }
    );
  }

  public putStatusServicos(idServico: any, idStatusCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APISERVICOBRANCA}/atualizar-servico-cobranca?idServicoCobranca=${idServico}&idStatusCobranca=${idStatusCobranca}`,
      { idServico: idServico, idStatusCobranca: idStatusCobranca },
      { headers, observe: 'response' }
    );
  }

  public putCentroCirurgico(idCentroCirurgico: any, idStatusCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICENTROCIRURGICO}/atualizar-centro-cirurgico?idCentroCirurgico=${idCentroCirurgico}&idStatusCobranca=${idStatusCobranca}`,
      {
        idCentroCirurgico: idCentroCirurgico,
        idStatusCobranca: idStatusCobranca,
      },
      { headers, observe: 'response' }
    );
  }

  public putCentroCirurgicoAtivo(idCentroCirurgico: any, inativo: any): Observable<ServicoCobranca>{
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<ServicoCobranca>(
      `${APICENTROCIRURGICO}/definir-ativo?idCentroCirurgico=${idCentroCirurgico}&inativo=${inativo}`,
      { idCentroCirurgico: idCentroCirurgico, inativo: inativo },
      { headers }
    );
  }

  public putStatusCorpoClinico(
    idCobrancaCorpoClinico: any,
    idStatusCorpoClinico: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICOBRANCACORPOCLINICO}/atualizar-status-corpo-clinico?idCobrancaCorpoClinico=${idCobrancaCorpoClinico}&idStatusCorpoClinico=${idStatusCorpoClinico}`,
      {
        idCobrancaCorpoClinico: idCobrancaCorpoClinico,
        idStatusCorpoClinico: idStatusCorpoClinico,
      },
      { headers, observe: 'response' }
    );
  }

  public putAtivoServicos(idServico: any, inativo: any): Observable<ServicoCobranca> {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<ServicoCobranca>(
      `${APISERVICOBRANCA}/definir-ativo?idServicoCobranca=${idServico}&inativo=${inativo}`,
      { idServico: idServico, ativo: inativo },
      { headers }
    );
  }

  public putInativarConta(idConta: number){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICONTA}/inativar-conta?idConta=${idConta}`,
      { idConta: idConta },
      { headers, observe: 'response' }
    );
  }

  public putCorpoClincio(idCobrancaCorpoClinico: any, inativo: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICOBRANCACORPOCLINICO}/definir-ativo?idCobrancaCorpoClinico=${idCobrancaCorpoClinico}&inativo=${inativo}`,
      { idCobrancaCorpoClinico: idCobrancaCorpoClinico, inativo: inativo },
      { headers, observe: 'response' }
    );
  }

  public putCodigoCentroCirurgico(idCodigo: any, inativo: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(
      `${APICODIGO}/definir-ativo?idCodigosCentroCirurgico=${idCodigo}&inativo=${inativo}`,
      {
        idCodigosCentroCirurgico: idCodigo,
        inativo: inativo,
      },
      { headers, observe: 'response' }
    );
  }

  public getObservacaoPendecia(idConta: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APICONTA}/obter-observacao-pendencia/${idConta}`, {
      headers,
      observe: 'response',
    });
  }

  public getStatusConta(unidadeAtendimento?:number) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(!unidadeAtendimento){
      return this.http.get(`${APISTATUSCONTA}/obter-todos`, {
        headers,
        observe: 'response',
      });
    }else{
      return this.http.get(`${APISTATUSCONTA}/obter-status-conta-por-unidade?idUnidadeAtendimento=${unidadeAtendimento}`, {
        headers,
        observe: 'response',
      });
    }
  }

  public getCobrancaPorIdConta(idConta: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APICOBRANCA}/obter-por-conta/${idConta}`, {
      headers,
      observe: 'response',
    });
  }

  public getServicoPorConta(inativo: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOBRANCA}/obter-ativos-e-inativos?inativo=${inativo}&idCobranca=${idCobranca}`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getAllLocalConta() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APILOCALCONTA}/obter-todos`, {
      headers,
      observe: 'response',
    });
  }

  public getInfoConta(idInternacao: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICONTA}/obter-contas-por-internacao/${idInternacao}`,
      { headers, observe: 'response' }
    );
  }

  public getInfoContasPorNroConta(nroConta: any, unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICONTA}/obter-por-nro-conta/${nroConta}/${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getInfoContaPorInternacao(id: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIINTERNACAO}/obter-internacao-por-id/${id}`, {
      headers,
      observe: 'response',
    });
  }

  public getContaPendencia(nroConta: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APICONTAPENDENCIA}/obter-por-conta/${nroConta}`, {
      headers,
      observe: 'response',
    });
  }

  public getOperadoras() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIOPERADORA}/obter-todas-operadora`, {
      headers,
      observe: 'response',
    });
  }

  public getUnidadeOperadoras(idUnidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUNIDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getQtdDiasVencimento(dataAtendimento: any, idUnidadeOperadora: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICONTA}/obter-qtd-dias-venc?dataAtendimento=${dataAtendimento}&idUnidadeOperadora=${idUnidadeOperadora}`,
      { headers, observe: 'response' }
    );
  }

  public getTodosServicos(idUnidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICO}/obter-todos?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getServicosPlantoes(idUnidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICO}/obter-todos?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getProfissionalSaude(crm: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIPROFISSIONALSAUDE}/obter-por-codigo/${crm}`, {
      headers,
      observe: 'response',
    });
  }

  public getChecklist(idConta: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/octet-stream',
    });

    if (idCobranca == null) {
      return this.http.get(
        `${APICHECKLIST}/preencher-checklist-santa-marta?idConta=${idConta}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    } else {
      return this.http.get(
        `${APICHECKLIST}/preencher-checklist-santa-marta?idConta=${idConta}&idCobranca=${idCobranca}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }
  }

  public getErroChecklist(idConta: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/octet-stream',
    });

    if (idCobranca == null) {
      return this.http.get(
        `${APICHECKLIST}/preencher-checklist-santa-marta?idConta=${idConta}`,
        { headers, observe: 'response' }
      );
    } else {
      return this.http.get(
        `${APICHECKLIST}/preencher-checklist-santa-marta?idConta=${idConta}&idCobranca=${idCobranca}`,
        { headers, observe: 'response' }
      );
    }
  }

  public getCorpoClinico(idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICOBRANCACORPOCLINICO}/obter-por-cobranca?idCobranca=${idCobranca}`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getCorpoClinicoAtivoEInativo(inativo: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICOBRANCACORPOCLINICO}/obter-ativos-e-inativos?inativo=${inativo}&idCobranca=${idCobranca}`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getTodosMotivosPendencia() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIMOTIVOPENDENCIA}/obter-todos-motivo-pendencias`,
      { headers, observe: 'response' }
    );
  }

  public getExamesCTI(idUnidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICO}/obter-todos?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getPlantoes(inativo: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOBRANCA}/obter-ativos-e-inativos?ativo=${inativo}&idCobranca=${idCobranca}`,
      { headers, observe: 'response' }
    );
  }

  public getPlantoesDaConta(inativo: any, cobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOBRANCA}/obter-ativos-e-inativos?inativo=${inativo}&idCobranca=${cobranca}&plantao=0`,
      { headers, observe: 'response' }
    );
  }

  public getCentroCirurgico(inativo: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICENTROCIRURGICO}/obter-ativos-e-inativos?inativo=${inativo}&idCobranca=${idCobranca}`,
      { headers, observe: 'response' }
    );
  }

  public getCodigosCentroCirurgico(inativo: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICODIGO}/obter-ativos-e-inativos?idCobranca=${idCobranca}&inativos=${inativo}`,
      { headers }
    );
  }

  public getGuias(nroConta: any, codigoOperadora: any, idCredenciado?: string) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if (idCredenciado) {
      return this.http.get(
        `${APIPROFISSIONALSAUDE}/obter-atendimentos-auditoria/${nroConta}?codigoOperadora=${codigoOperadora}&idCredenciado=${idCredenciado}`,
        { headers, observe: 'response' }
      );
    } else {
      return this.http.get(
        `${APIPROFISSIONALSAUDE}/obter-atendimentos-auditoria/${nroConta}?codigoOperadora=${codigoOperadora}&idCredenciado=0`,
        { headers, observe: 'response' }
      );
    }
  }

  public getServicosPorUnidade(unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICO}/obter-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getAcomodacao(unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIACOMODACAO}/obter-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getNotaDeDebito(
    idConta: any,
    viaCobranca?: any,
    idCobranca?: any,
    unidadeAtendimento?: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/zip',
    });

    if (viaCobranca == 1 || viaCobranca == 2 || viaCobranca == 3) {
      if (idCobranca) {
        return this.http.get(
          `${APICHECKLIST}/preencher-relatorio-cti?idConta=${idConta}&idCobranca=${idCobranca}&idUnidadeAtendimento=${unidadeAtendimento}&idViaCobranca=${viaCobranca}`,
          { headers, observe: 'response', responseType: 'blob' }
        );
      } else {
        return this.http.get(
          `${APICHECKLIST}/preencher-relatorio-cti?idConta=${idConta}&idUnidadeAtendimento=${unidadeAtendimento}&idViaCobranca=${viaCobranca}`,
          { headers, observe: 'response', responseType: 'blob' }
        );
      }
    } else {
      if (idCobranca) {
        return this.http.get(
          `${APICHECKLIST}/preencher-lista-relatorio-cti?idConta=${idConta}&idCobranca=${idCobranca}&idUnidadeAtendimento=${unidadeAtendimento}&idViaCobranca=${viaCobranca}`,
          { headers, observe: 'response', responseType: 'blob' }
        );
      } else {
        return this.http.get(
          `${APICHECKLIST}/preencher-lista-relatorio-cti?idConta=${idConta}&idUnidadeAtendimento=${unidadeAtendimento}&idViaCobranca=${viaCobranca}`,
          { headers, observe: 'response', responseType: 'blob' }
        );
      }
    }
  }

  public getQuantidadePlantoes(inativo: number, idCobranca: number) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOBRANCA}/obter-quantidade-plantoes?ativo=${inativo}&idCobranca=${idCobranca}`,
      { headers, observe: 'response' }
    );
  }

  public getNegociacaoTabelaOperadora(codigoOperadora: number) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIAMHPTISS}/negociacao-tabela-operadora?codigoOperadora=${codigoOperadora}`,
      { headers, observe: 'response' }
    );
  }

  public getNegociacaoTabelaPorOperadoraECodigo(
    codigoServico: Array<number>,
    idNegociacao: Array<number>
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIAMHPTISS}/negociacao-tabela-por-operadora-e-codigo?idNegociacao=${idNegociacao}&codigoServico=${codigoServico}`,
      { headers, observe: 'response' }
    );
  }

  public getOperadoraPorCodigoInterno(codigoOperadora: number) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIAMHPTISS}/obter-operadora?codigoOperadora=${codigoOperadora}`,
      { headers, observe: 'response' }
    );
  }

  public getServicoValorado(
    codigo: string,
    idContratado: number,
    idOperadora: number,
    quantidadeRealizada: number,
    dataRealizacao: string | null,
    credenciado: number,
    cbo: number,
    prestadorId: number,
    grauParticipacao: number,
    tipoCaraterAtendimento: string,
    tipoGuiaId: number,
    tipoAcomodacaoId: string,
    viaAcesso: string,
    tecnicaUtilizada: string,
    horaRealizacao: string
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIAMHPTISS}/servico-valorado?codigo=${codigo}&idcontratado=${idContratado}&idoperadora=${idOperadora}&quantidadeRealizada=${quantidadeRealizada}&dataRealizacao=${dataRealizacao}&credenciado=${credenciado}&cbo=${cbo}&prestadorId=${prestadorId}&grauParticipacao=${grauParticipacao}&tipoCaraterAtendimento=${tipoCaraterAtendimento}&tipoGuiaId=${tipoGuiaId}&tipoAcomodacaoId=${tipoAcomodacaoId}&viaAcesso=${viaAcesso}&tecnicaUtilizada=${tecnicaUtilizada}&horaRealizacao=${horaRealizacao}`,
      { headers, observe: 'response' }
    )
  }

  public getServicoValoradoPorIdServicoCobranca(idServicoCobranca:number){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOVALORADO}/obter-servico-valorado-por-idServicoCobranca/${idServicoCobranca}`,
      { headers, observe:'response' }
    )
  }
}
