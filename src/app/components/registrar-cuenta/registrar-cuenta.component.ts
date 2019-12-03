import { Component, OnInit, OnDestroy } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Cuenta } from "../../core/models/cuenta";
import * as appConfig from "../../shared/appConfig";
import { Banco } from "../../core/models/banco";
import { Subscription } from "rxjs";
import { MatriculaCuentasService } from "../../core/services/matricula-cuentas/matricula-cuentas.service";

@Component({
  selector: "app-registrar-cuenta",
  templateUrl: "./registrar-cuenta.component.html"
})
export class RegistrarCuentaComponent implements OnInit, OnDestroy {

  /** Variables globales */
  formsInscripcionCuentas: FormGroup;
  mostrarFormInscripcionCuentas: boolean;
  mostrarInicioInscripcionCuentas: boolean;
  listaBancos: Subscription;
  registroCuenta: Cuenta;
  bancos: Array<Banco> = [];
  headers: any;
  paises: any;

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */
  constructor(
    private FORMBUILDER: FormBuilder,
    private MATRICULACUENTASERVICES: MatriculaCuentasService
  ) {
    this.mostrarFormInscripcionCuentas = true;
    this.mostrarInicioInscripcionCuentas = true;
    console.log("Se cargo registro cuenta");
  }

  /*****************************************************/

  /** Realiza cargas despúes del page load */
  ngOnInit() {
    this.validarCamposObligatorios();
    //this.cargarListaBancos();
  }

  /** Metodos personalizados para el componente */

  /*cargarListaBancos() {
    this.listaBancos = this.MATRICULACUENTASERVICES.consultarMatriculaCuentas(
      appConfig.URLBANCOS
    ).subscribe(
      data => {
        if (data) {
          data["listBank"].forEach((value, index) => {
            this.bancos.push({
              idPosition: index,
              id: value.bank,
              pais: value.country,
              nombreBanco: value.name
            });
          });

          this.bancos = [...this.bancos];

          console.log(this.bancos);
        } else {
          console.log("No se encontraron bancos.");
        }
      },
      errorServicio => {
        console.log(errorServicio);
      }
    );
  }*/

  validarCoincidirContrasenia(
    controlName: string,
    matchingControlName: string
  ) {
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

  inscribirCuenta(inscribir: string) {
    console.log("formsInscripcionCuentas", this.formsInscripcionCuentas.value);
    if (inscribir === "inscribir") {
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
                  <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">BANCOLOMBIA</span>
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
                  <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">${
                    this.formsInscripcionCuentas.controls.cuenta.value
                  } ${
          this.formsInscripcionCuentas.controls.numeroCuenta.value
        }</span>
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
                  <span style="color: #6B6B6B;font-size: 22px;font-family:'FS-Joey';font-weight:bold;">${
                    this.formsInscripcionCuentas.controls.devolucionAportes
                      .value
                      ? "Devolución de aportes"
                      : "Prestaciones económicas"
                  }</span>
              </div>
          </div>
          <br>
        </div>
    </div>`,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Editar datos",
        confirmButtonText: "GUARDAR",
        allowOutsideClick: false
      }).then(result => {
        if (result.value) {
          this.mostrarFormInscripcionCuentas = true;
          Swal.fire({
            text: "¡Tu cuenta ha sido registrada correctamente!",
            type: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ENTENDIDO"
          }).then((resultado: SweetAlertResult) => {
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
    console.log(event.nombreBanco);
  }

  /** Destructor de peticiones observables para liberación de memoria */

  ngOnDestroy() {
    //this.listaBancos.unsubscribe();
  }

  /**********************************************************/
}
