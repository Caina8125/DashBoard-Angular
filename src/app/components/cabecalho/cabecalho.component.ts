import { Component } from '@angular/core';
import { CabecalhoService } from './cabecalho.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from '../utils/dark-mode.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {
  //#region variaveis
  idUsuario: any;
  dataLog !: string;
  modoEscuro = false;
  pessoaLog !: string;
  unidadeAtendimento: any;
  public label = environment.label;
  //#endregion

  constructor(
    public router: Router,
    private token: TokenService,
    public route: ActivatedRoute,
    public service: CabecalhoService,
    private darkModeService: DarkModeService,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.idUsuario = params.get('idUsuario');
      this.unidadeAtendimento = params.get('unidadeAtendimento');
    });
  }

  logout() {
    this.token.excluiToken();
    // localStorage.removeItem('unidadeAtendimento');
    this.router.navigate(['/', 'login']);
  }

  changeTheme(){
    this.modoEscuro = !this.modoEscuro;
    this.darkModeService.toggleDarkMode();
  }
}
