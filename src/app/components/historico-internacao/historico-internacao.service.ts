import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APIAUDITORIA = environment.apiURLAuditoria;

@Injectable({
  providedIn: 'root'
})
export class HistoricoInternacaoService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public getAuditoria(id:any, idUnidadeAtendimento:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIAUDITORIA}/auditoria-por-registro/${id}?idUnidadeAtendimento=${idUnidadeAtendimento}`, { headers, observe:'response' })
  }
}
