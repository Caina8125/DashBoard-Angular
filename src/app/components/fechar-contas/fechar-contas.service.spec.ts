import { TestBed } from '@angular/core/testing';

import { FecharContasService } from './fechar-contas.service';

describe('FecharContasService', () => {
  let service: FecharContasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FecharContasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
