import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CuentasRegistradasComponent } from "./consultar-cuenta.component";

describe("CuentasRegistradasComponent", () => {
  let component: CuentasRegistradasComponent;
  let fixture: ComponentFixture<CuentasRegistradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasRegistradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasRegistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
