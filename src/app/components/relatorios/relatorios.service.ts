import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APICONTA = environment.apiURLConta;
const APICHECKLIST = environment.apiURLChecklist;

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public getChecklist(ids:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`,Accept:'application/octet-stream', });

    return this.http.get(
      `${APICHECKLIST}/preencher-checklist-santa-lucia?idsContas=${ids}`,
      { headers, observe: 'response', responseType: 'blob' }
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
