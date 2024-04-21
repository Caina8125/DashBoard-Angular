import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharContasComponent } from './fechar-contas.component';

describe('FecharContasComponent', () => {
  let component: FecharContasComponent;
  let fixture: ComponentFixture<FecharContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FecharContasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FecharContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
