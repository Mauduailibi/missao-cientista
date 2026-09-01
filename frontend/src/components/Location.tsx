import campus from '../assets/cesfi.jpg'

export function Location() {
  return (
    <section id="local" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-[88px] lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="overflow-hidden rounded-3xl shadow-photo">
            <img
              src={campus}
              alt="Prédio do CESFI, campus da Udesc em Balneário Camboriú"
              className="block h-auto w-full"
            />
          </div>
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              LOCAL
            </span>
            <h2 className="mt-[14px] mb-[18px] font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[46px]">
              Udesc CESFI
              <br />
              Balneário Camboriú
            </h2>
            <p className="mt-0 mb-[26px] text-xl leading-[1.6] text-pretty text-navy-muted">
              A feira acontece no Centro de Educação Superior da Foz do Itajaí, campus da
              Universidade do Estado de Santa Catarina em Balneário Camboriú.
            </p>
            <div className="flex flex-col gap-[14px] border-t border-navy/12 pt-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-[14px]">
                <span className="w-[90px] shrink-0 text-xs font-extrabold tracking-[0.14em] text-label">
                  DATA
                </span>
                <span className="text-[19px] font-bold text-navy">
                  Terça-feira, 27 de outubro de 2026
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-[14px]">
                <span className="w-[90px] shrink-0 text-xs font-extrabold tracking-[0.14em] text-label">
                  CAMPUS
                </span>
                <span className="text-[19px] font-bold text-navy">
                  Udesc Balneário Camboriú — CESFI
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-[14px]">
                <span className="w-[90px] shrink-0 text-xs font-extrabold tracking-[0.14em] text-label">
                  ENTRADA
                </span>
                <span className="text-[19px] font-bold text-navy">Gratuita e aberta ao público</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
