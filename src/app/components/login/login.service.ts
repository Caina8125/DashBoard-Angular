import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

//#region
const APILOGIN = environment.apiURLLogin;
const APIUSUARIO = environment.apiURLUsuario;
const APILOCALATENDIMENTO = environment.apiURLLocalAtendimento;
//#endregion

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public postUsuario(nome: any, funcionario:any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APIUSUARIO}/adicionar-usuario`,
      { nome: nome, funcionario: funcionario },
      { headers, observe: 'response' }
    );
  }

  public postFuncionario(nome:string){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APILOGIN}/obter-funcionario?userName=${nome}`,
      { headers, observe:'response' }
    )
  }

  public getLocalAtendimento(id:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APILOCALATENDIMENTO}/obter-por-id-usuario/${id}`,
      { headers, observe:'response' }
    )
  }

}
