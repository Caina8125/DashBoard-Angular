import { TestBed } from '@angular/core/testing';

import { ServicosHospitaisService } from './servicos-hospitais.service';

describe('ServicosHospitaisService', () => {
  let service: ServicosHospitaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosHospitaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
