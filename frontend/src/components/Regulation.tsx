export function Regulation() {
  return (
    <section id="regulamento" className="bg-teal text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 py-14 lg:flex-row lg:items-center lg:gap-12 lg:px-10">
        <div>
          <h2 className="mt-0 mb-2.5 font-display text-[32px] leading-[1.05] font-extrabold lg:text-[38px]">
            Regulamento da feira
          </h2>
          <p className="m-0 max-w-[640px] text-lg leading-[1.55] text-regulamento-muted">
            Regras de participação, critérios de avaliação e orientações para os projetos. O
            documento em PDF será disponibilizado aqui.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2.5 rounded-[14px] border border-dashed border-white/45 bg-white/14 px-7 py-[18px] text-base font-extrabold text-white">
          PDF em breve
        </span>
      </div>
    </section>
  )
}
