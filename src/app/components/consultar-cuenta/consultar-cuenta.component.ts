import { Component, OnInit, OnDestroy } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Cuenta } from "../../core/models/cuenta";
import * as appConfig from "../../shared/appConfig";
import { Subscription } from "rxjs";
import { MatriculaCuentasObservableService } from "../../core/services/matricula-cuentas-observable/matricula-cuentas-observable.service";
import { Router } from "@angular/router";
import { MatriculaCuentasService } from "../../core/services/matricula-cuentas/matricula-cuentas.service";

@Component({
  selector: "app-consultar-cuenta",
  templateUrl: "./consultar-cuenta.component.html"
})
export class CuentasRegistradasComponent implements OnInit, OnDestroy {
  /** Variables globales */

  mostrarInicioInscripcionCuentas: boolean;
  noTieneCuentasRegistradas: boolean;
  cuentasRegistradasUsuario: Subscription;
  cuentasBancarias: Array<Cuenta> = [];

  infoUsuario = {
    accountType: "K",
    documentType: "13",
    document: "12345",
    country: "",
    bank: "",
    reference1: "",
    reference2: "",
    pointer: ""
  };

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */
  constructor(
    private MATRICULACUENTASSERVICES: MatriculaCuentasService,
    private SHAREDDATA: MatriculaCuentasObservableService,
    private ROUTE: Router
  ) {

  }

  /*****************************************/

  /** Realiza cargas despúes del page load */
  ngOnInit() {
    // this.consultarBancos();
    this.consultarCuentasRegistradas();
  }

  /*****************************************/

  /** Metodos personalizados para el componente */

  consultarBancos() {
    this.cuentasRegistradasUsuario = this.MATRICULACUENTASSERVICES.consultarMatriculaCuentasMN(appConfig.URLBANCOSMS, this.infoUsuario)
      .subscribe( data => {
        console.log(data);
      });
  }

  consultarCuentasRegistradas() {
    this.cuentasRegistradasUsuario = this.MATRICULACUENTASSERVICES.consultarMatriculaCuentasMN(appConfig.URLCONSULTAMS, this.infoUsuario)
      .subscribe( data => {
        console.log(data);
      });
  }

  eliminarCuentaRegistrada() {
    Swal.fire({
      title: "¿Seguro quieres eliminar esta cuenta?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0097D8",
      cancelButtonColor: "#d33",
      confirmButtonText: "ELIMINAR CUENTA!",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "Eliminada!",
          "Su cuenta registrada ha sido eliminada exitosamente.",
          "success"
        );
      }
    });
  }

  /**********************************************************/

  /** Destructor de peticiones observables para liberación de memoria */

  ngOnDestroy() {
    this.cuentasRegistradasUsuario.unsubscribe();
  }

  /**********************************************************/
}
