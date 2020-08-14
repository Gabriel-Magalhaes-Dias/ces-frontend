import { Requisito } from './requisito';

export interface Sprint {
    id?: number;
    numeroSprint: number;
    estado: string;
    dataInicio: Date,
    dataFim: Date,
    valorEntregueAoNegocio: string,
    valorAprovadoCliente: boolean,
    entregas: Requisito[];
}