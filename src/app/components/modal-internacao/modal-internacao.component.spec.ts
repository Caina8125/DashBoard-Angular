import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInternacaoComponent } from './modal-internacao.component';

describe('ModalInternacaoComponent', () => {
  let component: ModalInternacaoComponent;
  let fixture: ComponentFixture<ModalInternacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInternacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInternacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
