import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaCtiComponent } from './criar-conta-cti.component';

describe('CriarContaCtiComponent', () => {
  let component: CriarContaCtiComponent;
  let fixture: ComponentFixture<CriarContaCtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarContaCtiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContaCtiComponent);
    component = fixture.componentInstance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
