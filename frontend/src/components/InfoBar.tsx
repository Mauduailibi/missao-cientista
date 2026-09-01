export function InfoBar() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-6 px-6 py-[34px] lg:grid-cols-4 lg:gap-6 lg:px-10">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-extrabold tracking-[0.14em] text-sky-light">QUANDO</span>
          <span className="font-display text-[22px] font-bold">27/10/2026</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-extrabold tracking-[0.14em] text-sky-light">ONDE</span>
          <span className="font-display text-[22px] font-bold">Udesc CESFI</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-extrabold tracking-[0.14em] text-sky-light">INSCRIÇÕES</span>
          <span className="font-display text-[22px] font-bold text-yellow">A partir de 15/09</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-extrabold tracking-[0.14em] text-sky-light">PARTICIPAÇÃO</span>
          <span className="font-display text-[22px] font-bold">Gratuita</span>
        </div>
      </div>
    </section>
  )
}
