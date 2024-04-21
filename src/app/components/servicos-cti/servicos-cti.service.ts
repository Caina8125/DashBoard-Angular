import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';
import { ServicoCobranca } from 'src/app/interfaces/ServicoCobranca';

const APISERVICO = environment.apiURLServicos;
const APICOBRANCA = environment.apiURLCobranca;
const APISERVICOBRANCA = environment.apiURLServicoCobranca;
const APIPROFISSIONALSAUDE = environment.apiURLProfissionalSaude;

@Injectable({
  providedIn: 'root',
})
export class ServicosCtiService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public postPlantoesCTI(servicos: ServicoCobranca[]) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(
      `${APISERVICOBRANCA}/adicionar-servico-cobranca`,
      servicos,
      { headers, observe: 'response' }
    );
  }

  public postCobranca(idConta: any) {
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

  public getProfissionalSaude(crm: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${APIPROFISSIONALSAUDE}/obter-por-codigo/${crm}`, {
      headers,
      observe: 'response',
    });
  }

  public getServicoPorConta(ativo: any, idCobranca: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICOBRANCA}/obter-ativos-e-inativos?ativo=${ativo}&idCobranca=${idCobranca}`,
      {
        headers,
        observe: 'response',
      }
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

  public getExamesCTI(idUnidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APISERVICO}/obter-todos?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }
}
