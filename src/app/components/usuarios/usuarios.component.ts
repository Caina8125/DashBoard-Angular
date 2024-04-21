import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  constructor(private service: UsuariosService) {}

  usuario: any;
  Usuarios: any = [];

  ngOnInit(): void {
    this.obterColaboradores();
  }

  obterColaboradores() {
    this.service.getColaboradores().subscribe((data: any) => {
      this.Usuarios = data.body;
    });
  }

  removerUsuario() {
    Swal.fire({
      text: "Tem certeza que deseja apagar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUsuario(this.usuario).subscribe({
          next: (data: any) => {
            Swal.fire('', 'Usuário removido com sucesso', 'success');
            this.obterColaboradores();
          },
          error: (err: any) => {
            Swal.fire('', 'Usuário não encontrado', 'error');
          },
        });
      }
    });
  }
}
