import { RelatoriosService } from './relatorios.service';
import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent implements OnInit {

  //#region variaveis
  internacao: any;
  dados: any = [];
  listaContas: any = [];
  selectedItems: any = [];
  idsSelecionados: any = [];
  dropdownSettings: IDropdownSettings = {};

  @Input() usuario: any;
  @Input() idUnidadeAtendimento: any;
  //#endregion

  constructor(private service: RelatoriosService) {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'numeroConta',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'Limpar',
      noDataAvailablePlaceholderText:'Não foram encontradas contas',
      itemsShowLimit: 10,
      defaultOpen:true,
      allowRemoteDataSearch:true
    };
  }

  onFilterTextChange(change:any){
    this.service
      .getContas(change)
      .subscribe((data:any)=>{
        this.listaContas = data.body;
      });
  }

  gerarRelatorio(){
    this.selectedItems.forEach((element:any) => {
      this.idsSelecionados.push(element.id)
      // console.log(this.idsSelecionados);
    });

    this.service
      .getChecklist(this.idsSelecionados)
      .subscribe((data:any)=>{
        this.renderDownload(data.body,'relatorio.xlsx')
        this.idsSelecionados = [];
      })
  }

  renderDownload(data: any, fileName: string){
    let type = data.type;
    const downloadedFile = new Blob([data as BlobPart], { type: type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
}
