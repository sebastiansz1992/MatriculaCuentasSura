/** CORE */
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { createCustomElement } from "@angular/elements";

/** SERVICIOS */
import { MatriculaCuentasService } from "./core/services/matricula-cuentas/matricula-cuentas.service";

/** COMPONENTES */
import { RegistroCuentaComponent } from './components/registrar-cuenta/registrar-cuenta.component';
import { CuentasRegistradasComponent } from "./components/consultar-cuenta/consultar-cuenta.component";
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
  providers: [MatriculaCuentasService],
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

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
