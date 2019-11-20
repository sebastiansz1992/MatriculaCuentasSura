import { TestBed } from '@angular/core/testing';

import { MatriculaCuentasService } from './matricula-cuentas.service';

describe('MatriculaCuentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatriculaCuentasService = TestBed.get(MatriculaCuentasService);
    expect(service).toBeTruthy();
  });
});
