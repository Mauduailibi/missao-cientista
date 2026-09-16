import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { type FormEvent, type ReactNode, useState } from 'react'
import { Footer } from '../components/Footer'
import { Button, Combobox, Field, Notice, RadioGroup, TextArea, TextInput } from '../components/form/fields'
import { Header } from '../components/Header'
import { db } from '../lib/firebase'
import { useFormStatus } from '../lib/formStatus'
import { MUNICIPIOS_SC } from '../lib/municipiosSC'
import { MAX_PARTICIPANTES, MAX_RESUMO, NIVEL_LABELS, type Nivel } from '../lib/inscricao'

type YesNo = 'sim' | 'nao'

const yesNoOptions: { value: YesNo; label: string }[] = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
]

const nivelOptions = (Object.keys(NIVEL_LABELS) as Nivel[]).map((value) => ({
  value,
  label: NIVEL_LABELS[value],
}))

const PHONE_PATTERN = /^\(\d{2}\) \d{5}-\d{4}$/

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const emptyForm = {
  participantes: [''],
  orientadorNome: '',
  orientadorEmail: '',
  orientadorTelefone: '',
  instituicao: '',
  nivel: '' as Nivel | '',
  municipio: '',
  titulo: '',
  resumo: '',
  cienciaDelas: '' as YesNo | '',
  energiaEletrica: '' as YesNo | '',
  precisaEspaco: '' as YesNo | '',
  espacoEspecial: '',
  autorizaImagem: false,
}

function Section({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[20px] border border-navy/8 bg-white p-6 lg:p-9">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-navy font-display text-[15px] font-extrabold text-white">
          {step}
        </span>
        <h2 className="m-0 font-display text-[24px] leading-none font-extrabold text-navy lg:text-[28px]">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  )
}

function StatusCard({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-navy px-8 py-10 text-white lg:px-11 lg:py-[46px]">
      <span className="absolute top-[-70px] right-[-70px] block size-[220px] rounded-full bg-sky/22" />
      <div className="relative">
        <span className="inline-block rounded-full bg-yellow px-4 py-[7px] font-display text-sm font-extrabold tracking-[0.12em] text-navy">
          {eyebrow}
        </span>
        <h2 className="mt-5 mb-3 font-display text-[32px] leading-[1.05] font-extrabold lg:text-[40px]">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default function InscricaoPage() {
  const status = useFormStatus()
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((current) => ({ ...current, [key]: value }))

  const setParticipante = (index: number, value: string) =>
    set(
      'participantes',
      form.participantes.map((item, i) => (i === index ? value : item)),
    )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    const participantes = form.participantes.map((item) => item.trim()).filter(Boolean)
    if (participantes.length === 0) {
      setError('Informe o nome de pelo menos um integrante.')
      return
    }
    if (!form.municipio) {
      setError('Selecione o município na lista de municípios de Santa Catarina.')
      return
    }
    if (!PHONE_PATTERN.test(form.orientadorTelefone)) {
      setError('Informe o telefone do orientador com DDD no formato (XX) XXXXX-XXXX.')
      return
    }
    if (!form.autorizaImagem) {
      setError('É necessário autorizar a divulgação de imagens para concluir a inscrição.')
      return
    }

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'inscricoes'), {
        participantes,
        orientadorNome: form.orientadorNome.trim(),
        orientadorEmail: form.orientadorEmail.trim().toLowerCase(),
        orientadorTelefone: form.orientadorTelefone,
        instituicao: form.instituicao.trim(),
        nivel: form.nivel,
        municipio: form.municipio,
        titulo: form.titulo.trim(),
        resumo: form.resumo.trim(),
        cienciaDelas: form.cienciaDelas === 'sim',
        energiaEletrica: form.energiaEletrica === 'sim',
        espacoEspecial: form.precisaEspaco === 'sim' ? form.espacoEspecial.trim() : '',
        autorizaImagem: true,
        createdAt: serverTimestamp(),
      })
      setDone(true)
      window.scrollTo({ top: 0 })
    } catch (err) {
      const code = (err as { code?: string }).code
      setError(
        code === 'permission-denied'
          ? 'Não foi possível enviar: as inscrições podem ter sido encerradas ou algum campo está inválido.'
          : 'Não foi possível enviar a inscrição. Verifique sua conexão e tente novamente.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  let content: ReactNode
  if (done) {
    content = (
      <StatusCard eyebrow="INSCRIÇÃO ENVIADA" title={<>Tudo certo, <span className="text-yellow">missão aceita!</span></>}>
        <p className="mt-0 mb-[26px] text-lg leading-[1.55] text-inscricoes-muted">
          Recebemos a inscrição do trabalho <strong className="text-white">“{form.titulo.trim()}”</strong>. A comissão
          organizadora entrará em contato pelo e-mail do professor orientador.
        </p>
        <a
          href="/"
          className="inline-flex items-center rounded-[14px] bg-orange px-6 py-4 text-[16px] font-extrabold text-white shadow-cta hover:translate-y-[2px] hover:text-white hover:shadow-cta-pressed"
        >
          Voltar ao site
        </a>
      </StatusCard>
    )
  } else if (status === 'loading') {
    content = <p className="text-lg font-bold text-navy-soft">Carregando formulário…</p>
  } else if (status === 'closed') {
    content = (
      <StatusCard eyebrow="INSCRIÇÕES" title={<>Formulário <span className="text-yellow">fechado</span></>}>
        <p className="mt-0 mb-0 text-lg leading-[1.55] text-inscricoes-muted">
          As inscrições não estão abertas no momento. Dúvidas? Escreva para{' '}
          <a href="mailto:missaocientistaudesc@gmail.com" className="text-yellow hover:text-yellow">
            missaocientistaudesc@gmail.com
          </a>
        </p>
      </StatusCard>
    )
  } else {
    content = (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Section step="01" title="Equipe">
          <div className="flex flex-col gap-3">
            {form.participantes.map((nome, index) => (
              <Field
                key={index}
                label={`Integrante ${index + 1}`}
                htmlFor={`participante-${index}`}
                required={index === 0}
              >
                <div className="flex gap-2">
                  <TextInput
                    id={`participante-${index}`}
                    value={nome}
                    maxLength={200}
                    required={index === 0}
                    autoComplete="off"
                    placeholder="Nome completo"
                    onChange={(event) => setParticipante(index, event.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      variant="secondary"
                      aria-label={`Remover integrante ${index + 1}`}
                      className="px-4"
                      onClick={() =>
                        set(
                          'participantes',
                          form.participantes.filter((_, i) => i !== index),
                        )
                      }
                    >
                      ✕
                    </Button>
                  )}
                </div>
              </Field>
            ))}
            {form.participantes.length < MAX_PARTICIPANTES && (
              <Button
                variant="secondary"
                className="self-start"
                onClick={() => set('participantes', [...form.participantes, ''])}
              >
                + Adicionar integrante
              </Button>
            )}
            <p className="m-0 text-sm text-navy-soft">Até {MAX_PARTICIPANTES} integrantes por equipe.</p>
          </div>
        </Section>

        <Section step="02" title="Professor orientador">
          <Field label="Nome do professor orientador" htmlFor="orientadorNome" required>
            <TextInput
              id="orientadorNome"
              value={form.orientadorNome}
              maxLength={200}
              required
              autoComplete="name"
              onChange={(event) => set('orientadorNome', event.target.value)}
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="E-mail do orientador" htmlFor="orientadorEmail" required>
              <TextInput
                id="orientadorEmail"
                type="email"
                value={form.orientadorEmail}
                maxLength={200}
                required
                autoComplete="email"
                onChange={(event) => set('orientadorEmail', event.target.value)}
              />
            </Field>
            <Field label="Telefone do orientador" htmlFor="orientadorTelefone" required>
              <TextInput
                id="orientadorTelefone"
                type="tel"
                inputMode="numeric"
                value={form.orientadorTelefone}
                maxLength={15}
                pattern="\(\d{2}\) \d{5}-\d{4}"
                title="Telefone com DDD no formato (XX) XXXXX-XXXX"
                required
                autoComplete="tel-national"
                placeholder="(47) 99999-9999"
                onChange={(event) => set('orientadorTelefone', formatPhone(event.target.value))}
              />
            </Field>
          </div>
        </Section>

        <Section step="03" title="Escola">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Instituição de ensino" htmlFor="instituicao" required>
              <TextInput
                id="instituicao"
                value={form.instituicao}
                maxLength={300}
                required
                onChange={(event) => set('instituicao', event.target.value)}
              />
            </Field>
            <Field label="Município (SC)" htmlFor="municipio" required>
              <Combobox
                id="municipio"
                value={form.municipio}
                options={MUNICIPIOS_SC}
                required
                placeholder="Digite para buscar"
                emptyMessage="Nenhum município de SC encontrado."
                onChange={(value) => set('municipio', value)}
              />
            </Field>
          </div>
          <RadioGroup
            name="nivel"
            label="Nível de escolaridade"
            value={form.nivel}
            options={nivelOptions}
            required
            onChange={(value) => set('nivel', value)}
          />
        </Section>

        <Section step="04" title="Trabalho">
          <Field label="Título do trabalho" htmlFor="titulo" required>
            <TextInput
              id="titulo"
              value={form.titulo}
              maxLength={300}
              required
              onChange={(event) => set('titulo', event.target.value)}
            />
          </Field>
          <Field
            label="Resumo do trabalho"
            htmlFor="resumo"
            required
            hint={
              <span className={form.resumo.length >= MAX_RESUMO ? 'font-bold text-orange-shadow' : ''}>
                {form.resumo.length} / {MAX_RESUMO} caracteres
              </span>
            }
          >
            <TextArea
              id="resumo"
              value={form.resumo}
              maxLength={MAX_RESUMO}
              required
              rows={8}
              onChange={(event) => set('resumo', event.target.value)}
            />
          </Field>
          <RadioGroup
            name="cienciaDelas"
            label="O trabalho tem relação com a temática “Ciência Delas – Protagonismo feminino nas ciências”?"
            value={form.cienciaDelas}
            options={yesNoOptions}
            required
            onChange={(value) => set('cienciaDelas', value)}
          />
        </Section>

        <Section step="05" title="Apresentação na feira">
          <RadioGroup
            name="energiaEletrica"
            label="O projeto precisa de acesso à energia elétrica?"
            value={form.energiaEletrica}
            options={yesNoOptions}
            required
            onChange={(value) => set('energiaEletrica', value)}
          />
          <RadioGroup
            name="precisaEspaco"
            label="O projeto possui algum equipamento ou material que necessite de espaço especial?"
            value={form.precisaEspaco}
            options={yesNoOptions}
            required
            onChange={(value) => set('precisaEspaco', value)}
          />
          {form.precisaEspaco === 'sim' && (
            <Field label="Descreva o equipamento ou material" htmlFor="espacoEspecial" required>
              <TextArea
                id="espacoEspecial"
                value={form.espacoEspecial}
                maxLength={1000}
                required
                rows={4}
                onChange={(event) => set('espacoEspecial', event.target.value)}
              />
            </Field>
          )}
          <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-navy/15 bg-cream px-5 py-4">
            <input
              type="checkbox"
              checked={form.autorizaImagem}
              required
              onChange={(event) => set('autorizaImagem', event.target.checked)}
              className="mt-1 size-5 shrink-0 accent-orange"
            />
            <span className="text-[16px] leading-[1.5] font-bold text-navy">
              Autorizo a divulgação de imagens/vídeos do trabalho apresentado e dos integrantes da equipe na
              divulgação da feira. <span className="text-orange">*</span>
            </span>
          </label>
        </Section>

        {error && <Notice tone="error">{error}</Notice>}

        <Button type="submit" disabled={submitting} className="self-start px-8 py-4 text-[17px]">
          {submitting ? 'Enviando…' : 'Enviar inscrição'}
        </Button>
      </form>
    )
  }

  return (
    <div className="w-full">
      <Header />
      <main className="mx-auto max-w-[880px] px-6 py-[64px] lg:px-10 lg:py-[88px]">
        <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
          FEIRA MISSÃO CIENTISTA
        </span>
        <h1 className="mt-[14px] mb-[18px] font-display text-[40px] leading-[1.05] font-extrabold text-navy lg:text-[52px]">
          Formulário de inscrição
        </h1>
        {status === 'open' && !done ? (
          <p className="mt-0 mb-10 text-xl leading-[1.6] text-pretty text-navy-muted">
            Preencha os dados da equipe e do trabalho. Campos marcados com{' '}
            <span className="font-bold text-orange">*</span> são obrigatórios.
          </p>
        ) : (
          <div className="mb-10" />
        )}
        {content}
      </main>
      <Footer />
    </div>
  )
}
