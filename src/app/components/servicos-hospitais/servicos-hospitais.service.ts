import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';
import { ServicoCobranca } from 'src/app/interfaces/ServicoCobranca';

const APISERVICO = environment.apiURLServicos;
const APISERVICOBRANCA = environment.apiURLServicoCobranca;

@Injectable({
  providedIn: 'root'
})
export class ServicosHospitaisService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public postServicoCobranca(servicoCobrancas: Array<ServicoCobranca>) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(
      `${APISERVICOBRANCA}/adicionar-servico-cobranca`,
        servicoCobrancas,
      { headers, observe: 'response' }
    );
  }

  public getPlantoesDaConta(ativo: any, cobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOBRANCA}/obter-ativos-e-inativos?ativo=${ativo}&idCobranca=${cobranca}&plantao=0`,
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

  public getServicosPorUnidade(unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICO}/obter-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }
}
