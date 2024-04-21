import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css'],
})
export class TelaAdminComponent implements OnInit {
  constructor(private location: Location) {}

  //#region variaveis
  admin:any;
  usuario:any;
  operadora:any;
  //#endregion

  ngOnInit(): void {
    if (this.location.path() == '/admin-menu') {
      this.admin = true;
      this.usuario = false;
      this.operadora = false;
    }
  }

  usuarios(){
    this.usuario = true;
    this.admin = false;
    this.operadora = false;
  }

  operadoras(){
    this.operadora = true;
    this.usuario = false;
    this.admin = false;
  }

  @HostListener('document: keydown', ['$event'])
  voltarComEsc(event: KeyboardEvent) {
    if (event.code === 'Escape') this.ngOnInit();
  }
}
