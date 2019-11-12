import { TestBed } from '@angular/core/testing';

import { ActualizarCuentaService } from './actualizar-cuenta.service';

describe('ActualizarCuentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualizarCuentaService = TestBed.get(ActualizarCuentaService);
    expect(service).toBeTruthy();
  });
});
