import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

//#region
const APIFILTRO = environment.apiURLFiltro;
const APIUSUARIO = environment.apiURLUsuario;
const APISERVICOBRANCA = environment.apiURLServicoCobranca;
const APICENTROCIRURGICO = environment.apiURLCentroCirurgico;
const APIUNIDADEOPERADORA = environment.apiURLUnidadeOperadora;
//#endregion

@Injectable({
  providedIn: 'root'
})
export class ListaServicosService {

  constructor(private http: HttpClient, private token: TokenService) {}

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
      { idCentroCirurgico: idCentroCirurgico, idStatusCobranca: idStatusCobranca },
      { headers, observe: 'response' }
    );
  }

  public getColaboradores() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUSUARIO}/obter-todos`,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public getCentroCirurgico(idUnidadeAtendimento:any, skip:any, status:any, usuario?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(usuario == null){
      return this.http.get(
        `${APICENTROCIRURGICO}/obter-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}&skip=${skip}&status=${status}`,
        { headers, observe:'response' }
      )
    }else{
      return this.http.get(
        `${APICENTROCIRURGICO}/obter-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}&skip=${skip}&status=${status}&usuario=${usuario}`,
        { headers, observe:'response' }
      )
    }
  }

  public getServicos(idUnidadeAtendimento:any, skip:any, status:any, usuario?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(usuario == null){
      return this.http.get(
        `${APISERVICOBRANCA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}&skip=${skip}&status=${status}`,
        { headers, observe:'response' }
      );
    }else{
      return this.http.get(
        `${APISERVICOBRANCA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}&skip=${skip}&status=${status}&usuario=${usuario}`,
        { headers, observe:'response' }
      );
    }

  }

  public getServicosFiltradosSemData(atendimento?:any, nroConta?:any,paciente?:any,skip?:any, idUnidadeAtendimento?:any,usuario?:any,status?:any,campo?:any, texto?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(atendimento != null){
      campo = 'atendimento';
      texto = atendimento
    }else if(nroConta != null){
      campo = 'conta';
      texto = nroConta;
    }else{
      campo = 'paciente';
      texto = paciente;
    }

    if(usuario != 'geral'){
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe: 'response' }
      );
    }else{
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
  }

  public getServicosFiltradosComData(dataInicio?:any,dataFim?:any, status?:any, idUnidadeAtendimento?:any, skip?:any,usuario?:any,campo?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    campo = 'usuarioporperiodo';

    if(dataFim == null){
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&status=${status}&dataInicio=${dataInicio}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe:'response' }
      )
    }else{
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&status=${status}&dataInicio=${dataInicio}&dataFim=${dataFim}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe:'response' }
      )
    }
  }

  public getCentroCirurgicoFiltradosSemData(atendimento?:any, nroConta?:any,paciente?:any,skip?:any, idUnidadeAtendimento?:any,usuario?:any,status?:any,campo?:any, texto?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(atendimento != null){
      campo = 'atendimento';
      texto = atendimento
    }else if(nroConta != null){
      campo = 'conta';
      texto = nroConta;
    }else{
      campo = 'paciente';
      texto = paciente;
    }

    if(usuario != 'geral'){
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe: 'response' }
      );
    }else{
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
  }

  public getCentroCirurgicoComData(dataInicio?:any,dataFim?:any, status?:any, idUnidadeAtendimento?:any, skip?:any,usuario?:any,campo?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    campo = 'usuarioporperiodo';

    if(dataFim == null){
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&status=${status}&dataInicio=${dataInicio}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe:'response' }
      );
    }else{
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=${campo}&status=${status}&dataInicio=${dataInicio}&dataFim=${dataFim}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe:'response' }
      );
    }
  }

  public getTodasUnidadeOperadoras(idUnidadeAtendimento:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUNIDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe:'response' }
    )
  }

  public getServicosPorOperadora(texto:any, status:any, skip:any, idUnidadeAtendimento:any,usuario?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(usuario == null){
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=operadora&texto=${texto}&status=${status}$skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe:'response' }
      )
    }else{
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=operadora&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe:'response' }
      )
    }
  }

  public getCentroCirurgicoPorOperadora(texto:any, status:any, skip:any,idUnidadeAtendimento:any,usuario?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if(usuario == null){
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=operadora&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
        { headers, observe:'response' }
      )
    }else{
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=operadora&texto=${texto}&status=${status}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}&usuario=${usuario}`,
        { headers, observe:'response' }
      )
    }
  }

}
