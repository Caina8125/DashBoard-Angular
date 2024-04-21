import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContasComponent } from './criar-contas.component';

describe('CriarContasComponent', () => {
  let component: CriarContasComponent;
  let fixture: ComponentFixture<CriarContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarContasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
