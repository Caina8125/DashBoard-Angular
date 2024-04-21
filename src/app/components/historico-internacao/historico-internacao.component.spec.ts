import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoInternacaoComponent } from './historico-internacao.component';

describe('HistoricoInternacaoComponent', () => {
  let component: HistoricoInternacaoComponent;
  let fixture: ComponentFixture<HistoricoInternacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoInternacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoInternacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
