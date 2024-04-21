import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

//#region
const APICONTA = environment.apiURLConta;
const APIOPERADORA = environment.apiURLOperadora;
const APIAUDITORIA = environment.apiURLAuditoria;
const APIINTERNACAO = environment.apiURLInternacao;
const APIREGISTRO = environment.apiURLRegistroAtendimentos;
const APIUNIDADEOPERADORA = environment.apiURLUnidadeOperadora;
//#endregion

@Injectable({
  providedIn: 'root',
})
export class InternacaoService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public postInternacao(
    nroRegistroAtendimento: any,
    paciente: any,
    dataInicial?: string,
    horaInicial?: string,
    dataFinal?: string,
    horaFinal?: string,
    idEvolucao?: any,
    unidadeAtendimento?: any,
    idOperadora?: any,
    idUnidadeOperadora?: any,
    idStatusInternacao?:any,
    idAcomodacao?:any,
    nroAcomodacao?:any,
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    if(idEvolucao == 3 || dataFinal == "" && horaFinal == ""){
      return this.http.post(
        `${APIINTERNACAO}/adicionar-internacao`,
        {
          nroRegistroAtendimento: nroRegistroAtendimento,
          paciente: paciente,
          dataInicial: dataInicial,
          horaInicial: horaInicial,
          idEvolucao: idEvolucao,
          unidadeAtendimento: unidadeAtendimento,
          idOperadora:idOperadora,
          idUnidadeOperadora: idUnidadeOperadora,
          idStatusInternacao:idStatusInternacao,
          idAcomodacao: idAcomodacao,
          nroAcomodacao: nroAcomodacao
        },
        { headers, observe: 'response' }
      );
    }else{
      return this.http.post(
        `${APIINTERNACAO}/adicionar-internacao`,
        {
          nroRegistroAtendimento: nroRegistroAtendimento,
          paciente: paciente,
          dataInicial: dataInicial,
          horaInicial: horaInicial,
          dataFinal: dataFinal,
          horaFinal: horaFinal,
          idEvolucao: idEvolucao,
          unidadeAtendimento: unidadeAtendimento,
          idOperadora:idOperadora,
          idUnidadeOperadora: idUnidadeOperadora,
          idStatusInternacao:idStatusInternacao,
          idAcomodacao: idAcomodacao,
          nroAcomodacao: nroAcomodacao
        },
        { headers, observe: 'response' }
      );
    }
  }

  public postOperadora(idUnidadeAtendimento: any,idOperadora: any,codigoExterno: any,codigoInterno: any,apelido: any, viaCobranca:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    if(idUnidadeAtendimento == 8 || idUnidadeAtendimento == 11){
      return this.http.post(
        `${APIUNIDADEOPERADORA}/adicionar-unidade-operadora`,
        {
          idUnidadeAtendimento: idUnidadeAtendimento,
          idOperadora: idOperadora,
          idLocalConta: viaCobranca,
          codigoExterno: codigoExterno,
          codigoInterno: codigoInterno,
          apelido: apelido,
        },
        { headers, observe: 'response' }
      );
    }else{
      return this.http.post(
        `${APIUNIDADEOPERADORA}/adicionar-unidade-operadora`,
        {
          idUnidadeAtendimento: idUnidadeAtendimento,
          idOperadora: idOperadora,
          codigoExterno: codigoExterno,
          codigoInterno: codigoInterno,
          apelido: apelido,
        },
        { headers, observe: 'response' }
      );
    }
  }

  public postDoc(unidadeAtendimento: any,idInternacao:any,arquivo:any): Observable<any>{
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('unidadeAtendimento', unidadeAtendimento);
    formData.append('file', arquivo, arquivo.name);
    return this.http.post(
      `${APIINTERNACAO}/upload-doc/${idInternacao}`,
      formData,
      {
        headers,
        observe:'response'
      }
    )
  }

  public getAuditoria(id:any, idUnidadeAtendimento:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIAUDITORIA}/auditoria-por-registro/${id}?idUnidadeAtendimento=${idUnidadeAtendimento}`, { headers, observe:'response' })
  }

  public getUnidadeOperadoraPorId(id:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUNIDADEOPERADORA}/obter-por-id/${id}`, { headers, observe:'response' })
  }

  public getFichaAdimissao(idInternacao:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`,Accept:'application/octet-stream', });

    return this.http.get(
      `${APIINTERNACAO}/ficha-admissao/${idInternacao}`,
      { headers, observe: 'response', responseType: 'blob' }
    )
  }

  public getInternacao(
    nroRegistroAtendimento: any,
    idEvolucao?: any,
    unidadeAtendimento?: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIINTERNACAO}/obter-por-evolucao-e-nroregistro/${nroRegistroAtendimento}/${idEvolucao}/${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getRegistro(atendimento: any, unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIREGISTRO}/obter-por-atendimento/${atendimento}/${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getContas(idInternacao: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICONTA}/obter-contas-por-internacao/${idInternacao}`,
      { headers, observe: 'response' }
    );
  }

  public getInternacaoPorId(id: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIINTERNACAO}/obter-internacao-por-id/${id}`, {
      headers,
      observe: 'response',
    });
  }

  public getUnidadeOperadora(idUnidadeAtendimento:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUNIDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}`, {
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

  public getOperadoraPorId(id:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUNIDADEOPERADORA}/obter-por-id/${id}`, {
      headers,
      observe: 'response',
    });
  }
}
