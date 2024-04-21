import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = environment.apiURLLogin;

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(private httpClient: HttpClient) {}

  autenticar(usuario: any, senha: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(
      `${API}/Auth`,
      { Usuario: usuario, Senha: senha },
      { headers, observe: 'response' }
    );
  }
}
