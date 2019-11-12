import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PruebaCuentasBancarias } from '../../models/matriculaCuentas';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultarCuentasService {

  constructor(
    private HTTP: HttpClient
    ) { }

  consultarMatriculaCuentas(url: string): Observable<PruebaCuentasBancarias[]> {
    return this.HTTP.get<PruebaCuentasBancarias[]>(url);
  }

}
