export interface Cuenta {
    id: number;
    tipoDocumento: string;
    numeroDocumento: string;
    banco: string;
    nombreBanco?: string;
    numeroCuenta: string;
    tipoCuenta: string;
    productoAsociado: string;
}
