import { TestBed } from '@angular/core/testing';

import { HistoricoInternacaoService } from './historico-internacao.service';

describe('HistoricoInternacaoService', () => {
  let service: HistoricoInternacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoInternacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
