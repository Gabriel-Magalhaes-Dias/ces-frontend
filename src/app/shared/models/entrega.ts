import { Requisito } from './requisito';

export interface Entrega {
    id?: number;
    estimativa: number;
    idAnalista: number;
    requisito: Requisito;
}