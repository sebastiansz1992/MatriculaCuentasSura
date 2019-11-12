import { Injectable } from '@angular/core';
import { PruebaCuentasBancarias } from '../../models/matriculaCuentas';
import * as appConfig from '../../../shared/appConfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActualizarCuentaService {

  constructor( private HTTP: HttpClient ) { }

  actualizarMatriculaCuenta(url: string, id: string) {
    return this.HTTP.get<PruebaCuentasBancarias[]>(`${url}/?id=${id}`);
  }


}
