import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Cuenta } from "../../models/cuenta";

@Injectable({
  providedIn: "root"
})
export class MatriculaCuentasService {

  constructor(private HTTP: HttpClient) {}

  postQuery(url: string, params: object) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const options = { headers };

    return this.HTTP.post(url, JSON.stringify(params), options);

  }

  consultarMatriculaCuentasMN(url: string, params: object) {
    return this.postQuery(url, params).pipe(
      map(data => data["data"]["infoAccounts"]["listAccounts"])
    );
  }

  crearMatriculaCuenta(url: string, params: any, headers: any) {

    return this.HTTP.post(url, JSON.stringify(params));

  }

}
