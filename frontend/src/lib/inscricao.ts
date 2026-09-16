import type { Timestamp } from 'firebase/firestore'

export type Nivel = 'infantil' | 'fundamental' | 'medio'

export const NIVEL_LABELS: Record<Nivel, string> = {
  infantil: 'Educação Infantil',
  fundamental: 'Ensino Fundamental',
  medio: 'Ensino Médio',
}

export const MAX_PARTICIPANTES = 5
export const MAX_RESUMO = 2500

export type Inscricao = {
  participantes: string[]
  orientadorNome: string
  orientadorEmail: string
  orientadorTelefone: string
  instituicao: string
  nivel: Nivel
  municipio: string
  titulo: string
  resumo: string
  cienciaDelas: boolean
  energiaEletrica: boolean
  espacoEspecial: string
  autorizaImagem: boolean
  createdAt: Timestamp | null
}
