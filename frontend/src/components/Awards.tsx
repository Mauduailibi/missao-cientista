const categories = [
  {
    n: 'CATEGORIA 1',
    title: 'Educação Infantil',
    box: 'border-teal/18 bg-award-teal-bg',
    label: 'text-teal',
    heading: 'text-navy',
  },
  {
    n: 'CATEGORIA 2',
    title: 'Ensino Fundamental',
    box: 'border-orange/22 bg-award-orange-bg',
    label: 'text-orange',
    heading: 'text-navy',
  },
  {
    n: 'CATEGORIA 3',
    title: 'Ensino Médio',
    box: 'border-sky/28 bg-award-sky-bg',
    label: 'text-sky-mid',
    heading: 'text-navy',
  },
  {
    n: 'CATEGORIA 4',
    title: 'Ciência Delas',
    box: 'border-navy bg-navy',
    label: 'text-yellow',
    heading: 'text-white',
  },
]

export function Awards() {
  return (
    <section id="premiacao" className="border-t border-navy/7 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-[88px] lg:px-10">
        <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
          PREMIAÇÃO
        </span>
        <h2 className="mt-[14px] mb-2 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[46px]">
          Quatro categorias
        </h2>
        <p className="m-0 text-[19px] text-navy-soft">
          Os melhores projetos são premiados em cada uma das categorias abaixo.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.n} className={`rounded-[20px] border px-[26px] py-[34px] ${cat.box}`}>
              <div className={`font-display text-[15px] font-extrabold tracking-[0.12em] ${cat.label}`}>
                {cat.n}
              </div>
              <h3
                className={`mt-3 mb-0 font-display text-[28px] leading-[1.08] font-bold ${cat.heading}`}
              >
                {cat.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
