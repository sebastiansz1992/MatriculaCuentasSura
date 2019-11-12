import { TestBed } from '@angular/core/testing';

import { EliminarCuentaService } from './eliminar-cuenta.service';

describe('EliminarCuentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarCuentaService = TestBed.get(EliminarCuentaService);
    expect(service).toBeTruthy();
  });
});
