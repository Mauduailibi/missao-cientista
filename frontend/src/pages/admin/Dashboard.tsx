import type { User } from 'firebase/auth'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  type Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react'
import { Button, Field, Notice, RadioGroup, TextInput } from '../../components/form/fields'
import { ROOT_ADMIN_EMAIL, db, getSecondaryAuth } from '../../lib/firebase'
import { useFormStatus } from '../../lib/formStatus'
import { type Inscricao, NIVEL_LABELS } from '../../lib/inscricao'
import { generatePassword } from '../../lib/password'
import { type Coluna, downloadPlanilha } from '../../lib/planilha'
import { ROLE_DESCRIPTIONS, ROLE_LABELS, type Role, roleOf } from '../../lib/usuarios'

type Tab = 'inscricoes' | 'formulario' | 'usuarios'

type UserRecord = {
  id: string
  email: string
  role: Role
  active: boolean
  mustChangePassword: boolean
  createdAt: Timestamp | null
  createdBy?: string
}

const tabs: { id: Tab; label: string; adminOnly: boolean }[] = [
  { id: 'inscricoes', label: 'Inscrições', adminOnly: false },
  { id: 'formulario', label: 'Formulário', adminOnly: true },
  { id: 'usuarios', label: 'Usuários', adminOnly: true },
]

const roleOptions = (Object.keys(ROLE_LABELS) as Role[]).map((value) => ({
  value,
  label: ROLE_LABELS[value],
}))

function formatDate(value: Timestamp | null | undefined) {
  return value ? value.toDate().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—'
}

const yesNo = (value: boolean) => (value ? 'Sim' : 'Não')

type InscricaoDoc = Inscricao & { id: string }

const colunasPlanilha: Coluna<InscricaoDoc>[] = [
  { header: 'Data da inscrição', width: 17, value: (item) => item.createdAt?.toDate() ?? null },
  { header: 'Título do trabalho', width: 36, wrap: true, value: (item) => item.titulo },
  { header: 'Integrantes', width: 34, wrap: true, value: (item) => item.participantes.join('\n') },
  { header: 'Nº integrantes', width: 13, value: (item) => String(item.participantes.length) },
  { header: 'Professor orientador', width: 28, wrap: true, value: (item) => item.orientadorNome },
  { header: 'E-mail do orientador', width: 30, value: (item) => item.orientadorEmail },
  { header: 'Telefone do orientador', width: 20, value: (item) => item.orientadorTelefone },
  { header: 'Instituição de ensino', width: 32, wrap: true, value: (item) => item.instituicao },
  { header: 'Nível', width: 19, value: (item) => NIVEL_LABELS[item.nivel] ?? item.nivel },
  { header: 'Município', width: 22, value: (item) => item.municipio },
  { header: 'Ciência Delas', width: 13, value: (item) => yesNo(item.cienciaDelas) },
  { header: 'Energia elétrica', width: 14, value: (item) => yesNo(item.energiaEletrica) },
  { header: 'Espaço especial', width: 36, wrap: true, value: (item) => item.espacoEspecial || 'Não' },
  { header: 'Autoriza imagem', width: 15, value: (item) => yesNo(item.autorizaImagem) },
  { header: 'Resumo', width: 90, wrap: true, value: (item) => item.resumo },
]

export function Dashboard({ user, role }: { user: User; role: Role }) {
  const [selectedTab, setTab] = useState<Tab>('inscricoes')
  const isAdmin = role === 'admin'
  const visibleTabs = tabs.filter((item) => isAdmin || !item.adminOnly)
  const tab = visibleTabs.some((item) => item.id === selectedTab) ? selectedTab : 'inscricoes'

  return (
    <div>
      <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">PAINEL</span>
      <h1 className="mt-2 mb-6 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[44px]">
        Feira Missão Cientista
      </h1>
      <div className="mb-6 -mt-3 text-[15px] font-bold text-navy-soft">
        Você está conectado como <span className="text-navy">{ROLE_LABELS[role]}</span>
      </div>
      <div role="tablist" className={`mb-8 flex flex-wrap gap-2 ${visibleTabs.length === 1 ? 'hidden' : ''}`}>
        {visibleTabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-[15px] font-extrabold transition-colors ${
              tab === item.id ? 'bg-navy text-white' : 'border border-navy/15 bg-white text-navy hover:border-navy/35'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === 'inscricoes' && <InscricoesTab canDelete={isAdmin} />}
      {tab === 'formulario' && <FormularioTab user={user} />}
      {tab === 'usuarios' && <UsuariosTab user={user} />}
    </div>
  )
}

function InscricoesTab({ canDelete }: { canDelete: boolean }) {
  const [items, setItems] = useState<InscricaoDoc[] | null>(null)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'inscricoes'), orderBy('createdAt', 'desc')),
        (snapshot) => setItems(snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Inscricao) }))),
        () => setError('Não foi possível carregar as inscrições.'),
      ),
    [],
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!items || !term) return items ?? []
    return items.filter((item) =>
      [item.titulo, item.instituicao, item.municipio, item.orientadorNome, ...item.participantes]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [items, search])

  async function exportPlanilha() {
    if (!items) return
    setExporting(true)
    setActionError('')
    try {
      await downloadPlanilha(
        `inscricoes-missao-cientista-${new Date().toISOString().slice(0, 10)}.xlsx`,
        'Inscrições',
        colunasPlanilha,
        items,
      )
    } catch {
      setActionError('Não foi possível gerar a planilha.')
    } finally {
      setExporting(false)
    }
  }

  async function remove(item: InscricaoDoc) {
    if (!window.confirm(`Excluir a inscrição “${item.titulo}”? Esta ação não pode ser desfeita.`)) return
    setDeleting(item.id)
    setActionError('')
    try {
      await deleteDoc(doc(db, 'inscricoes', item.id))
      setExpanded(null)
    } catch {
      setActionError('Não foi possível excluir a inscrição.')
    } finally {
      setDeleting(null)
    }
  }

  if (error) return <Notice tone="error">{error}</Notice>
  if (!items) return <p className="text-lg font-bold text-navy-soft">Carregando inscrições…</p>

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="font-display text-[26px] font-extrabold text-navy">
          {items.length} {items.length === 1 ? 'inscrição' : 'inscrições'}
        </div>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row md:justify-end">
          <TextInput
            type="search"
            placeholder="Buscar por título, escola, município, nome…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="md:max-w-[360px]"
          />
          <Button variant="secondary" onClick={exportPlanilha} disabled={items.length === 0 || exporting}>
            {exporting ? 'Gerando…' : 'Exportar Excel'}
          </Button>
        </div>
      </div>

      {actionError && <Notice tone="error">{actionError}</Notice>}

      {filtered.length === 0 && (
        <p className="rounded-[14px] border border-navy/8 bg-white px-6 py-8 text-center text-[16px] font-bold text-navy-soft">
          {items.length === 0 ? 'Nenhuma inscrição recebida ainda.' : 'Nenhuma inscrição encontrada.'}
        </p>
      )}

      {filtered.map((item) => {
        const open = expanded === item.id
        return (
          <article key={item.id} className="rounded-[14px] border border-navy/8 bg-white">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setExpanded(open ? null : item.id)}
              className="flex w-full cursor-pointer flex-col gap-1 border-0 bg-transparent px-6 py-5 text-left md:flex-row md:items-center md:gap-6"
            >
              <div className="min-w-0 flex-1">
                <div className="font-display text-[20px] leading-tight font-extrabold text-navy">{item.titulo}</div>
                <div className="mt-1 text-[15px] text-navy-soft">
                  {item.instituicao} · {item.municipio} · {NIVEL_LABELS[item.nivel] ?? item.nivel}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-label">
                {item.cienciaDelas && (
                  <span className="rounded-full bg-award-teal-bg px-3 py-1 text-teal">Ciência Delas</span>
                )}
                <span>{formatDate(item.createdAt)}</span>
                <span aria-hidden className={`text-navy transition-transform ${open ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </div>
            </button>
            {open && (
              <dl className="m-0 grid gap-x-8 gap-y-4 border-t border-navy/8 px-6 py-5 md:grid-cols-2">
                <Detail label="Integrantes">
                  <ol className="m-0 pl-5">
                    {item.participantes.map((nome, i) => (
                      <li key={i}>{nome}</li>
                    ))}
                  </ol>
                </Detail>
                <Detail label="Professor orientador">
                  {item.orientadorNome}
                  <br />
                  <a href={`mailto:${item.orientadorEmail}`} className="text-orange hover:text-orange-shadow">
                    {item.orientadorEmail}
                  </a>
                  <br />
                  {item.orientadorTelefone}
                </Detail>
                <Detail label="Resumo" wide>
                  <p className="m-0 whitespace-pre-wrap">{item.resumo}</p>
                </Detail>
                <Detail label="Ciência Delas">{yesNo(item.cienciaDelas)}</Detail>
                <Detail label="Energia elétrica">{yesNo(item.energiaEletrica)}</Detail>
                <Detail label="Espaço especial">{item.espacoEspecial || 'Não'}</Detail>
                <Detail label="Autoriza imagem">{yesNo(item.autorizaImagem)}</Detail>
                {canDelete && (
                  <div className="flex justify-end border-t border-navy/8 pt-4 md:col-span-2">
                    <Button
                      variant="danger"
                      className="px-4 py-2 text-[14px]"
                      disabled={deleting === item.id}
                      onClick={() => remove(item)}
                    >
                      {deleting === item.id ? 'Excluindo…' : 'Excluir inscrição'}
                    </Button>
                  </div>
                )}
              </dl>
            )}
          </article>
        )
      })}
    </div>
  )
}

function Detail({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      <dt className="text-xs font-extrabold tracking-[0.14em] text-label uppercase">{label}</dt>
      <dd className="m-0 mt-1 text-[16px] leading-[1.55] text-navy">{children}</dd>
    </div>
  )
}

function FormularioTab({ user }: { user: User }) {
  const status = useFormStatus()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const isOpen = status === 'open'

  async function toggle() {
    const next = !isOpen
    const message = next
      ? 'Abrir o formulário de inscrição para o público?'
      : 'Fechar o formulário? Novas inscrições serão bloqueadas.'
    if (!window.confirm(message)) return
    setBusy(true)
    setError('')
    try {
      await setDoc(doc(db, 'settings', 'form'), { open: next, updatedAt: serverTimestamp(), updatedBy: user.email ?? user.uid })
    } catch {
      setError('Não foi possível alterar o status do formulário.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative max-w-[640px] overflow-hidden rounded-[26px] bg-navy px-8 py-10 text-white lg:px-11 lg:py-[46px]">
      <span className="absolute top-[-70px] right-[-70px] block size-[220px] rounded-full bg-sky/22" />
      <div className="relative">
        <span className="inline-block rounded-full bg-yellow px-4 py-[7px] font-display text-sm font-extrabold tracking-[0.12em] text-navy">
          STATUS DO FORMULÁRIO
        </span>
        <h2 className="mt-5 mb-3 font-display text-[34px] leading-[1.03] font-extrabold lg:text-[42px]">
          {status === 'loading' ? (
            'Carregando…'
          ) : (
            <>
              Inscrições <span className="text-yellow">{isOpen ? 'abertas' : 'fechadas'}</span>
            </>
          )}
        </h2>
        <p className="mt-0 mb-[26px] text-lg leading-[1.55] text-inscricoes-muted">
          {isOpen
            ? 'O formulário está disponível em /inscricao e o site mostra o botão de inscrição.'
            : 'O formulário não aceita envios e o site informa que as inscrições não estão abertas.'}
        </p>
        {error && (
          <div className="mb-4">
            <Notice tone="error">{error}</Notice>
          </div>
        )}
        <Button onClick={toggle} disabled={busy || status === 'loading'}>
          {busy ? 'Salvando…' : isOpen ? 'Fechar formulário' : 'Abrir formulário'}
        </Button>
      </div>
    </div>
  )
}

function UsuariosTab({ user }: { user: User }) {
  const [users, setUsers] = useState<UserRecord[] | null>(null)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('leitor')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [created, setCreated] = useState<{ email: string; password: string; role: Role } | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'admins'), orderBy('email')),
        (snapshot) =>
          setUsers(
            snapshot.docs.map((d) => {
              const data = d.data()
              return { ...(data as Omit<UserRecord, 'id' | 'role'>), id: d.id, role: roleOf(data) }
            }),
          ),
        () => setError('Não foi possível carregar os usuários.'),
      ),
    [],
  )

  const activeUsers = users?.filter((item) => item.active) ?? []
  const removedUsers = users?.filter((item) => !item.active) ?? []

  function resetMessages() {
    setError('')
    setInfo('')
    setCreated(null)
    setCopied(false)
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    const normalized = email.trim().toLowerCase()
    resetMessages()

    const existing = users?.find((item) => item.email === normalized)
    if (existing?.active) {
      setError('Este e-mail já é um usuário ativo.')
      return
    }

    setBusy(true)
    if (existing) {
      // Conta já existe no Firebase Auth: apenas reativa com o tipo escolhido.
      try {
        await updateDoc(doc(db, 'admins', existing.id), { active: true, role })
        setInfo(
          `Acesso de ${normalized} reativado como ${ROLE_LABELS[role]}. A pessoa entra com a senha anterior ou usa “Esqueci minha senha”.`,
        )
        setEmail('')
      } catch {
        setError('Não foi possível reativar o usuário.')
      } finally {
        setBusy(false)
      }
      return
    }

    const password = generatePassword()
    const secondaryAuth = getSecondaryAuth()
    try {
      const credential = await createUserWithEmailAndPassword(secondaryAuth, normalized, password)
      await setDoc(doc(db, 'admins', credential.user.uid), {
        email: normalized,
        role,
        active: true,
        mustChangePassword: true,
        createdAt: serverTimestamp(),
        createdBy: user.email ?? user.uid,
      })
      setCreated({ email: normalized, password, role })
      setEmail('')
    } catch (err) {
      const code = (err as { code?: string }).code
      setError(
        code === 'auth/email-already-in-use'
          ? 'Este e-mail já possui uma conta no Firebase, mas não está na lista de usuários.'
          : code === 'auth/invalid-email'
            ? 'E-mail inválido.'
            : 'Não foi possível criar o usuário.',
      )
    } finally {
      await signOut(secondaryAuth).catch(() => {})
      setBusy(false)
    }
  }

  async function update(target: UserRecord, changes: Partial<Pick<UserRecord, 'active' | 'role'>>, confirmMessage: string) {
    if (!window.confirm(confirmMessage)) return
    resetMessages()
    try {
      await updateDoc(doc(db, 'admins', target.id), changes)
    } catch {
      setError('Não foi possível alterar o usuário.')
    }
  }

  async function copyPassword() {
    if (!created) return
    await navigator.clipboard.writeText(created.password)
    setCopied(true)
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[20px] border border-navy/8 bg-white p-6 lg:p-8">
        <h2 className="mt-0 mb-2 font-display text-[26px] leading-tight font-extrabold text-navy">Adicionar usuário</h2>
        <p className="mt-0 mb-5 text-[15px] leading-[1.55] text-navy-muted">
          Uma senha temporária será gerada. A pessoa deverá trocá-la no primeiro acesso em{' '}
          <strong>{window.location.origin}/admin</strong>.
        </p>
        <form onSubmit={handleCreate} className="flex flex-col gap-5">
          <Field label="E-mail" htmlFor="new-user-email">
            <TextInput
              id="new-user-email"
              type="email"
              required
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <div>
            <RadioGroup name="new-user-role" label="Tipo" value={role} options={roleOptions} onChange={setRole} />
            <p className="mt-2 mb-0 text-sm text-navy-soft">{ROLE_DESCRIPTIONS[role]}</p>
          </div>
          <Button type="submit" disabled={busy}>
            {busy ? 'Salvando…' : 'Gerar senha e criar usuário'}
          </Button>
        </form>
        {created && (
          <div className="mt-5 rounded-[14px] border border-teal/30 bg-award-teal-bg p-5">
            <div className="text-[15px] font-bold text-teal">
              {ROLE_LABELS[created.role]} criado: {created.email}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <code className="rounded-[10px] bg-white px-4 py-2.5 font-mono text-[18px] font-bold tracking-wide text-navy select-all">
                {created.password}
              </code>
              <Button variant="secondary" className="px-4 py-2.5 text-[14px]" onClick={copyPassword}>
                {copied ? 'Copiada!' : 'Copiar'}
              </Button>
            </div>
            <p className="mt-3 mb-0 text-sm text-navy-muted">
              Envie esta senha para a pessoa agora — ela não será exibida novamente.
            </p>
          </div>
        )}
        {info && (
          <div className="mt-5">
            <Notice tone="success">{info}</Notice>
          </div>
        )}
        {error && (
          <div className="mt-5">
            <Notice tone="error">{error}</Notice>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="mt-0 mb-1 font-display text-[26px] leading-tight font-extrabold text-navy">Usuários</h2>
        {!users && <p className="text-lg font-bold text-navy-soft">Carregando…</p>}
        {activeUsers.map((item) => {
          const locked = item.id === user.uid || item.email === ROOT_ADMIN_EMAIL
          const otherRole: Role = item.role === 'admin' ? 'leitor' : 'admin'
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-[14px] border border-navy/8 bg-white px-5 py-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-[16px] font-extrabold text-navy">{item.email}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[12px] font-extrabold tracking-[0.08em] uppercase ${
                      item.role === 'admin' ? 'bg-navy text-white' : 'bg-award-sky-bg text-sky-mid'
                    }`}
                  >
                    {ROLE_LABELS[item.role]}
                  </span>
                </div>
                <div className="text-sm text-navy-soft">
                  {item.mustChangePassword ? 'Aguardando primeiro acesso' : 'Ativo'}
                  {item.id === user.uid && ' · você'}
                  {item.email === ROOT_ADMIN_EMAIL && ' · principal'}
                </div>
              </div>
              {!locked && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="px-4 py-2 text-[14px]"
                    onClick={() =>
                      update(item, { role: otherRole }, `Tornar ${item.email} ${ROLE_LABELS[otherRole]}?`)
                    }
                  >
                    Tornar {ROLE_LABELS[otherRole]}
                  </Button>
                  <Button
                    variant="danger"
                    className="px-4 py-2 text-[14px]"
                    onClick={() =>
                      update(
                        item,
                        { active: false },
                        `Excluir ${item.email}? A pessoa perderá o acesso ao painel imediatamente.`,
                      )
                    }
                  >
                    Excluir
                  </Button>
                </div>
              )}
            </div>
          )
        })}

        {removedUsers.length > 0 && (
          <details className="mt-3">
            <summary className="cursor-pointer text-[15px] font-extrabold text-navy-soft">
              Usuários excluídos ({removedUsers.length})
            </summary>
            <div className="mt-3 flex flex-col gap-2">
              {removedUsers.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-[14px] border border-navy/8 bg-white/60 px-5 py-3"
                >
                  <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-label">{item.email}</span>
                  <Button
                    variant="secondary"
                    className="px-4 py-2 text-[14px]"
                    onClick={() =>
                      update(
                        item,
                        { active: true },
                        `Reativar ${item.email} como ${ROLE_LABELS[item.role]}?`,
                      )
                    }
                  >
                    Reativar
                  </Button>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
