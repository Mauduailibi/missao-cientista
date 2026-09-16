export type Role = 'admin' | 'leitor'

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  leitor: 'Leitor',
}

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: 'Vê e exclui inscrições, abre/fecha o formulário e gerencia usuários.',
  leitor: 'Vê e exporta inscrições.',
}

// Documentos antigos sem `role` foram criados como administradores.
export function roleOf(data: { role?: unknown } | undefined): Role {
  return data?.role === 'leitor' ? 'leitor' : 'admin'
}
