import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosCtiComponent } from './servicos-cti.component';

describe('ServicosCtiComponent', () => {
  let component: ServicosCtiComponent;
  let fixture: ComponentFixture<ServicosCtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosCtiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosCtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
