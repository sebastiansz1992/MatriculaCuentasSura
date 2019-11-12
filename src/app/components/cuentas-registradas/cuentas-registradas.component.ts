import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ConsultarCuentasService } from '../../core/services/consultar-cuentas/consultar-cuentas.service';
import { MatriculaCuentas, PruebaCuentasBancarias } from '../../core/models/matriculaCuentas';
import * as appConfig from '../../shared/appConfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cuentas-registradas',
  templateUrl: './cuentas-registradas.component.html',
  providers: [ConsultarCuentasService]
})
export class CuentasRegistradasComponent implements OnInit, OnDestroy {
  /** Variables globales */
  mostrarInicioInscripcionCuentas: boolean;
  noTieneCuentasRegistradas: boolean;
  cuentasRegistradas: Subscription;
  pruebaCuentasBancarias: Array<PruebaCuentasBancarias> = [];
  error: boolean;

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */
  constructor(private CONSULTARCUENTAS: ConsultarCuentasService) {
    this.consultarCuentasRegistradas();
    console.log('Se ha cargado cuentas registradas exitosamente');
  }

  /*****************************************/

  /** Realiza cargas despúes del page load */
  ngOnInit() {}

  /*****************************************/

  /** Metodos personalizados para el componente */

  consultarCuentasRegistradas() {

    this.error = false;

    this.cuentasRegistradas = this.CONSULTARCUENTAS.consultarMatriculaCuentas(appConfig.URLCONSULTARMATRICULACUENTASMOCK).subscribe(
      data => {
        if (data) {

          data.forEach( value =>
            this.pruebaCuentasBancarias.push({
              id: value.id,
              nombreBanco: value.nombreBanco,
              tipoCuenta: value.tipoCuenta,
              numeroCuenta: value.numeroCuenta
            })
          );

          this.mostrarInicioInscripcionCuentas = true;

        } else {

          this.noTieneCuentasRegistradas = true;

        }

      }, ( errorServicio ) => {
          console.log(`Este es el error desde el ts del componente: ${errorServicio}`);
          console.log(errorServicio.message);
      }
    );

  }

  eliminarCuentaRegistrada() {
    Swal.fire({
      title: '¿Seguro quieres eliminar esta cuenta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0097D8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ELIMINAR CUENTA!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        Swal.fire(
          'Eliminada!',
          'Su cuenta registrada ha sido eliminada exitosamente.',
          'success'
        );
      }
    });
  }

  /**********************************************************/

  /** Destructor de peticiones observables para liberación de memoria */

  ngOnDestroy() {
    this.cuentasRegistradas.unsubscribe();
  }

  /**********************************************************/
}
