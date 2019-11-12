import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { PruebaCuentasBancarias } from '../../core/models/matriculaCuentas';
import { ActualizarCuentaService } from '../../core/services/actualizar-cuenta/actualizar-cuenta.service';
import * as appConfig from '../../shared/appConfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  providers: [ActualizarCuentaService]
})
export class ActualizarCuentaComponent implements OnInit {

  /** Variables globales */
  editarInformacionCuentaRegistrada: boolean;
  pruebaCuentasBancarias: PruebaCuentasBancarias;
  actualizarCuentasBancarias: Subscription;

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */

  constructor(
    private ACTUALIZARCUENTAS: ActualizarCuentaService,
    private ROUTE: ActivatedRoute
     ) {
    this.editarInformacionCuentaRegistrada = true;
    this.consultarCuentaActualizar();
    console.log('Se cargo actualizar cuenta');
   }

  /*****************************************/


  /** Realiza cargas despúes del page load */

  ngOnInit() {

  }

  /*****************************************/

  /** Metodos personalizados para el componente */

  consultarCuentaActualizar() {

    const id: string = this.ROUTE.snapshot.params.id;

    this.actualizarCuentasBancarias = this.ACTUALIZARCUENTAS.actualizarMatriculaCuenta(appConfig.URLCONSULTARMATRICULACUENTASMOCK, id).subscribe( ( data ) => {
      console.log(data);

      data.forEach( value =>
        this.pruebaCuentasBancarias = {
          id: value.id,
          nombreBanco: value.nombreBanco,
          numeroCuenta: value.numeroCuenta,
          tipoCuenta: value.tipoCuenta
        }
      );

    }, error => console.log(error));

  }

  actualizarCuentaRegistrada() {

    console.log(this.pruebaCuentasBancarias);

    Swal.fire({
      html: `<div class="container">
      <div class="row">
          <div class="col-md-12">
              <img src="assets/images/alertas/magnifying-glass.png" alt="Buscador">
          </div>
      </div>
      <div class="row">
          <div class="col-md-12">
              <span style="font-size: 14px;font-family:'Barlow-medium';color:#6B6B6B;letter-spacing:-0.06px">Verifica que todos los datos sean correctos antes de continuar</span>
          </div>
      </div>
      <br>
      <div style="background: #6060600D 0% 0% no-repeat padding-box;border: 0.5px solid #8C8E8E;border-radius: 4px;opacity: 1;width: 70%;margin-left: 15%">
        <br>
        <div class="row">
            <div class="col-md-12">
                <span style="color: #8D8D8D;font-size: 16px;font-family:'FS-Joey'">Banco</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">Bancolombia</span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12">
                <span style="color: #8D8D8D;font-size: 16px;font-family:'FS-Joey'">Número de cuenta</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">Ahorros 983981329819</span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12">
                <span style="color: #8D8D8D;font-size: 16px;font-family:'FS-Joey'">Producto Asociado</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">'Devolución de aportes' : 'Prestaciones económicas'}</span>
            </div>
        </div>
        <br>
      </div>
  </div>`,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Editar datos',
      confirmButtonText: 'GUARDAR',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.editarInformacionCuentaRegistrada = true;
        Swal.fire({
          text: '¡Tu cuenta ha sido registrada correctamente!',
          type: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ENTENDIDO'
        }).then(( resultado: SweetAlertResult) => {
          if (resultado.value) {
            this.editarInformacionCuentaRegistrada = true;
          }
        });
      } else {
        // this.mostrarFormInscripcionCuentas = false;
      }
    });
  }

}
