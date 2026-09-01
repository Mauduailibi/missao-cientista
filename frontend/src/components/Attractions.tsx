const attractions = [
  {
    n: '01',
    badge: 'bg-teal',
    title: 'Apresentação dos trabalhos',
    text: 'Alunos apresentando ideias, projetos e soluções para um mundo melhor.',
  },
  {
    n: '02',
    badge: 'bg-orange',
    title: 'Oficinas',
    text: 'Atividades práticas, interativas e cheias de descobertas.',
  },
  {
    n: '03',
    badge: 'bg-navy',
    title: 'Feira de livros',
    text: 'Livros que inspiram, informam e transformam.',
  },
  {
    n: '04',
    badge: 'bg-sky',
    title: 'Palestras',
    text: 'Convidados especiais para ampliar conhecimentos e inspirar.',
  },
]

export function Attractions() {
  return (
    <section id="atracoes" className="border-y border-navy/7 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-[88px] lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              ATRAÇÕES
            </span>
            <h2 className="mt-[14px] mb-0 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[46px]">
              O que acontece no dia
            </h2>
          </div>
          <p className="m-0 max-w-[380px] text-[17px] leading-[1.55] text-navy-soft">
            Ciência, criatividade e colaboração reunidas em um dia inesquecível.
          </p>
        </div>
        <div className="mt-11 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {attractions.map((item) => (
            <div
              key={item.n}
              className="rounded-[22px] border border-navy/7 bg-cream px-[26px] pt-[30px] pb-8 hover:-translate-y-1"
            >
              <span
                className={`flex size-14 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white ${item.badge}`}
              >
                {item.n}
              </span>
              <h3 className="mt-[22px] mb-2.5 font-display text-[25px] leading-[1.1] font-bold text-navy">
                {item.title}
              </h3>
              <p className="m-0 text-base leading-[1.55] text-navy-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
