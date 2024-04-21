import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosContaComponent } from './documentos-conta.component';

describe('DocumentosContaComponent', () => {
  let component: DocumentosContaComponent;
  let fixture: ComponentFixture<DocumentosContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosContaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
