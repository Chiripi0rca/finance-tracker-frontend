export type TipoCategoria = 'COMIDA' | 'RENTA' | 'ENTRETENIMIENTO' | 'SALUD' | 'NOMINA' | 'TRANSPORTE' | 'OTROS';


export interface TransactionModel{
    id: number;
    monto: number;
    descripcion: string;
    categoria: TipoCategoria;
    tipoTransaccion: 'INGRESO' | 'EGRESO';
    createdAt: string;
    updatedAt: string;
} 