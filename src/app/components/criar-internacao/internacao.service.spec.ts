import { TestBed } from '@angular/core/testing';

import { InternacaoService } from './internacao.service';

describe('ContaService', () => {
  let service: InternacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
