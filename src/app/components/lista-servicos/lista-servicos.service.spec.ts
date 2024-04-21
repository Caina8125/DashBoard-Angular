import { TestBed } from '@angular/core/testing';

import { ListaServicosService } from './lista-servicos.service';

describe('ListaServicosService', () => {
  let service: ListaServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
