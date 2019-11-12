/** CORE */
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { createCustomElement } from '@angular/elements';

/** SERVICIOS */

/** COMPONENTES */
import { RegistroCuentaComponent } from './components/registro-cuenta/registro-cuenta.component';
import { CuentasRegistradasComponent } from './components/cuentas-registradas/cuentas-registradas.component';
import { ActualizarCuentaComponent } from './components/actualizar-cuenta/actualizar-cuenta.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroCuentaComponent,
    CuentasRegistradasComponent,
    ActualizarCuentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {

    constructor( private injector: Injector ) {

        const componenteInscripcionCuentas = createCustomElement(AppComponent, {
          injector
        });
        customElements.define('componente-inscripcinon-cuentas', componenteInscripcionCuentas);
    }
    ngDoBootstrap() {

    }
  }
