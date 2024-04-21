import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APIOPERADORA = environment.apiURLOperadora;

@Injectable({
  providedIn: 'root',
})
export class OperadorasService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public deleteOperadoras(operadora: any) {}

  public postOperadora(nome: any, validade: any, idTipoEnvio: any, apelido: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APIOPERADORA}/adicionar-operadora`,
      {
        nome: nome,
        validade: validade,
        idTipoEnvio: idTipoEnvio,
        apelido: apelido,
      },
      { headers, observe: 'response' }
    );
  }

  public getOperadoras() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIOPERADORA}/obter-todas-operadora`, {
      headers,
      observe: 'response',
    });
  }
}
