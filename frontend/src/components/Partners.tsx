export function Partners() {
  return (
    <section id="parceiras" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-[78px] lg:px-10">
        <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
          EMPRESAS PARCEIRAS
        </span>
        <h2 className="mt-[14px] mb-2 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[44px]">
          Quem apoia a missão
        </h2>
        <p className="m-0 text-[19px] text-navy-soft">
          Sua empresa pode apoiar a feira. Escreva para{' '}
          <a href="mailto:missaocientistaudesc@gmail.com" className="text-orange hover:text-navy">
            missaocientistaudesc@gmail.com
          </a>
          .
        </p>
        <div className="mt-9 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex h-[110px] items-center justify-center rounded-2xl border border-navy/8 bg-partner-stripe font-mono text-xs tracking-[0.08em] text-partner-label"
            >
              logo parceira
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
