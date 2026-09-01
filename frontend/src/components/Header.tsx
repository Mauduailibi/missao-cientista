import { useEffect, useId, useState } from 'react'
import { LogoMark } from './LogoMark'

const navItems = [
  { href: '#sobre', label: 'O evento' },
  { href: '#atracoes', label: 'Atrações' },
  { href: '#participar', label: 'Quem participa' },
  { href: '#premiacao', label: 'Premiação' },
  { href: '#local', label: 'Local' },
  { href: '#contato', label: 'Contato' },
]

const itemAccents = [
  'bg-teal',
  'bg-orange',
  'bg-yellow',
  'bg-sky',
  'bg-teal',
  'bg-orange',
] as const

function InscricoesBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-[18px] py-[11px] text-[14px] font-extrabold whitespace-nowrap text-white">
      <span className="block size-2 rounded-full bg-yellow" />
      Inscrições em 15/09
    </span>
  )
}

function MenuToggle({ open, onClick, controls }: { open: boolean; onClick: () => void; controls: string }) {
  return (
    <button
      type="button"
      className="relative flex size-11 items-center justify-center rounded-full lg:hidden"
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
    >
      <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
      <span className="relative block h-[14px] w-[22px]">
        <span
          className={`absolute top-0 left-0 h-[2px] w-full rounded-full transition-all duration-300 ${
            open ? 'translate-y-[6px] rotate-45 bg-white' : 'bg-navy'
          }`}
        />
        <span
          className={`absolute top-[6px] left-0 h-[2px] w-full rounded-full transition-all duration-300 ${
            open ? 'scale-x-0 opacity-0 bg-white' : 'bg-navy'
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full transition-all duration-300 ${
            open ? '-translate-y-[6px] -rotate-45 bg-white' : 'bg-navy'
          }`}
        />
      </span>
    </button>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-[80] border-b transition-colors duration-500 ${
          open
            ? 'border-white/10 bg-navy lg:border-navy/10 lg:bg-cream/92 lg:backdrop-blur-[10px]'
            : 'border-navy/10 bg-cream/92 backdrop-blur-[10px]'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-6 py-3 lg:gap-8 lg:px-10">
          <a
            href="#topo"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="size-[52px]" />
            <span
              className={`block font-display text-[17px] font-extrabold leading-[1.05] tracking-[0.01em] transition-colors duration-500 ${
                open ? 'text-white lg:text-navy' : 'text-navy'
              }`}
            >
              MISSÃO
              <br />
              CIENTISTA
            </span>
          </a>
          <nav className="ml-auto hidden items-center gap-7 text-[15px] font-bold text-navy lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-navy hover:text-orange">
                {item.label}
              </a>
            ))}
            <InscricoesBadge />
          </nav>
          <div className="ml-auto lg:hidden">
            <MenuToggle open={open} onClick={() => setOpen((value) => !value)} controls={menuId} />
          </div>
        </div>
      </header>

      <div
        id={menuId}
        className={`mobile-menu fixed inset-0 z-[70] lg:hidden ${open ? 'is-open' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-navy" />
        <span className="absolute top-[-80px] right-[-60px] block size-[280px] rounded-full bg-sky/20" />
        <span className="absolute bottom-[80px] left-[-90px] block size-[220px] rounded-full bg-orange/15" />
        <span className="absolute right-10 bottom-32 block size-3 rounded-full bg-yellow" />

        <div className="relative flex h-full flex-col px-6 pt-24 pb-10">
          <p
            className={`font-display text-[13px] font-extrabold tracking-[0.16em] text-sky-light transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: open ? '180ms' : '0ms' }}
          >
            NAVEGAÇÃO
          </p>

          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-[16px] px-1 py-3 text-white transition-all duration-500 hover:text-yellow ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${220 + index * 55}ms` : '0ms' }}
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-xl font-display text-[15px] font-extrabold text-white ${itemAccents[index]}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[28px] leading-none font-extrabold">{item.label}</span>
              </a>
            ))}
          </nav>

          <div
            className={`mt-auto flex flex-col gap-4 border-t border-white/14 pt-6 transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '520ms' : '0ms' }}
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[13px] font-extrabold text-white">
              <span className="block size-2 rounded-full bg-yellow" />
              Inscrições em 15/09
            </span>
            <a
              href="#participar"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-[14px] bg-orange px-6 py-4 text-[16px] font-extrabold text-white shadow-cta hover:translate-y-[2px] hover:text-white hover:shadow-cta-pressed"
            >
              Quero participar
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
