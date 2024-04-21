import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';

const APIUSUARIO = environment.apiURLUsuario;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public getColaboradores() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUSUARIO}/obter-todos`, {
      headers,
      observe: 'response',
    });
  }

  public deleteUsuario(id:any){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.delete(
      `${APIUSUARIO}/remover-usuario/${id}`,{
        headers,
        observe: 'response',
      }
    )
  }
}
