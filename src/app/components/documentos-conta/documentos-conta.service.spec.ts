import { TestBed } from '@angular/core/testing';

import { DocumentosContaService } from './documentos-conta.service';

describe('DocumentosContaService', () => {
  let service: DocumentosContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
