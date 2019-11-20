import { Component, OnInit, OnDestroy } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Cuenta } from "../../core/models/cuenta";
import * as appConfig from "../../shared/appConfig";
import { Subscription } from "rxjs";
import { MatriculaCuentasObservableService } from "../../core/services/matricula-cuentas-observable/matricula-cuentas-observable.service";
import { Router } from "@angular/router";
import { MatriculaCuentasService } from "../../core/services/matricula-cuentas/matricula-cuentas.service";

@Component({
  selector: "app-cuentas-registradas",
  templateUrl: "./cuentas-registradas.component.html"
})
export class CuentasRegistradasComponent implements OnInit, OnDestroy {
  /** Variables globales */
  mostrarInicioInscripcionCuentas: boolean;
  noTieneCuentasRegistradas: boolean;
  cuentasRegistradasUsuario: Subscription;
  cuentasBancarias: Array<Cuenta> = [];

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */
  constructor(
    private MATRICULACUENTASSERVICES: MatriculaCuentasService,
    private SHAREDDATA: MatriculaCuentasObservableService,
    private ROUTE: Router
  ) {
    this.consultarCuentasRegistradas();
    this.consultarBancos();
  }

  /*****************************************/

  /** Realiza cargas despúes del page load */
  ngOnInit() {}

  /*****************************************/

  /** Metodos personalizados para el componente */

  consultarBancos() {
    this.cuentasRegistradasUsuario = this.MATRICULACUENTASSERVICES.consultarMatriculaCuentasMN(appConfig.URLBANCOSMN)
      .subscribe( data => {
        console.log(data);
      });
  }

  consultarCuentasRegistradas() {
    this.cuentasRegistradasUsuario = this.MATRICULACUENTASSERVICES.consultarMatriculaCuentas(
      appConfig.URLCONSULTA
    ).subscribe(
      data => {
        console.log(data);
        if (data) {
          data["listAccounts"].forEach((value, index) =>
            this.cuentasBancarias.push({
              id: index,
              tipoDocumento: value.docTypeAccountHolder,
              numeroDocumento: value.docAccountHolder,
              banco: value.bank,
              numeroCuenta: value.account,
              tipoCuenta: value.accountType,
              productoAsociado: value.listProducts
            })
          );

          this.SHAREDDATA.actualizarMatriculaCuentas(this.cuentasBancarias);
          this.mostrarInicioInscripcionCuentas = true;
        } else {
          this.noTieneCuentasRegistradas = true;
        }
      },
      errorServicio => {
        console.log(
          `Este es el error desde el ts del componente: ${errorServicio}`
        );
        console.log(errorServicio.message);
      }
    );
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
