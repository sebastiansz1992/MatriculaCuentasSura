import { TestBed } from '@angular/core/testing';

import { MatriculaCuentasService } from './consultar-cuentas.service';

describe('ConsultarCuentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatriculaCuentasService = TestBed.get(MatriculaCuentasService);
    expect(service).toBeTruthy();
  });
});
