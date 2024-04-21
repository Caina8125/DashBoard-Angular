import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { UsuarioService } from 'src/app/auth/usuario/usuario.service';
import { AutenticacaoService } from 'src/app/auth/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private service: LoginService,
    private usuarioService: UsuarioService,
    private authService: AutenticacaoService
  ) {}

  //#region variaveis
  public rota: any;
  public body: any;
  public unidades: any;
  public admin = false;
  public senha!: string;
  public usuario!: string;
  public unidade!: string;
  public idUsuario!: number;
  public autenticado = false;
  public funcionario!: Boolean;
  //#endregion

  ngOnInit(): void {
    this.rota = this.location.path();
  }

  login() {
    this.authService.autenticar(this.usuario, this.senha).subscribe({
      next: (data: any) => {
        const authToken = data.body.AccessToken ?? '';
        this.usuarioService.salvaToken(authToken);
        this.rota = this.location.path();
        if (this.rota == '/admin') {
          data.body.UsuarioToken.Claims.forEach((element: any) => {
            if (element.Value == 'Administrador') {
              this.admin = true;
            }
          });
          if (this.admin == true) {
            this.router.navigate(['admin-menu']);
          } else {
            Swal.fire('', 'Você não tem as devidas permissões', 'error');
          }
        } else {
          const idPessoa = data.body.PessoaId;
          this.service
            .getLocalAtendimento(idPessoa)
            .subscribe({
              next:(data:any) => {
                this.autenticado = true;
                this.unidades = data.body;
              }
            })
          //Verifica se é funcionario ou não
          if (this.funcionario) {
            this.service.postUsuario(this.usuario, 1).subscribe((data: any) => {
              this.idUsuario = data.body.id;
              this.autenticado = true;
            });
          } else {
            this.service.postUsuario(this.usuario, 2).subscribe((data: any) => {
              this.idUsuario = data.body.id;
              this.autenticado = true;
            });
          }
        }
      },
      error: () => {
        Swal.fire('', 'Usuário ou senha incorretos', 'error');
      },
      complete:()=> {
        //Faz o post de funcionario na nossa api
        this.service.postFuncionario(this.usuario).subscribe({
          next: (data: any) => {
            // console.log(data);
            this.funcionario = data;
            this.autenticado = true;
          },
        });
      },
    });
  }

  //Vai pra tela de escolha
  navegar() {
    this.router.navigate(['tela-de-escolha'], {
      queryParams: {
        unidadeAtendimento: this.unidade,
        idUsuario: this.idUsuario,
      },
    });
    if (environment.label != '') {
      Swal.fire(
        '',
        'Atenção você está em um ambiente de homologação',
        'warning'
      );
    }
  }

  verificaRota() {
    if (this.rota == '/admin' ||this.rota == '/login-admin') {
      return true;
    } else {
      return false;
    }
  }
}
