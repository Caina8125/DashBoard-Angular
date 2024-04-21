import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APICONTA = environment.apiURLConta;

@Injectable({
  providedIn: 'root'
})
export class ModalInternacaoService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public getInfoContasPorNroConta(nroConta: number, unidadeAtendimento: number) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICONTA}/obter-por-nro-conta/${nroConta}/${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }
}
