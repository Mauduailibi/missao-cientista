import { LogoMark } from './LogoMark'

export function Footer() {
  return (
    <footer id="contato" className="bg-navy text-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-[70px] pb-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-[14px]">
              <LogoMark className="size-16" />
              <span className="font-display text-2xl leading-[1.05] font-extrabold">
                MISSÃO
                <br />
                CIENTISTA
              </span>
            </div>
            <p className="mt-[22px] mb-0 max-w-[340px] text-lg leading-[1.55] text-footer-muted">
              Participe, mostre seu talento e faça parte de uma grande missão: a ciência.
            </p>
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-[0.14em] text-sky-light">CONTATO</div>
            <div className="mt-4 flex flex-col gap-3 text-[17px] font-bold">
              <a
                href="mailto:missaocientistaudesc@gmail.com"
                className="text-white hover:text-yellow"
              >
                missaocientistaudesc@gmail.com
              </a>
              <a href="https://wa.me/5547997878533" className="text-white hover:text-yellow">
                WhatsApp (47) 99787-8533
              </a>
              <a
                href="https://www.instagram.com/missaocientista/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow"
              >
                Instagram @missaocientista
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-[0.14em] text-sky-light">REALIZAÇÃO</div>
            <div className="mt-4 text-[17px] leading-[1.5] font-bold text-footer-body">
              Udesc — Universidade do Estado de Santa Catarina
              <br />
              <span className="font-semibold text-footer-muted">CESFI · Balneário Camboriú</span>
            </div>
          </div>
        </div>
        <div className="mt-11 flex flex-col justify-between gap-4 border-t border-white/14 pt-[22px] text-sm text-inscricoes-hint sm:flex-row sm:gap-6">
          <span>Feira de Ciências Missão Cientista · 27 de outubro de 2026</span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <span>Udesc Balneário Camboriú</span>
            <a href="/admin" className="font-bold text-inscricoes-hint underline-offset-4 hover:text-yellow hover:underline">
              Painel administrativo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
