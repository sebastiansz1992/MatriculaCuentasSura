/** CORE */
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { createCustomElement } from "@angular/elements";

/** SERVICIOS */
import { MatriculaCuentasObservableService } from "./core/services/matricula-cuentas-observable/matricula-cuentas-observable.service";

/** COMPONENTES */
import { RegistroCuentaComponent } from "./components/registro-cuenta/registro-cuenta.component";
import { CuentasRegistradasComponent } from "./components/cuentas-registradas/cuentas-registradas.component";
import { ActualizarCuentaComponent } from "./components/actualizar-cuenta/actualizar-cuenta.component";
import { AppComponent } from "./app.component";
import { LoadingComponent } from "./shared/loading/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent,
    RegistroCuentaComponent,
    CuentasRegistradasComponent,
    ActualizarCuentaComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatriculaCuentasObservableService],
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const componenteInscripcionCuentas = createCustomElement(AppComponent, {
      injector: this.injector
    });
    customElements.define(
      "componente-inscripcinon-cuentas",
      componenteInscripcionCuentas
    );
  }
}
