export function Schedule() {
  return (
    <section id="programacao" className="border-t border-navy/7 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-[78px] lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              PROGRAMAÇÃO
            </span>
            <h2 className="mt-[14px] mb-0 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[44px]">
              Horários em breve
            </h2>
          </div>
          <div className="rounded-[22px] border-2 border-dashed border-navy/18 bg-cream px-8 py-[38px] lg:px-9">
            <p className="m-0 text-[19px] leading-[1.6] text-navy-muted">
              A programação completa do dia — abertura, apresentações, oficinas, palestras e
              premiação — será publicada nesta página junto com a abertura das inscrições.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
