import { Component, OnInit } from "@angular/core";
import { NgSelectConfig } from "@ng-select/ng-select";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  title = "inscripcioncuentas";

  constructor(private config: NgSelectConfig, private ROUTER: Router) {
    this.config.notFoundText = "No se encontraron bancos";
  }

  ngOnInit() {
    this.ROUTER.initialNavigation();
  }

}
