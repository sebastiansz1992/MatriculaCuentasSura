import { TestBed } from '@angular/core/testing';

import { MatriculaCuentasObservableService } from './matricula-cuentas-observable.service';

describe('MatriculaCuentasObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatriculaCuentasObservableService = TestBed.get(MatriculaCuentasObservableService);
    expect(service).toBeTruthy();
  });
});
