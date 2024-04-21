import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroOperadoraComponent } from './cadastro-operadora.component';

describe('CadastroOperadoraComponent', () => {
  let component: CadastroOperadoraComponent;
  let fixture: ComponentFixture<CadastroOperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroOperadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroOperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
