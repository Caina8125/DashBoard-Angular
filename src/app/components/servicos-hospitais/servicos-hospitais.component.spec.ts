import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosHospitaisComponent } from './servicos-hospitais.component';

describe('ServicosHospitaisComponent', () => {
  let component: ServicosHospitaisComponent;
  let fixture: ComponentFixture<ServicosHospitaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosHospitaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosHospitaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
