import Swal from 'sweetalert2';
import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FecharContasService } from './fechar-contas.service';

@Component({
  selector: 'app-fechar-contas',
  templateUrl: './fechar-contas.component.html',
  styleUrls: ['./fechar-contas.component.css']
})
export class FecharContasComponent implements OnInit {

  //#region variaveis
  internacao: any;
  @Input() usuario: any;
  listaContas: any = [];
  selectedItems: any = [];
  idsSelecionados: any = [];
  @Input() idUnidadeAtendimento: any;
  dropdownSettings: IDropdownSettings = {};
  //#endregion

  constructor(private service:FecharContasService){}

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'numeroConta',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'Limpar',
      noDataAvailablePlaceholderText:'Não foram encontradas contas',
      itemsShowLimit: 20,
      defaultOpen:true,
      allowRemoteDataSearch:true
    };
  }

  fecharContas(){
    this.selectedItems.forEach((element:any) => {
      this.idsSelecionados.push(element.id)
    });

    this.service
      .putStatusContas(this.idsSelecionados)
      .subscribe({
        next:()=>{
          Swal.fire('', 'Status das contas alterado', 'success');
        },
        error:()=>{
          Swal.fire('','Não foi possível alterar o status das contas', 'error')
        }
      })
  }

  onFilterTextChange(change:any){
    this.service
      .getContas(change)
      .subscribe((data:any)=>{
        this.listaContas = data.body;
      });
  }
}
