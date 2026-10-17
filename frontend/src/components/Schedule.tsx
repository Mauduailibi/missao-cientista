type Item = { time: string; title: string; detail?: string }

const periods: { name: string; accent: string; items: Item[] }[] = [
  {
    name: 'Manhã',
    accent: 'border-teal',
    items: [
      { time: '08h30', title: 'Abertura do evento' },
      { time: '09h00', title: 'Apresentações dos trabalhos' },
      { time: '09h00 às 11h00', title: 'Oficinas / Mesas redondas' },
    ],
  },
  {
    name: 'Almoço',
    accent: 'border-yellow',
    items: [{ time: '11h30 às 13h30', title: 'Intervalo para almoço', detail: 'Atração musical Susi Brito' }],
  },
  {
    name: 'Tarde',
    accent: 'border-sky',
    items: [
      { time: '13h30', title: 'Apresentações dos trabalhos' },
      { time: '14h00', title: 'Contação de história com a escritora', detail: 'Ieda Silva' },
      { time: '14h00 às 16h00', title: 'Oficinas' },
      { time: '15h00', title: 'Show da Física - UDESC CCT' },
      { time: '16h00', title: 'Palestra: Dra. Larissa Santos - Bariogênese' },
      { time: '16h30', title: 'Cerimônia de premiação' },
    ],
  },
  {
    name: 'Encerramento',
    accent: 'border-orange',
    items: [
      {
        time: '17h00',
        title: 'Lançamento do livro',
        detail: '“Udesc em Balneário Camboriú”, de Maria Ester Menegasso',
      },
    ],
  },
]

const oficinas = [
  'Cubo Mágico',
  'Foguetes',
  'Caça Asteróides (Sala 64)',
  'Complexidade Econômica: uma poderosa ferramenta de planejamento territorial',
  'A Geometria dos Origamis de Animais Marinhos',
  'Arte e Cultura Oceânica',
  'Clube de Cultura Oceânica',
  'Reduzir e Reciclar',
  'Missão Escape Lab',
  'Projeto Oceamo',
  'Entre dois Focos',
]

export function Schedule() {
  return (
    <section id="programacao" className="border-t border-navy/7 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-[78px] lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              PROGRAMAÇÃO
            </span>
            <h2 className="mt-[14px] mb-0 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[44px]">
              Programação do dia
            </h2>
          </div>
          <a
            href="/programacao-missao-cientista-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-[14px] border border-navy/15 bg-cream px-6 py-4 text-base font-extrabold text-navy transition-colors hover:border-orange hover:text-orange"
          >
            Baixar programação (PDF)
          </a>
        </div>

        <div className="mt-11 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-4">
            {periods.map((period) => (
              <div key={period.name} className={`rounded-[20px] border-l-4 bg-cream px-6 py-5 lg:px-8 ${period.accent}`}>
                <h3 className="m-0 text-xs font-extrabold tracking-[0.14em] text-label uppercase">{period.name}</h3>
                <ul className="m-0 mt-2 list-none p-0">
                  {period.items.map((item) => (
                    <li
                      key={item.time + item.title}
                      className="grid gap-1 border-b border-navy/8 py-3 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-4"
                    >
                      <span className="font-display text-[17px] font-bold text-teal">{item.time}</span>
                      <span>
                        <span className="block text-[17px] leading-[1.45] font-bold text-navy">{item.title}</span>
                        {item.detail && (
                          <span className="block text-[15px] leading-[1.45] text-navy-soft">{item.detail}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="m-0 font-display text-[28px] leading-[1.1] font-extrabold text-navy">Oficinas</h3>
            <p className="mt-2 mb-5 text-base leading-[1.55] text-navy-soft">
              Acontecem das 09h00 às 11h00 e das 14h00 às 16h00.
            </p>
            <ol className="m-0 list-none rounded-[20px] border border-navy/8 p-0 px-6">
              {oficinas.map((nome, i) => (
                <li
                  key={nome}
                  className="flex gap-4 border-b border-navy/8 py-3 text-base leading-[1.45] text-navy last:border-b-0"
                >
                  <span className="w-6 shrink-0 font-display font-bold text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {nome}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
