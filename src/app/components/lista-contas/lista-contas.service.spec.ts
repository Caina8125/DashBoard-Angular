import { TestBed } from '@angular/core/testing';

import { ListaContasService } from './lista-contas.service';

describe('ListaContasService', () => {
  let service: ListaContasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaContasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
