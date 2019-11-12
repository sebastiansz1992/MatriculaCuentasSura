import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrearCuentaService {

  constructor(
    private HTTP: HttpClient

    ) { }

  crearMatriculaCuenta(/*url: string, params: object, options: object*/) {

    return this.HTTP.post('https://0i4q4gcam9.execute-api.us-east-1.amazonaws.com/MatriculaCuentas/matricula-de-cuentas/crear-cuenta', {params: {
      title: 'foo',
      body: 'bar',
      userId: 1
    }});

  }
}
