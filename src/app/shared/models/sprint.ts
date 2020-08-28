import { Entrega } from './entrega';

export interface Sprint {
    id?: number;
    numeroSprint?: number;
    estado?: string;
    dataInicio: Date,
    dataFim: Date,
    valorEntregueAoNegocio: string,
    valorAprovadoCliente: boolean,
    entregas: Entrega[];
    requisitosIds?: number[];
}