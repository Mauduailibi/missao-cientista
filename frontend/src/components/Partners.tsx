import cnpq from '../assets/logo-cnpq.svg'
import udesc from '../assets/logo-udesc.svg'

const partners = [
  { name: 'UDESC', logo: udesc },
  { name: 'CNPq', logo: cnpq },
]

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
        <ul className="m-0 mt-9 grid list-none grid-cols-2 gap-5 p-0 sm:flex sm:flex-wrap">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="flex h-[140px] items-center justify-center rounded-2xl border border-navy/8 bg-white p-5 sm:w-[260px]"
            >
              <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
