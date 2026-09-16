import {
  type User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { type FormEvent, type ReactNode, useEffect, useState } from 'react'
import { Button, Field, Notice, TextInput } from '../../components/form/fields'
import { LogoMark } from '../../components/LogoMark'
import { ROOT_ADMIN_EMAIL, db, getMainAuth } from '../../lib/firebase'
import { type Role, roleOf } from '../../lib/usuarios'
import { Dashboard } from './Dashboard'

const auth = getMainAuth()

type AdminState =
  | { kind: 'loading' }
  | { kind: 'signed-out' }
  | { kind: 'forbidden'; user: User }
  | { kind: 'must-change'; user: User }
  | { kind: 'ready'; user: User; role: Role }

function AdminShell({ user, children }: { user?: User; children: ReactNode }) {
  return (
    <div className="min-h-svh w-full">
      <header className="sticky top-0 z-[80] border-b border-navy/10 bg-cream/92 backdrop-blur-[10px]">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-6 py-3 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <LogoMark className="size-[52px]" />
            <span className="block font-display text-[17px] leading-[1.05] font-extrabold tracking-[0.01em] text-navy">
              MISSÃO
              <br />
              CIENTISTA
            </span>
          </a>
          <span className="rounded-full bg-navy px-3 py-1 text-[12px] font-extrabold tracking-[0.12em] text-white">
            PAINEL
          </span>
          {user && (
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-sm font-bold text-navy-soft sm:inline">{user.email}</span>
              <Button variant="secondary" className="px-4 py-2 text-[14px]" onClick={() => signOut(auth)}>
                Sair
              </Button>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-14">{children}</main>
    </div>
  )
}

function Card({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[460px] rounded-[20px] border border-navy/8 bg-white p-7 lg:p-9">
      <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">{eyebrow}</span>
      <h1 className="mt-2 mb-6 font-display text-[32px] leading-[1.05] font-extrabold text-navy">{title}</h1>
      {children}
    </div>
  )
}

function authErrorMessage(code: string | undefined) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return 'E-mail ou senha incorretos.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
    case 'auth/weak-password':
      return 'Senha fraca. Use pelo menos 8 caracteres.'
    case 'auth/requires-recent-login':
      return 'Por segurança, saia e entre novamente antes de trocar a senha.'
    default:
      return 'Algo deu errado. Tente novamente.'
  }
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setInfo('')
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (err) {
      setError(authErrorMessage((err as { code?: string }).code))
    } finally {
      setBusy(false)
    }
  }

  async function handleReset() {
    setError('')
    setInfo('')
    if (!email.trim()) {
      setError('Digite seu e-mail acima para receber o link de redefinição.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email.trim())
    } catch {
      // Não revela se o e-mail existe.
    }
    setInfo('Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.')
  }

  return (
    <Card eyebrow="ÁREA RESTRITA" title="Entrar no painel">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="E-mail" htmlFor="email">
          <TextInput
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Senha" htmlFor="password">
          <TextInput
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {error && <Notice tone="error">{error}</Notice>}
        {info && <Notice tone="info">{info}</Notice>}
        <Button type="submit" disabled={busy}>
          {busy ? 'Entrando…' : 'Entrar'}
        </Button>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer self-center border-0 bg-transparent text-sm font-bold text-navy-soft underline hover:text-orange"
        >
          Esqueci minha senha
        </button>
      </form>
    </Card>
  )
}

function ChangePasswordForm({ user }: { user: User }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('A nova senha precisa ter pelo menos 8 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não conferem.')
      return
    }
    setBusy(true)
    try {
      await updatePassword(user, password)
      await updateDoc(doc(db, 'admins', user.uid), { mustChangePassword: false })
    } catch (err) {
      setError(authErrorMessage((err as { code?: string }).code))
      setBusy(false)
    }
  }

  return (
    <Card eyebrow="PRIMEIRO ACESSO" title="Crie sua nova senha">
      <p className="mt-0 mb-6 text-[16px] leading-[1.55] text-navy-muted">
        Você entrou com uma senha temporária. Defina uma senha pessoal para continuar.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="email" autoComplete="username" value={user.email ?? ''} readOnly hidden />
        <Field label="Nova senha" htmlFor="new-password" hint="Mínimo de 8 caracteres.">
          <TextInput
            id="new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        <Field label="Confirme a nova senha" htmlFor="confirm-password">
          <TextInput
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
        </Field>
        {error && <Notice tone="error">{error}</Notice>}
        <Button type="submit" disabled={busy}>
          {busy ? 'Salvando…' : 'Salvar nova senha'}
        </Button>
      </form>
    </Card>
  )
}

export default function AdminApp() {
  const [state, setState] = useState<AdminState>({ kind: 'loading' })

  useEffect(() => {
    let unsubscribeAdmin: (() => void) | undefined

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeAdmin?.()
      unsubscribeAdmin = undefined

      if (!user) {
        setState({ kind: 'signed-out' })
        return
      }

      setState({ kind: 'loading' })
      const isRoot = user.email?.toLowerCase() === ROOT_ADMIN_EMAIL
      unsubscribeAdmin = onSnapshot(
        doc(db, 'admins', user.uid),
        (snapshot) => {
          const data = snapshot.data()
          if (data?.active === true || (isRoot && !snapshot.exists())) {
            if (data?.mustChangePassword === true) {
              setState({ kind: 'must-change', user })
            } else {
              setState({ kind: 'ready', user, role: isRoot ? 'admin' : roleOf(data) })
            }
          } else {
            setState({ kind: 'forbidden', user })
          }
        },
        () => setState({ kind: 'forbidden', user }),
      )
    })

    return () => {
      unsubscribeAdmin?.()
      unsubscribeAuth()
    }
  }, [])

  switch (state.kind) {
    case 'loading':
      return (
        <AdminShell>
          <p className="text-lg font-bold text-navy-soft">Carregando…</p>
        </AdminShell>
      )
    case 'signed-out':
      return (
        <AdminShell>
          <LoginForm />
        </AdminShell>
      )
    case 'forbidden':
      return (
        <AdminShell user={state.user}>
          <Card eyebrow="ACESSO NEGADO" title="Sem permissão">
            <p className="mt-0 mb-6 text-[16px] leading-[1.55] text-navy-muted">
              A conta <strong>{state.user.email}</strong> não tem acesso ao painel. Fale com um administrador.
            </p>
            <Button variant="secondary" onClick={() => signOut(auth)}>
              Sair
            </Button>
          </Card>
        </AdminShell>
      )
    case 'must-change':
      return (
        <AdminShell user={state.user}>
          <ChangePasswordForm user={state.user} />
        </AdminShell>
      )
    case 'ready':
      return (
        <AdminShell user={state.user}>
          <Dashboard user={state.user} role={state.role} />
        </AdminShell>
      )
  }
}
