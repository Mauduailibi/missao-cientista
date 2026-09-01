export function About() {
  return (
    <section id="sobre" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-[88px] lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[70px]">
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              O EVENTO
            </span>
            <h2 className="mt-[14px] mb-0 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[46px]">
              Uma feira feita para quem tem curiosidade
            </h2>
          </div>
          <div>
            <p className="m-0 text-xl leading-[1.6] text-pretty text-navy-muted">
              A Feira de Ciências Missão Cientista reúne estudantes da educação infantil, do ensino
              fundamental e do ensino médio de escolas públicas e privadas para apresentar projetos,
              trocar ideias e mostrar soluções para um mundo melhor.
            </p>
            <p className="mt-[18px] mb-0 text-xl leading-[1.6] text-pretty text-navy-muted">
              Durante o dia acontecem apresentações dos trabalhos, oficinas práticas, feira de livros
              e palestras com convidados especiais. Tudo em um só lugar: o campus da Udesc em
              Balneário Camboriú.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-navy/8 bg-white p-5">
                <div className="font-display text-[32px] font-extrabold text-orange">4</div>
                <div className="mt-1 text-[15px] font-bold text-navy-muted">categorias premiadas</div>
              </div>
              <div className="rounded-2xl border border-navy/8 bg-white p-5">
                <div className="font-display text-[32px] font-extrabold text-teal">4</div>
                <div className="mt-1 text-[15px] font-bold text-navy-muted">atrações no mesmo dia</div>
              </div>
              <div className="rounded-2xl border border-navy/8 bg-white p-5">
                <div className="font-display text-[32px] font-extrabold text-sky">1</div>
                <div className="mt-1 text-[15px] font-bold text-navy-muted">campus, todas as idades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
