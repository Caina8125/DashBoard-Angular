/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TelaRelatoriosService } from './tela-relatorios.service';

describe('Service: TelaRelatorios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelaRelatoriosService]
    });
  });

  it('should ...', inject([TelaRelatoriosService], (service: TelaRelatoriosService) => {
    expect(service).toBeTruthy();
  }));
});
