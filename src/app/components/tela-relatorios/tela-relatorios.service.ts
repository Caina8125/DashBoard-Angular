import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

//#region
const APIUSUARIO = environment.apiURLUsuario;
const APIRELATORIO = environment.apiURLRelatorio;
const APIMOTIVOPENDENCIA = environment.apiURLMotivoPendencia;
const APIUNIDADEOPERADORA = environment.apiURLUnidadeOperadora;
//#endregion

@Injectable({
  providedIn: 'root',
})
export class TelaRelatoriosService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public getRelatorioContasAusentesEvolucao(idUnidadeAtendimento:any,usuario:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIRELATORIO}/contas-pendentes-por-ausencia-evolucao?idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}&idMotivo=16`,
      { headers, observe: 'response', responseType: 'blob' }
    );
  }

  public getCobrancasPendentes(idUnidadeAtendimento:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIRELATORIO}/relatorio-cobrancas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response', responseType: 'blob' }
    );
  }

  public getPendenciasProntas(idUnidadeAtendimento:any, idMotivo:any, usuario?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(usuario == null){
      return this.http.get(
        `${APIRELATORIO}/contas-prontas-por-motivo?idUnidadeAtendimento=${idUnidadeAtendimento}&idMotivo=${idMotivo}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }else{
      return this.http.get(
        `${APIRELATORIO}/contas-prontas-por-motivo?idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}&idMotivo=${idMotivo}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }
  }

  public getInternacoes(
    idUnidadeAtendimento: any
  ){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIRELATORIO}/relatorio-por-evolucao?idUnidadeAtendimento=${idUnidadeAtendimento}`,
       { headers, observe: 'response', responseType: 'blob' }
    )
  }

  public getRelatorioPorMotivo(
    idUnidadeAtendimento: any,
    usuario: any,
    idMotivo: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(usuario == null){
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes-por-motivo?idUnidadeAtendimento=${idUnidadeAtendimento}&idMotivo=${idMotivo}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }else{
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes-por-motivo?idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}&idMotivo=${idMotivo}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }
  }

  public getMotivosPendencia() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIMOTIVOPENDENCIA}/obter-todos-motivo-pendencias`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getRelatorioAuditoria(statusAtendimento: any, codigoOperadora: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/octet-stream',
    });

    return this.http.get(
      `${APIRELATORIO}/obter-relatorio-auditoria?statusAtendimento=${statusAtendimento}&codigoOperadora=${codigoOperadora}`,
      { headers, observe: 'response', responseType: 'blob' }
    );
  }

  public getUnidadeOperadoras(unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUNIDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getColaboradores() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUSUARIO}/obter-todos`, {
      headers,
      observe: 'response',
    });
  }

  public getContasPendentes(idUnidadeAtendimento: any, usuario: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/octet-stream',
    });

    // console.log(usuario);
    if(usuario != null){
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }else{
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }
  }

  public getContasPorOperadoraEUsuario(idUnidadeAtendimento: any, usuario: any,idUnidadeOperadora:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/octet-stream',
    });


    if(usuario != null){
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}&idUnidadeOperadora=${idUnidadeOperadora}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }else{
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}&idUnidadeOperadora=${idUnidadeOperadora}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }
  }

  public getContasPendentesPorStatus(idUnidadeAtendimento: any, usuario: any,statusContas:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/octet-stream',
    });

    if(usuario != null){
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}&statusConta=${statusContas}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }else{
      return this.http.get(
        `${APIRELATORIO}/contas-pendentes?idUnidadeAtendimento=${idUnidadeAtendimento}&statusConta=${statusContas}`,
        { headers, observe: 'response', responseType: 'blob' }
      );
    }
  }
}
