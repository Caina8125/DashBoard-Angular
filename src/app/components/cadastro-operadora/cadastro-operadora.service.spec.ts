/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CadastroOperadoraService } from './cadastro-operadora.service';

describe('Service: CadastroOperadora', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroOperadoraService]
    });
  });

  it('should ...', inject([CadastroOperadoraService], (service: CadastroOperadoraService) => {
    expect(service).toBeTruthy();
  }));
});
