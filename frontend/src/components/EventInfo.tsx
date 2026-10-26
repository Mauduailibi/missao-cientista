const estande = [
  { label: 'Dimensões', text: '2 metros de largura por 1 metro de profundidade.' },
  { label: 'Mesa de apoio', text: 'Será disponibilizada uma mesa para cada equipe.' },
  {
    label: 'Personalização',
    text: 'As equipes poderão decorar e personalizar seus espaços com cartazes, banners e outros materiais relacionados ao projeto.',
  },
]

const restaurantes = [
  { nome: 'Restaurante Prensadão', detalhe: 'buffet livre e por quilo' },
  { nome: 'Padaria e Confeitaria Nane’s', detalhe: 'opção de prato feito' },
  { nome: 'Litoral Restaurante e Churrascaria', detalhe: 'opção de buffet livre' },
]

export function EventInfo() {
  return (
    <section id="informacoes" className="border-t border-navy/7 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-[78px] lg:px-10">
        <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
          INFORMAÇÕES
        </span>
        <h2 className="mt-[14px] mb-0 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[44px]">
          Informações para as equipes
        </h2>

        <div className="mt-11 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-[20px] border-l-4 border-teal bg-cream px-6 py-6 lg:px-8">
            <h3 className="m-0 font-display text-[26px] leading-[1.1] font-extrabold text-navy">Estandes</h3>
            <p className="mt-2 mb-2 text-base leading-[1.55] text-navy-soft">
              Cada equipe contará com um espaço para exposição do trabalho, com as seguintes características:
            </p>
            <ul className="m-0 list-none p-0">
              {estande.map((item) => (
                <li key={item.label} className="border-b border-navy/8 py-3 last:border-b-0">
                  <span className="block text-xs font-extrabold tracking-[0.14em] text-label uppercase">
                    {item.label}
                  </span>
                  <span className="block text-[17px] leading-[1.45] font-bold text-navy">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border-l-4 border-orange bg-cream px-6 py-6 lg:px-8">
            <h3 className="m-0 font-display text-[26px] leading-[1.1] font-extrabold text-navy">Alimentação</h3>
            <div className="mt-2 flex flex-col gap-3 text-base leading-[1.55] text-navy-muted">
              <p className="m-0">
                Para maior comodidade dos participantes, será oferecido um pequeno lanche nos períodos da manhã e da
                tarde.
              </p>
              <p className="m-0">
                Durante o intervalo para almoço, haverá <strong className="text-navy">food trucks</strong> no local,
                com opções de pastel, cachorro-quente e hambúrguer. O valor médio estimado é de R$ 25,00 por opção.
              </p>
              <p className="m-0">
                Quem preferir trazer sua própria refeição também poderá fazê-lo. Disponibilizaremos micro-ondas para
                aquecer os alimentos trazidos pelos participantes.
              </p>
              <p className="m-0">
                Para quem preferir almoçar em estabelecimentos próximos ao campus, seguem algumas sugestões:
              </p>
            </div>
            <ul className="m-0 mt-1 list-none p-0">
              {restaurantes.map((item) => (
                <li key={item.nome} className="border-b border-navy/8 py-3 last:border-b-0">
                  <span className="block text-[17px] leading-[1.45] font-bold text-navy">{item.nome}</span>
                  <span className="block text-[15px] leading-[1.45] text-navy-soft">{item.detalhe}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
