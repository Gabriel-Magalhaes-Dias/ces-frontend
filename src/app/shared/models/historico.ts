import { UserStory } from './userStory';

export interface Historico{
    id?: number,
    versao?: number,
    data? : number,
    anotacoes? : string,

    //Atributos do Requisito
    nome?: string,
    observacoes?: string,
    prioridade?: number,
    dataInicio?: number,
    dataEntrega?: number,
    idade?: number,
    recuperado?: number,
    estado?: string,
    userStory?: UserStory,
    estimativa?: number,
    autor?: string
}