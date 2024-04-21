import { TestBed } from '@angular/core/testing';

import { CriarContasService } from './criar-contas.service';

describe('CriarContasService', () => {
  let service: CriarContasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarContasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
