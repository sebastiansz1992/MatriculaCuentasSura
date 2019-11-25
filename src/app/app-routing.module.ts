import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrarCuentaComponent } from "./components/registrar-cuenta/registrar-cuenta.component";
import { CuentasRegistradasComponent } from "./components/consultar-cuenta/consultar-cuenta.component";
import { ActualizarCuentaComponent } from "./components/actualizar-cuenta/actualizar-cuenta.component";

const ROUTES: Routes = [
  { path: "cuentasRegistradas", component: CuentasRegistradasComponent },
  { path: "registroCuenta", component: RegistrarCuentaComponent },
  { path: "actualizarCuenta/:id", component: ActualizarCuentaComponent },
  { path: "", redirectTo: "cuentasRegistradas", pathMatch: "full" },
  { path: "**", redirectTo: "cuentasRegistradas", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
