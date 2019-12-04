import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Cuenta } from "../../core/models/cuenta";
import { Subscription } from "rxjs";
import { MatriculaCuentasObservableService } from "../../core/services/matricula-cuentas-observable/matricula-cuentas-observable.service";
import { MatriculaCuentasService } from "../../core/services/matricula-cuentas/matricula-cuentas.service";

@Component({
  selector: "app-actualizar-cuenta",
  templateUrl: "./actualizar-cuenta.component.html"
})
export class ActualizarCuentaComponent implements OnInit {
  /** Variables globales */
  editarInformacionCuentaRegistrada: boolean;
  cuenta: Cuenta;
  actualizarCuentasBancarias: Subscription;
  cuentaEditar: any;

  /*****************************************/

  /** Constructor ( Realiza cargas antes del page load ) */

  constructor(
    private MATRICULACUENTASERVICES: MatriculaCuentasService,
    private ACTIVEROUTE: ActivatedRoute,
    private ROUTE: Router,
    private SHAREDDATA: MatriculaCuentasObservableService
  ) { }

  /*****************************************/

  /** Realiza cargas despúes del page load */

  ngOnInit() {
    console.log("Se cargo actualizar cuenta");
    this.editarInformacionCuentaRegistrada = true;
    this.consultarCuentaActualizar();
  }

  /*****************************************/

  /** Metodos personalizados para el componente */

  consultarCuentaActualizar() {

    const id: string = this.ACTIVEROUTE.snapshot.params.id;

    this.SHAREDDATA.cuentaUsuario.subscribe(
      cuenta => {
        if (cuenta) {
          this.cuentaEditar = cuenta.filter(c => c.id.toString() === id)[0];
          this.cuenta = {
            id: this.cuentaEditar.id,
            account: this.cuentaEditar.account,
            accountType: this.cuentaEditar.accountType,
            nameAccountType: this.cuentaEditar.nameAccountType,
            bank: this.cuentaEditar.bank,
            bankName: this.cuentaEditar.bankName,
            urlLogoBanco: this.cuentaEditar.urlLogoBanco,
            collectAut: "",
            country: "",
            docAccountHolder: this.cuentaEditar.docAccountHolder,
            docTypeAccountHolder: "",
            reference: ""
          };
        } else {
          this.ROUTE.navigate(["/cuentasRegistradas"]);
        }
      },
      error => console.log(error)
    );
  }

  actualizarCuentaRegistrada() {
    console.log(this.cuenta);

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Editar datos",
      confirmButtonText: "GUARDAR",
      allowOutsideClick: false
    }).then(result => {
      if (result.value) {
        this.editarInformacionCuentaRegistrada = true;
        Swal.fire({
          text: "¡Tu cuenta ha sido registrada correctamente!",
          type: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ENTENDIDO"
        }).then((resultado: SweetAlertResult) => {
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
