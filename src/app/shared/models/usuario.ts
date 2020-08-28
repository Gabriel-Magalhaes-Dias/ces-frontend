export interface Habilidade {
  id?: number
  descricao: string
}

export interface Usuario {
    id?: number
    nome: string
    username: string
    email: string
    habilidades?: Habilidade[]
    password: string
    enabled: boolean
}