export interface MatriculaCuentas {
    tipoDocumento: string;
    numeroDocumento: number;
    banco: string;
    numeroCuenta: number;
    tipoCuenta: string;
    productoAsociado: string;
}

export interface PruebaCuentasBancarias {
    id: number;
    nombreBanco: string;
    tipoCuenta: string;
    numeroCuenta: string;
}
