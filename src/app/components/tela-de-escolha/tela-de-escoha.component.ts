import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from '../utils/dark-mode.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tela-de-escoha',
  templateUrl: './tela-de-escoha.component.html',
  styleUrls: ['./tela-de-escoha.component.css'],
})
export class TelaDeEscohaComponent {
  constructor(
    private router: Router,
    private token: TokenService,
    private route: ActivatedRoute,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.getDarkModeState().subscribe((modoEscuro) => {
      this.modoEscuroTelaEsolha = modoEscuro;
    })
  }

  //#region variaveis
  public idUsuario: any;
  modoEscuroTelaEsolha = false;
  public unidadeAtendimento: any;
  handIcon = faHandHoldingDollar;
  //#endregion

  ngOnInit() {
    if (!this.token.possuiToken())
      this.router.navigate(['/', 'login']);

      this.route.queryParamMap.subscribe((params) => {
        // console.log(params);
        this.unidadeAtendimento = params.get('unidadeAtendimento');
        this.idUsuario = params.get('idUsuario');
      });

    localStorage.removeItem('dataInicial');
    localStorage.removeItem('dataFinal');
    localStorage.removeItem('acomodacao');
    localStorage.removeItem('operadora');
    localStorage.removeItem('atendimento');
    localStorage.removeItem('pagina');
    localStorage.removeItem('statusConta');
    localStorage.removeItem('conta');
    localStorage.removeItem('localConta');
    localStorage.removeItem('statusValidade');
  }
}
