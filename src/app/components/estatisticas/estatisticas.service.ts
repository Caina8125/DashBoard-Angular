import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APIUSUARIO = environment.apiURLUsuario;
const APIESTATISTICA = environment.apiURLEstatistica;
const APIRELATORIOS = environment.apiURLRelatorio;
const APIUNIDADEOPERADORA = environment.apiURLUnidadeOperadora;

@Injectable({
  providedIn: 'root',
})
export class EstatisticasService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public getQuantidadesContas(idUnidadeAtendimento:any, idUnidadeOperadora?: any, usuario?: any, statusConta?:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    // SEM PARAMETROS
    if(idUnidadeOperadora == null && usuario == null && statusConta == null)
    {
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    //COM OPERADORA
    else if(idUnidadeOperadora != null && usuario == null && statusConta == null){
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?idUnidadeOperadora=${idUnidadeOperadora}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    //COM USUARIO
    else if(idUnidadeOperadora == null && usuario != null && statusConta == null){
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?usuario=${usuario}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    //COM STATUS CONTA
    else if(idUnidadeOperadora == null && usuario == null && statusConta != null){
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?idStatusConta=${statusConta}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    //COM OPERADORA E USUARIO
    else if(idUnidadeOperadora != null && usuario != null && statusConta == null){
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?idUnidadeOperadora=${idUnidadeOperadora}&idStatusConta=${statusConta}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    //COM USUARIO E STATUS CONTA
    else if(idUnidadeOperadora == null && usuario != null && statusConta != null){
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?usuario=${usuario}&idStatusConta=${statusConta}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    //COM STATUS CONTA E OPERADORA
    else if(idUnidadeOperadora != null && usuario == null && statusConta != null){
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?idUnidadeOperadora=${idUnidadeOperadora}&idStatusConta=${statusConta}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
    else{
      return this.http.get(
        `${APIESTATISTICA}/obter-produtividade-conta?idUnidadeOperadora=${idUnidadeOperadora}&usuario=${usuario}&idStatusConta=${statusConta}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
  }

  public getQuantidadeInternaçao(idUnidadeAtendimento:any, idUnidadeOperadora?:any, usuario?:any, evolucao?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    // SEM PARAMETROS
    if(idUnidadeOperadora == null && usuario == null && evolucao == null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    //SÓ COM OPERADORA
    else if(idUnidadeOperadora != null && usuario == null && evolucao == null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?idUnidadeOperadora=${idUnidadeOperadora}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    // SÓ COM USUARIO
    else if(idUnidadeOperadora == null && usuario != null && evolucao == null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?usuario=${usuario}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    // SÓ COM EVOLUÇÃO
    else if(idUnidadeOperadora == null && usuario == null && evolucao != null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?idEvolucao=${evolucao}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    //COM OPERADORA E USUARIO
    else if(idUnidadeOperadora != null && usuario != null && evolucao == null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?idUnidadeOperadora=${idUnidadeOperadora}&usuario=${usuario}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    //COM USUARIO E EVOLUCAO
    else if(idUnidadeOperadora == null && usuario != null && evolucao != null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?usuario=${usuario}&idEvolucao=${evolucao}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    //COM OPERADORA E EVOLUCAO
    else if(idUnidadeOperadora != null && usuario == null && evolucao != null)
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?idUnidadeOperadora=${idUnidadeOperadora}&idEvolucao=${evolucao}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }
    else
    {
      return this.http.get(`${APIESTATISTICA}/obter-produtividade-internacao?idUnidadeOperadora=${idUnidadeOperadora}&usuario=${usuario}&idEvolucao=${evolucao}&idUnidadeAtendimento=${idUnidadeAtendimento}`, {
        headers,
        observe: 'response',
      })
    }

  }

  public getColaboradores() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUSUARIO}/obter-todos`, {
      headers,
      observe: 'response',
    });
  }

  public getOperadoras(){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUNIDADEOPERADORA}/obter-todos`, {
      headers,
      observe: 'response',
    })
  }
}
