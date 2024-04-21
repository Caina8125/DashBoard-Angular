import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDeEscohaComponent } from './tela-de-escoha.component';

describe('TelaDeEscohaComponent', () => {
  let component: TelaDeEscohaComponent;
  let fixture: ComponentFixture<TelaDeEscohaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaDeEscohaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaDeEscohaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
