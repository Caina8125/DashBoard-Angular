import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APICONTA = environment.apiURLConta;

@Injectable({
  providedIn: 'root'
})
export class FecharContasService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public putStatusContas(ids:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});

    return this.http.put(
      `${APICONTA}/atualizar-status-conta?idsContas=${ids}`,
      { idsContas:ids },
      { headers, observe: 'response' }
    )
  }

  public getContas(nroRegistro:any,){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APICONTA}/obter-contas-por-nroregistro?nroRegistro=${nroRegistro}`,
      { headers, observe: 'response' }
    )
  }
}
