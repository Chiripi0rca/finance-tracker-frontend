export interface TransactionModel{
    id: number;
    monto: number;
    descripcion: string;
    categoria: string;
    tipoTransaccion: 'INGRESO' | 'EGRESO';
    createdAt: string;
    updatedAt: string;
} 