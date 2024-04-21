import { TestBed } from '@angular/core/testing';

import { MotivoPendenciaService } from './motivo-pendencia.service';

describe('MotivoPendenciaService', () => {
  let service: MotivoPendenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivoPendenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
