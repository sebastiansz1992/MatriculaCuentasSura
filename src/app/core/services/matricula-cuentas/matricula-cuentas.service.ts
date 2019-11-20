import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MatriculaCuentasService {
  constructor(private HTTP: HttpClient) {}

  consultarMatriculaCuentasMN(url: string) {
    return this.HTTP.get(url, {responseType: "text"});
  }

  consultarMatriculaCuentas(url: string) {

    return this.HTTP.get(url);

  }

  crearMatriculaCuenta(url: string, params: any, headers: any) {

    return this.HTTP.post(url, JSON.stringify(params));

  }

  actualizarMatriculaCuenta(url: string, id: string) {

    return this.HTTP.get(`${url}/?id=${id}`).pipe(
      map( result => result['listAccounts'])
    );

  }

}
