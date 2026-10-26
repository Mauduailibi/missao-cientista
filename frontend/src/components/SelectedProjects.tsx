const trabalhos = [
  'Katherine Johnson',
  'Lise Meitner',
  'Marie Curie (Importância de Mulheres na Ciência)',
  'Débora Garofalo',
  'Linha do Tempo do Átomo',
  'Água Viva: Poluição Hídrica e Conscientização',
  'A Importância da Hospitalidade em Unidades Públicas de Saúde: Estudo de Caso no Hospital Cirúrgico Camboriú',
  'Moda para Todos? A Inclusão de Pessoas com Deficiência nos Eventos de Moda',
  'Espécies de Plântulas Daninhas em Cultivo de Hortaliças',
  'Milho e Churros: Patrimônio Cultural e Imaterial de Balneário Camboriú',
  'Rota Láctea: Análise dos Diferentes Tipos de Leite Comercializados em Camboriú',
  'Turismo Verde: Experiências que Preservam',
  'O Agroturismo e a Tradição do Osterbaum Como Estratégias de Valorização da Comunidade Rural: Um Estudo de Caso no Município de Camboriú',
  'Análise Comparativa da Fitotoxicidade do Esterco de Avestruz em Processo de Biodigestão Anaeróbia e Compostagem',
  'Obtenção de Lactato de Butila a Partir de Matriz Contendo Açúcares Residuais: Aprimoramento de Metodologias de Esterificação e Separação',
  'Bioadsorvente Produzido a Partir da Casca de Banana para Remoção de Nitrogênio Amoniacal do Rio Camboriú',
  'Coleções Entomológicas Didáticas Sua Utilização como Proposta de Ensino através da Prática',
  'Paçoca Recheada, Doce Inovação: Desenvolvimento e Viabilidade Comercial de um Novo Produto para o Mercado de Camboriú/SC',
  'Geleias Artesanais: Análise de Viabilidade para uma Marca de Produção e Comercialização de Geleias Artesanais, Naturais e sem Conservantes',
  'Do Extremo Oeste ao Litoral: Análise da Viabilidade Econômica e Operacional de uma Fazenda Produtora de Camarão de Água Doce em Tijucas/SC',
  'Cunicultura Pet e Turismo de Experiência: Análise da Viabilidade para um Criatório de Coelhos de Companhia Integrado ao Turismo Rural em Pomerode - SC',
  'Mulheres que Leem, Mulheres que Escrevem: Relato sobre o Clube de Leitura Fridas e Lidas',
  'Design e Cooperativismo na Valorização da Agricultura Familiar: Estudo de Viabilidade de uma Cooperativa Regional em Camboriú',
  'Estudo de Viabilidade para Implantação Fictícia de uma Agroindústria de Xampus Naturais para Pets',
  'Apicultura em Regime de Consórcio com Proprietários Rurais: Análise de Viabilidade Técnica e Econômica da Produção de Mel e Subprodutos Apícolas no Município de Camboriú (SC)',
  'Copa do Mundo no Brasil: Avaliação dos Impactos da Copa do Mundo 2014 FIFA',
  'Clube de Astronomia: Caça Asteroides',
  'Monitoria de Física para o Curso Técnico em Química',
  'Análise do Descarte Inadequado de MDF e Propostas para Sua Gestão Sustentável',
  'Bioplástico de Arroz: Explorando Fronteiras da Tecnologia e Sustentabilidade',
  'Do Caule às Embalagens: Transformando Caule da Bananeira em Embalagens Biodegradáveis',
  'Orbithub',
  'A Palavra Como Remédio: A Biblioterapia e a Neurociência da Leitura no Cuidado da Saúde Mental',
  'DNA Além da Dupla Hélice: O Interruptor Molecular Desconhecido. Como a i-Motif e a G-quadruplex Podem Regular Genes e Abrir Novos Caminhos Contra o Câncer?',
  'ECOTEC² - Plataforma Educacional para Projetos Sustentáveis na Construção Civil',
  'ADA Kids: Criando Jogos para Aprender Brincando',
  'ADA Sinaliza: Sistema Inclusivo de Sinalização Escolar',
  'Dedução Lógica: Resolução de Problemas Matemáticos Através do Pensamento Computacional',
  'Bullying Não É Brincadeira: Uma Proposta Matemática e Pensamento Computacional',
  'Projeto COM-VIDA CAIC: Formação de Sujeitos Ecológicos ao Longo de Treze Anos',
  'Projeto Rizoma Conectando Saberes sobre Corais e Oceano',
  'Vasos e Objetos Decorativos a Partir de Papel Reciclado',
  'Probabilidade e Estatística na Copa do Mundo: Uma Investigação Matemática a Partir dos Palpites da Comunidade Escolar',
  'Quem Começou a História de Balneário Camboriú',
  'A Máquina de Testar: Será que Todos os Materiais Permitem a Passagem da Corrente Elétrica?',
  'Bengala Eletrônica para Deficientes Visuais',
  'Cidade Sustentável: Transformar Problemas em Soluções com Robótica Maker',
  'Desafio sobre Quatro Rodas: Como Fazer Nosso Carrinho Ir Mais Longe? Uma Investigação sobre Energia, Movimento e Construção de Soluções',
  'Disco de Newton Elétrico: Como a Velocidade de Rotação Interfere na Percepção das Sete Cores do Disco de Newton?',
  'H.I.D.R.O.: Hidromonitoramento Inteligente para Detecção de Riscos e Oscilações',
  'Horta Automatizada: Monitoramento da Umidade do Solo',
  'Missão Gota a Gota: Reaproveitando a Água da Chuva',
  'Se Mexer, o Alarme Avisa: Investigando um Sistema de Segurança com Arduino',
  'Boné Eletrônico: Investigação do Campo de Detecção de Obstáculos por Sensor Ultrassônico',
  'Delta Tech - Três Ambientes, uma Só Memória',
  'Estação Meteorológica Sustentável de Baixo Custo',
  'ReciclaBot - Aprendendo a Reciclar Brincando',
  'Rob - Robô Garçom',
  'Gerador de Eletricidade Estática Caseiro',
  'Sustentabilidade na Prática: Sabonetes Naturais e Reaproveitamento de Materiais',
  'O Impacto do Celular na Rotina dos Discentes: Uma Análise Matemática e Estatística',
  'O que Tem em Nossas Mãos?',
  'A Geometria dos Origamis de Animais Marinhos',
  'O Clube de Cultura Oceânica: Iniciação Científica e Protagonismo Juvenil em uma Escola Pública de Navegantes - SC',
  'O Projeto Cação e as Pesquisadoras de Tubarões do Brasil: Experiência de uma Escola Azul de Navegantes - SC',
  'Do Navio Falkor (TOO) à Sala de Aula: A Experiência do Programa Escola Azul de uma Escola Pública de Gaspar - SC',
  'Mares Sem Plástico: Sensibilização Estudantil por Meio da Arte e da Cultura Oceânica em Gaspar - SC',
  'Projeto Oceamo: Um Olhar Matemático sobre os Resíduos da Praia de Navegantes',
  'Importância Ecológica da Restinga: Uma Análise Socioambiental em Navegantes - SC',
  'Cosmético ComCiência: Da Matéria ao Mercado - Investigação Físico-Química, Tecnologia Cosmética e Sustentabilidade no 9º Ano',
  'Missão Terra x Marte: O que Torna a Terra um Planeta Vivo?',
  'O Espectro Invisível Revelado: Uma Abordagem Investigativa, Multissensorial e Inclusiva sobre Ondas e Radiações no Ensino Fundamental',
  'Velas Ecológicas: Da Química dos Resíduos ao Empreendedorismo Sustentável e Proteção dos Oceanos',
  'A Justa Medida do Turismo: Resiliência Territorial e Sustentabilidade em Penha/SC Diante das Mudanças Climáticas',
  'Quando as Cores Confundem: Detecção Escolar do Daltonismo Como Ferramenta de Inclusão',
  'Territórios Turísticos Resilientes: A Acessibilidade Comunicacional em Libras Como Promovente de Saúde e Qualidade de Vida na Hotelaria de Penha/SC',
  'Uma Interpretação do Racionalismo de Descartes em Elisabeth da Boêmia',
  'Marivive e Alecrina: Mais do que uma Aventura pela Mata Atlântica',
  'Modelagem Matemática e Automação: Desenvolvimento da Torneira Auto-Faucet 1.0',
  'O Resgate do Brincar: Construção de Brinquedos Usando Sucata e Modelagem 3D',
  'Diagnósticos de Câncer em Itapema/SC: Uma Análise dos Números e Encaminhamentos',
  'Os Impactos da Obesidade no Psicológico Humano',
  'Quando a Arte Encontra o Mar: Uma Outra Forma de Pensar a Educação Ambiental',
]

export function SelectedProjects() {
  return (
    <section id="trabalhos" className="border-t border-navy/7 bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-[78px] lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
          <div>
            <span className="inline-block text-[13px] font-extrabold tracking-[0.16em] text-teal">
              TRABALHOS
            </span>
            <h2 className="mt-[14px] mb-0 font-display text-[36px] leading-[1.05] font-extrabold text-navy lg:text-[44px]">
              Trabalhos selecionados
            </h2>
            <p className="mt-3 mb-0 max-w-[640px] text-lg leading-[1.55] text-navy-soft">
              {trabalhos.length} trabalhos confirmados para apresentação na feira.
            </p>
          </div>
          <a
            href="/trabalhos-selecionados-missao-cientista-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-[14px] border border-navy/15 bg-white px-6 py-4 text-base font-extrabold text-navy transition-colors hover:border-orange hover:text-orange"
          >
            Baixar lista (PDF)
          </a>
        </div>

        <ol className="m-0 mt-11 list-none rounded-[20px] border border-navy/8 bg-white p-0 px-6 lg:columns-2 lg:gap-12 lg:px-8">
          {trabalhos.map((titulo, i) => (
            <li
              key={titulo}
              className="flex break-inside-avoid gap-4 border-b border-navy/8 py-3 text-base leading-[1.45] text-navy last:border-b-0"
            >
              <span className="w-6 shrink-0 font-display font-bold text-orange">
                {String(i + 1).padStart(2, '0')}
              </span>
              {titulo}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
