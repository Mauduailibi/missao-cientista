import { LogoMark } from './LogoMark'

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-cream">
      <span className="absolute top-[-120px] right-[-100px] block size-[420px] rounded-full bg-hero-glow" />
      <span className="absolute bottom-[60px] left-[-80px] block size-[260px] rounded-full bg-orange/8" />
      <div className="relative mx-auto grid w-full min-w-0 max-w-[1200px] items-center gap-10 px-6 py-[76px] pb-[84px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10">
        <div className="min-w-0">
          <span className="inline-block rounded-full bg-teal px-[18px] py-2 font-display text-[15px] font-bold tracking-[0.12em] text-white">
            VEM AÍ! · 1ª EDIÇÃO
          </span>
          <h1 className="mt-[22px] mb-0 font-display text-[42px] leading-[0.95] font-extrabold tracking-[-0.01em] text-balance text-navy sm:text-[56px] lg:text-[78px]">
            Feira de Ciências
            <br />
            <span className="text-orange">Missão Cientista</span>
          </h1>
          <p className="mt-[22px] w-full max-w-full text-[19px] leading-[1.45] font-semibold break-words text-navy-muted lg:max-w-[520px] lg:text-[23px]">
            Descobrir hoje, transformar o amanhã. Um dia inteiro de ciência, criatividade e
            colaboração na Udesc Balneário Camboriú.
          </p>
          <div className="mt-[34px] flex flex-col items-stretch gap-[14px] sm:flex-row sm:items-center">
            <a
              href="#participar"
              className="inline-block rounded-[14px] bg-orange px-[30px] py-[17px] text-center text-[17px] font-extrabold text-white shadow-cta hover:translate-y-[2px] hover:text-white hover:shadow-cta-pressed"
            >
              Quero participar
            </a>
            <a
              href="#regulamento"
              className="inline-block rounded-[14px] border-2 border-navy/22 bg-transparent px-7 py-[17px] text-center text-[17px] font-extrabold text-navy hover:border-navy hover:text-navy"
            >
              Ler o regulamento
            </a>
          </div>
          <div className="mt-10 flex min-w-0 flex-col gap-6 border-t border-navy/12 pt-[26px] lg:flex-row lg:gap-10">
            <div>
              <div className="text-xs font-extrabold tracking-[0.14em] text-label">DATA</div>
              <div className="font-display text-[26px] font-bold text-navy">27 de outubro de 2026</div>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold tracking-[0.14em] text-label">LOCAL</div>
              <div className="font-display text-[22px] font-bold break-words text-navy lg:text-[26px]">
                Udesc CESFI · Balneário Camboriú
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <LogoMark
            className="size-[280px] shadow-hero animate-mcfloat sm:size-[360px] lg:size-[420px]"
            alt="Logo da Feira de Ciências Missão Cientista"
          />
        </div>
      </div>
    </section>
  )
}
