import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoPendenciaComponent } from './motivo-pendencia.component';

describe('MotivoPendenciaComponent', () => {
  let component: MotivoPendenciaComponent;
  let fixture: ComponentFixture<MotivoPendenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoPendenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoPendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
