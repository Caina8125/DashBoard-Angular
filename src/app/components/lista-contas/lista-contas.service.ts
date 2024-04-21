import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

//#region
const APIFILTRO = environment.apiURLFiltro;
const APIUSUARIO = environment.apiURLUsuario;
const APIUNIDDADEOPERADORA = environment.apiURLUnidadeOperadora;
//#endregion

@Injectable({
  providedIn: 'root',
})
export class ListaContasService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public getColaboradores() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUSUARIO}/obter-todos`, {
      headers,
      observe: 'response',
    });
  }

  public getUnidadeOperadoraPorUnidade(unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUNIDDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getFiltroContas(idUnidadeAtendimento?: any,nroRegistroAtendimento?: any,nroConta?: any,idevolucao?:any,paciente?: any,dataInicial?: any,dataFinal?: any,idUsuario?: any,idUnidadeOperadora?: any,idLocalConta?: any,idStatusConta?: any,idStatusValidade?:any, pagina?:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    // console.log(nroConta);
    if(nroConta != 0){
      return this.http.get(
        `${APIFILTRO}/filtro-conta?IdUnidadeAtendimento=${idUnidadeAtendimento}&NroRegistroAtendimento=${nroRegistroAtendimento}&NumeroConta=${nroConta}&IdStatusConta=0&Skip=${pagina}`,
        { headers, observe: 'response' }
      );
    }else{
      if(paciente == null){
        return this.http.get(
          `${APIFILTRO}/filtro-conta?IdUnidadeAtendimento=${idUnidadeAtendimento}&NroRegistroAtendimento=${nroRegistroAtendimento}&NumeroConta=${nroConta}&IdEvolucao=${idevolucao}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusValidade=${idStatusValidade}&IdLocalConta=${idLocalConta}&IdStatusConta=${idStatusConta}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      }else{
        return this.http.get(
          `${APIFILTRO}/filtro-conta?IdUnidadeAtendimento=${idUnidadeAtendimento}&NroRegistroAtendimento=${nroRegistroAtendimento}&NumeroConta=${nroConta}&IdEvolucao=${idevolucao}&Paciente=${paciente}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusValidade=${idStatusValidade}&IdLocalConta=${idLocalConta}&IdStatusConta=${idStatusConta}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      }
    }
  }
}
