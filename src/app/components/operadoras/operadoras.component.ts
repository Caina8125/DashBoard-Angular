import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { OperadorasService } from './operadoras.service';

@Component({
  selector: 'app-operadoras',
  templateUrl: './operadoras.component.html',
  styleUrls: ['./operadoras.component.css']
})
export class OperadorasComponent {
  constructor(private service: OperadorasService) {}

  //#region variaveis
  nome: any;
  apelido: any;
  usuario: any;
  validade: any;
  idTipoEnvio: any;
  operadoras: any = [];
  //#endregion

  ngOnInit(): void {
    this.obterOperadoras();
  }

  obterOperadoras() {
    this.service.getOperadoras().subscribe((data: any) => {
      // console.log(data.body);
      this.operadoras = data.body;
    });
  }

  removerUsuario() {
    Swal.fire({
      text: "Tem certeza que deseja apagar essa operadora?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      // console.log(result);
      // if (result.isConfirmed) {
        // this.service.deleteOperadoras(this.usuario).subscribe({
        //   next: (data: any) => {
        //     Swal.fire('', 'Usuário removido com sucesso', 'success');
        //     this.obterOperadoras();
        //   },
        //   error: (err: any) => {
        //     Swal.fire('', 'Usuário não encontrado', 'error');
        //   },
        // });
      // }
    });
  }

  adicionarOperadora(){
    this.service
      .postOperadora(this.nome,this.validade,this.idTipoEnvio,this.apelido)
      .subscribe((data:any)=>{
        Swal.fire('','Operadora criada com sucesso', 'success');
      })
  }

  tipoEnvio = [
    { id:1,nome:'Digital' },
    { id:2,nome:'Físico' }
  ];
}
