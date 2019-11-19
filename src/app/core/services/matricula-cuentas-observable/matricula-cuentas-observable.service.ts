import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaCuentasObservableService {

  cuenta: any;
  private cuentaSource = new BehaviorSubject<any>(this.cuenta);
  cuentaUsuario = this.cuentaSource.asObservable();

  constructor() { }

  actualizarMatriculaCuentas(cuentaUsuario: any) {
    this.cuentaSource.next(cuentaUsuario);
  }

}
