import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInternacaoComponent } from './lista-internacao.component';

describe('HomeComponent', () => {
  let component: ListaInternacaoComponent;
  let fixture: ComponentFixture<ListaInternacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInternacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInternacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
