import { TestBed } from '@angular/core/testing';

import { OperadorasService } from './operadoras.service';

describe('OperadorasService', () => {
  let service: OperadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
