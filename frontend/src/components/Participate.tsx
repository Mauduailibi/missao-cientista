const levels = [
  { label: 'Educação Infantil', dot: 'bg-teal' },
  { label: 'Ensino Fundamental', dot: 'bg-orange' },
  { label: 'Ensino Médio', dot: 'bg-sky' },
]

export function Participate() {
  return (
    <section id="participar" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-[88px] lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              QUEM PODE PARTICIPAR
            </span>
            <h2 className="mt-[14px] mb-[18px] font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[46px]">
              Alunos de escolas públicas e privadas
            </h2>
            <p className="mt-0 mb-7 text-xl leading-[1.6] text-pretty text-navy-muted">
              A participação é aberta a estudantes da educação infantil, do ensino fundamental e do
              ensino médio, acompanhados por um professor orientador.
            </p>
            <div className="flex flex-col gap-3">
              {levels.map((level) => (
                <div
                  key={level.label}
                  className="flex items-center gap-4 rounded-[14px] border border-navy/8 bg-white px-[22px] py-[18px]"
                >
                  <span className={`block size-3 shrink-0 rounded-full ${level.dot}`} />
                  <span className="text-[19px] font-extrabold text-navy">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            id="inscricoes"
            className="relative overflow-hidden rounded-[26px] bg-navy px-8 py-10 text-white lg:px-11 lg:py-[46px]"
          >
            <span className="absolute top-[-70px] right-[-70px] block size-[220px] rounded-full bg-sky/22" />
            <div className="relative">
              <span className="inline-block rounded-full bg-yellow px-4 py-[7px] font-display text-sm font-extrabold tracking-[0.12em] text-navy">
                INSCRIÇÕES
              </span>
              <h3 className="mt-5 mb-3 font-display text-[34px] leading-[1.03] font-extrabold lg:text-[42px]">
                Abrem em <span className="text-yellow">15 de setembro</span>
              </h3>
              <p className="mt-0 mb-[26px] text-lg leading-[1.55] text-inscricoes-muted">
                O formulário de inscrição será publicado aqui nesta página. Até lá, você já pode
                conhecer o regulamento e preparar o projeto com a sua turma.
              </p>
              <span className="inline-flex items-center gap-2.5 rounded-[14px] border border-dashed border-white/40 bg-white/12 px-[26px] py-4 text-base font-extrabold text-white">
                Formulário em breve
              </span>
              <p className="mt-[22px] mb-0 text-[15px] text-inscricoes-hint">
                Dúvidas? Escreva para{' '}
                <a
                  href="mailto:missaocientistaudesc@gmail.com"
                  className="text-yellow hover:text-yellow"
                >
                  missaocientistaudesc@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
