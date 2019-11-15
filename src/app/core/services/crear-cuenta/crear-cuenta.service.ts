import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrearCuentaService {

  constructor(
    private HTTP: HttpClient

    ) { }

  crearMatriculaCuenta(url: string, params: any, headers: any) {

    return this.HTTP.post(url, JSON.stringify(params));

  }
}
