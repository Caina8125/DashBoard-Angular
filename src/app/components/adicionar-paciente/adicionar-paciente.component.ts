import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ListaInternacaoService } from '../lista-internacao/lista-internacao.service';

@Component({
  selector: 'app-adicionar-paciente',
  templateUrl: './adicionar-paciente.component.html',
  styleUrls: ['./adicionar-paciente.component.css']
})
export class AdicionarPacienteComponent {
  constructor(private homeService:ListaInternacaoService, private router: Router){}

  contratadoId = 33619584

  @Input() leito = '';
  @Input() convenio = '';
  @Input() atendimento = '';
  @Input() nomePaciente = '';
  @Input() dataInternacao = '';
  @Input() statusPaciente = null;

  public adicionarPaciente(){
    this.homeService
      .postAtendimento(this.atendimento,this.leito,this.nomePaciente,this.convenio,this.statusPaciente,this.contratadoId)
      .subscribe({
        next:() => {
          this.router.navigate(['/cti/home'])
        }
      })
  }

  Status = [
      { id:1, nome:'Internados' },
      { id:2, nome:'Alta' },
      { id:3, nome:'Não Localizados' },
  ]
}
