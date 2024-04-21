import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token/token.service';

@Component({
  selector: 'app-criar-contas',
  templateUrl: './criar-contas.component.html',
  styleUrls: ['./criar-contas.component.css'],
})
export class CriarContasComponent implements OnInit {
  public dadosConta: any;
  public unidadeAtendimento: any;

  constructor(
    private token: TokenService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    if (!this.token.possuiToken()) this.router.navigate(['/', 'login']);

    this.route.queryParamMap.subscribe((params) => {
      const unidadeAtendimento = params.get('unidadeAtendimento') || '';
      this.unidadeAtendimento = parseInt(unidadeAtendimento);
      this.dadosConta = {
        nroConta: params.get('nroConta'),
        idUsuario: params.get('idUsuario'),
        idInternacao: params.get('idInternacao'),
        unidadeAtendimento: this.unidadeAtendimento,
      }
    });
  }
}
