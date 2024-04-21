import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

//#region
const APITABELA = environment.apiURLTabela;
const APIOPERADORA = environment.apiURLOperadora;
const APITABELAOPERADORA = environment.apiURLTabelaOperadora
const APIUNIDADEOPERADORA = environment.apiURLUnidadeOperadora;
//#endregion

@Injectable({
  providedIn: 'root',
})
export class CadastroOperadoraService {
  constructor(private http: HttpClient, private token: TokenService) {}

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

  public postTabelaOperadora(idUnidadeOperadora:number, idTabela:number){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(
      `${APITABELAOPERADORA}/adicionar-tabela-operadora`,
      {
        idUnidadeOperadora: idUnidadeOperadora,
        idTabela: idTabela,
        ativo: 1
      },
      { headers, observe: 'response' }
    );
  }

  public putUnidadeOperadora(id:any,idUnidadeAtendimento:any,idOperadora:any,codigoExterno:any,codigoInterno:any,apelido:any,viaCobranca?:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APIUNIDADEOPERADORA}/atualizar-unidade-operadora`,
      {
        id:id,
        idUnidadeAtendimento:idUnidadeAtendimento,
        idOperadora:idOperadora,
        idLocalConta:viaCobranca,
        codigoExterno:codigoExterno,
        codigoInterno:codigoInterno,
        apelido:apelido
      },
      { headers, observe: 'response' }
    )
  }

  public putTabelaOperadora(id:any, idUnidadeOperadora:any,idTabela:any, ativo:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APITABELAOPERADORA}/editar-tabela-operadora`,
      {
        id:id,
        idUnidadeOperadora:idUnidadeOperadora,
        idTabela:idTabela,
        ativo:ativo
      },
      { headers, observe: 'response' }
    )
  }

  public getOperadoras() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIOPERADORA}/obter-todas-operadora`, {
      headers,
      observe: 'response',
    });
  }

  public getUnidadeOperadoras(unidadeAtendimento:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUNIDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      { headers, observe:'response' }
    )
  }

  public getTabelas(){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APITABELA}/obter-todos`,
      { headers, observe:'response' }
    )
  }

  public getTabelaPorOperadora(idUnidadeOperadora:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APITABELAOPERADORA}/obter-tabela-por-unidade-operadora/${idUnidadeOperadora}`,
      { headers, observe:'response' }
    )
  }
}
