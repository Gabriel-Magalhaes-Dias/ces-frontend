export interface Projeto {
  id?: number
  nome: string
  dataInicio: Date
  dataFim: Date
  descricao: string
  realizaTestesAceitacao: boolean
  //criador: Usuario
  clientePriorizaBacklog: boolean
  utilizaPriorizacaoRequisitos: boolean
  utilizaModeloProprioRequisito: boolean
  descritivoProjeto: {
    objetivos: string
    limitacoes: string
    visaoGeral: string
    funcoesDoProduto: string
  }
}
