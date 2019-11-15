import { Injectable } from '@angular/core';
import * as appConfig from '../../../shared/appConfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarCuentaService {

  constructor( private HTTP: HttpClient ) { }

  actualizarMatriculaCuenta(url: string, id: string) {

    return this.HTTP.get(`${url}/?id=${id}`).pipe(
      map( result => result['listAccounts'])
    );

  }


}
