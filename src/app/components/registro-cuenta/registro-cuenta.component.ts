import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrearCuentaService } from '../../core/services/crear-cuenta/crear-cuenta.service';
import { Cuenta } from '../../core/models/Cuenta';
import * as appConfig from '../../shared/appConfig';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  providers: [CrearCuentaService]
})
export class RegistroCuentaComponent implements OnInit {

  /** Variables globales */
  formsInscripcionCuentas: FormGroup;
  mostrarFormInscripcionCuentas: boolean;
  mostrarInicioInscripcionCuentas: boolean;
  cuenta: Cuenta;
  headers: any;
  banco: string;

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */
  constructor(
    private FORMBUILDER: FormBuilder,
    private CREARCUENTA: CrearCuentaService
  ) {

    this.mostrarFormInscripcionCuentas = true;
    this.mostrarInicioInscripcionCuentas = true;
    console.log('Se cargo registro cuenta');

    this.headers = {
      'Content-Type': 'application/json; chartset=UTF-8'
    };

    this.CREARCUENTA.crearMatriculaCuenta(appConfig.URLGESTION, this.cuenta, this.headers).subscribe( (data) => {
      console.log(data);
    });

  }

  /*****************************************************/

   /** Realiza cargas despúes del page load */
  ngOnInit() {

    this.validarCamposObligatorios();

  }

  /** Metodos personalizados para el componente */
  validarCoincidirContrasenia(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  validarCamposObligatorios() {

    this.formsInscripcionCuentas = this.FORMBUILDER.group({

      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: [null, [Validators.required]],
      numeroCuenta: [null, [Validators.required]],
      confirmarCuenta: [null, [Validators.required]],
      listaBancos: [null, [Validators.required]],
      cuenta: [null, [Validators.required]],
      devolucionAportes: [false, [Validators.required]],
      prestacionEconomica: [false, [Validators.required]],
      terminosCondiciones: [false, [Validators.required]]

    });

  }

  inscribirCuenta( inscribir: string ) {

    console.log('formsInscripcionCuentas', this.formsInscripcionCuentas.value);
    if ( inscribir === 'inscribir' ) {

      this.mostrarFormInscripcionCuentas = false;
      this.mostrarInicioInscripcionCuentas = true;

    } else {
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
                  <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">${this.banco}</span>
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
                  <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">${this.formsInscripcionCuentas.controls.cuenta.value} ${this.formsInscripcionCuentas.controls.numeroCuenta.value}</span>
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
                  <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">${this.formsInscripcionCuentas.controls.devolucionAportes.value ? 'Devolución de aportes' : 'Prestaciones económicas'}</span>
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

          this.mostrarFormInscripcionCuentas = true;
          Swal.fire({
            text: '¡Tu cuenta ha sido registrada correctamente!',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ENTENDIDO'
          }).then(( resultado: SweetAlertResult) => {
            if (resultado.value) {
              this.mostrarFormInscripcionCuentas = true;
              this.mostrarInicioInscripcionCuentas = false;
            }
          });
        } else {
          this.mostrarFormInscripcionCuentas = false;
        }
      });
    }
  }

  onChange(event) {
    this.banco = event.target.options[event.target.options.selectedIndex].text;
    console.log(event.target.options[event.target.options.selectedIndex].text);
  }

}
