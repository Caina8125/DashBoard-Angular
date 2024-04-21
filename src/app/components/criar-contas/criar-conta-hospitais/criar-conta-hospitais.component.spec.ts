import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaHospitaisComponent } from './criar-conta-hospitais.component';

describe('CriarContaHospitaisComponent', () => {
  let component: CriarContaHospitaisComponent;
  let fixture: ComponentFixture<CriarContaHospitaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarContaHospitaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContaHospitaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
