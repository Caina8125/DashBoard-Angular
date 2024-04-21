import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APICONTA = environment.apiURLConta;
const APICONTAPENDENCIA = environment.apiURLContaPendencia;
const APIMOTIVOPENDENCIA = environment.apiURLMotivoPendencia;

@Injectable({
  providedIn: 'root'
})
export class MotivoPendenciaService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public postMotivo(idMotivoPendencia: any,idConta: any,pendente: any,dataPendencia?: any,nomeProfissional?: any) {
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

  public putObservacaoPendencia(idConta: any, observacao: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APICONTA}/adicionar-observacao-pendencia?idConta=${idConta}&observacaoPendencia=${observacao}`,
      { idConta: idConta, observacao: observacao },
      { headers, observe: 'response' }
    );
  }

  public putMotivoPendencia(id: any,idMotivoPendencia: any,idConta: any,pendente: any,dataPendencia: any,nomeProfissional: any,profissionalResponsavel: any) {
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

  public getTodosMotivosPendencia() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIMOTIVOPENDENCIA}/obter-todos-motivo-pendencias`,
      { headers, observe: 'response' }
    );
  }

  public getContaPendencia(nroConta: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APICONTAPENDENCIA}/obter-por-conta/${nroConta}`, {
      headers,
      observe: 'response',
    });
  }

  public getObservacaoPendecia(idConta: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APICONTA}/obter-observacao-pendencia/${idConta}`, {
      headers,
      observe: 'response',
    });
  }
}
