import { Requisito } from './requisito';

export interface Entrega {
    id?: number;
    idAnalista: number;
    estimativa: number;
    prioridade?: number;
    requisito: Requisito;
}