import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultarCuentasService {

  constructor(
    private HTTP: HttpClient
    ) { }

  consultarMatriculaCuentas(url: string) {

    return this.HTTP.get(url);

  }

}
