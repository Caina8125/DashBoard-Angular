import { TestBed } from '@angular/core/testing';

import { ServicosCtiService } from './servicos-cti.service';

describe('ServicosCtiService', () => {
  let service: ServicosCtiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosCtiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
