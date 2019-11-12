import { TestBed } from '@angular/core/testing';

import { CrearCuentaService } from './crear-cuenta.service';

describe('CrearCuentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearCuentaService = TestBed.get(CrearCuentaService);
    expect(service).toBeTruthy();
  });
});
