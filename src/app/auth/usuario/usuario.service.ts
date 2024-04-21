import jwt_decode from 'jwt-decode';
import { Usuario } from './usuario';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});
  private user!: Usuario;

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    this.user = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(this.user);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
