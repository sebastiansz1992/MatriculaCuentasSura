import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroCuentaComponent } from './components/registro-cuenta/registro-cuenta.component';
import { CuentasRegistradasComponent } from './components/cuentas-registradas/cuentas-registradas.component';
import { ActualizarCuentaComponent } from './components/actualizar-cuenta/actualizar-cuenta.component';

const ROUTES: Routes = [

  { path: 'cuentasRegistradas', component: CuentasRegistradasComponent },
  { path: 'registroCuenta', component: RegistroCuentaComponent },
  { path: 'actualizarCuenta', component: ActualizarCuentaComponent },
  { path: 'actualizarCuenta/:id', component: ActualizarCuentaComponent },
  { path: '**', redirectTo: 'cuentasRegistradas', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
