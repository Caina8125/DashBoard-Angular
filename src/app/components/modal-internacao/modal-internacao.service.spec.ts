import { TestBed } from '@angular/core/testing';

import { ModalInternacaoService } from './modal-internacao.service';

describe('ModalInternacaoService', () => {
  let service: ModalInternacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalInternacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
