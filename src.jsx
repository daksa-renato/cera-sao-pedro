import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const nav = [['Conheça a Cerâmica', '/a-sao-pedro'], ['Feito à mão', '/feito-a-mao'], ['Produtos', '/produtos'], ['Download Catálogo', '/catalogo'], ['Qualidade', '/qualidade'], ['Para sua loja', '/para-sua-loja'], ['Arquitetura', '/arquitetura'], ['Entre em Contato', '/contato']];
const categories = [
  { slug: 'filtros', name: 'Filtros', note: 'O barro no centro da casa.', families: ['Tradicional', 'Acrílico', 'Elegance'] },
  { slug: 'talhas-e-moringas', name: 'Talhas e Moringas', note: 'Objetos que guardam memória.', families: ['Talhas', 'Moringas'] },
  { slug: 'vasos-e-decoracao', name: 'Vasos e Decoração', note: 'Textura natural para os ambientes.', families: ['Vasos para orquídeas', 'Marajoara'] },
  { slug: 'pet', name: 'Linha Pet', note: 'Cerâmica também para eles.', families: ['Comedouros', 'Bebedouros'] },
  { slug: 'suportes', name: 'Suporte para Galão', note: 'Um lugar para a água.', families: ['Suportes para galão'] },
  { slug: 'velas-e-acessorios', name: 'Velas e Acessórios', note: 'A reposição que traz o cliente de volta.', families: ['Velas', 'Torneiras', 'Boia'] },
  { slug: 'reposicao', name: 'Peças de Reposição', note: 'Mais vida para cada peça.', families: ['Cabeças', 'Tampas', 'Cubas'] },
];
const seals = [['INMETRO', 'Certificação para os filtros', 'Consulte a identificação e a documentação aplicáveis a cada modelo com o comercial.'], ['Atóxica', 'Cerâmica para filtros e pet', 'Informação da linha cerâmica para filtros e produtos pet. Consulte as especificações da peça.'], ['BPA Free', 'Linha acrílica', 'Característica da linha acrílica. Solicite a ficha do modelo para a composição completa.'], ['Feito à mão', 'Modelagem artesanal', 'Cada peça de barro passa pelo trabalho manual do oleiro.'], ['Natural', 'A origem da cerâmica', 'Argila, água e um processo que respeita o tempo da matéria.'], ['Bem embalada', 'Cuidado no transporte', 'Embalagem comercial preparada para acompanhar a peça até o ponto de venda.']];
const process = ['Preparação da argila', 'Centralização no torno', 'Abertura da massa', 'Modelagem das paredes', 'Definição da borda', 'Secagem natural', 'Queima', 'Acabamento e embalagem'];
const scenes = ['Antes de ser filtro, é terra.', 'Antes de ser forma, é mão.', 'A cada volta, um gesto.', 'O tempo encontra a matéria.', 'Feito à mão. Para a sua loja.'];
const contactEmail = 'centerartceramica@bol.com.br';

function ButtonLabel({ children }) {
  return <span className="button-label">
    <span className="button-label-regular">{children}</span>
    <strong className="button-label-bold" aria-hidden="true">{children}</strong>
  </span>;
}
function Button({ href, children, pale = false }) {
  return <a className={`button ${pale ? 'pale' : ''}`} href={href}><ButtonLabel>{children}</ButtonLabel><span aria-hidden="true">↗</span></a>;
}
function Mark({ compact = false, stacked = false }) {
  if (stacked) {
    return <a className="stacked-wordmark" href="/">
      <strong>SÃO PEDRO CERÂMICA</strong>
      <span>CERÂMICA CENTER ART&nbsp;•&nbsp;1985</span>
    </a>;
  }
  return compact ? <a className="wordmark" href="/">São Pedro<span>CERÂMICA · DESDE 1985</span></a> : <a href="/" className="brand" aria-label="São Pedro, início"><img src="/brand/emblema.webp" alt="Filtro São Pedro, desde 1985" /><img className="brand-original" src="/brand/emblema-colorido.webp" alt="" aria-hidden="true" /></a>;
}
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 150);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const links = (items) => items.map(([name, href]) => <a key={href} href={href} aria-current={location.pathname === href ? 'page' : undefined}>{name}</a>);
  return <><a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <header className={`masthead ${scrolled ? 'departed' : ''}`}><nav aria-label="Institucional">{links(nav.slice(0, 4))}</nav><Mark /><nav aria-label="Comercial">{links(nav.slice(4, -1))}<a className="nav-contact" href="/contato">Entre em Contato ↗</a></nav></header>
    <header className={`floating ${scrolled ? 'visible' : ''}`} aria-hidden={!scrolled} inert={!scrolled ? true : undefined}><nav aria-label="Menu compacto, institucional">{links(nav.slice(0, 4))}</nav><Mark /><nav aria-label="Menu compacto, comercial">{links(nav.slice(4, -1))}<a className="small-cta" href="/contato">Entre em Contato ↗</a></nav></header>
    <div className={`mobile-bar ${scrolled || open ? 'scrolled' : ''}`}><Mark stacked /><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile">{open ? 'Fechar −' : 'Menu +'}</button></div>
    {open && <nav className="mobile-menu" id="menu-mobile" aria-label="Menu móvel">{links(nav)}</nav>}
  </>;
}
function Reveal({ children, className = '', ...props }) {
  return <div className={`reveal ${className}`} {...props}>{children}</div>;
}
const contactQuestions = [
  { key: 'name', label: 'Como podemos chamar você?', hint: 'Queremos conhecer quem está por trás da sua loja.', placeholder: 'Seu nome', type: 'text', autoComplete: 'name' },
  { key: 'cnpj', label: 'Qual é o CNPJ da sua empresa?', hint: 'Nosso atendimento é exclusivo para lojistas e empresas.', placeholder: '00.000.000/0000-00', type: 'text', autoComplete: 'off' },
  { key: 'email', label: 'E o seu melhor e-mail?', hint: 'Um contato para continuarmos a conversa.', placeholder: 'voce@empresa.com.br', type: 'email', autoComplete: 'email' },
];

function Commercial({ catalog = false }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ name: '', cnpj: '', email: '' });
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const [direction, setDirection] = useState('next');
  const input = useRef(null);
  const interacted = useRef(false);
  const question = contactQuestions[step];

  useEffect(() => {
    if (interacted.current && started && !complete) input.current?.focus({ preventScroll: true });
  }, [step, complete, started]);

  function submit(event) {
    event.preventDefault();
    const value = answers[question.key].trim();
    if (!value) { setError('Preencha sua resposta para continuar.'); return; }
    if (question.key === 'cnpj' && !validCnpj(value.replace(/\D/g, ''))) {
      setError('Confira os 14 dígitos do CNPJ e tente novamente.'); return;
    }
    setError(''); interacted.current = true; setDirection('next');
    if (step === contactQuestions.length - 1) setComplete(true);
    else setStep(step + 1);
  }

  function back() {
    setError(''); interacted.current = true; setDirection('back');
    setStep(Math.max(0, step - 1));
  }

  return <section className="conversation section" id="comercial" aria-label={catalog ? 'Solicitar catálogo' : 'Contato para lojistas'}>
    <div className="conversation-top"><span className="eyebrow">SÃO PEDRO / {catalog ? 'CATÁLOGO PARA SUA LOJA' : 'UMA CONVERSA ENTRE NEGÓCIOS'}</span><span className="mono">{!started ? 'PARA LOJISTAS E DISTRIBUIDORES' : complete ? 'CONCLUÍDO' : `0${step + 1} / 03`}</span></div>
    {started && <div className="conversation-progress" role="progressbar" aria-label="Progresso do formulário" aria-valuemin={0} aria-valuemax={3} aria-valuenow={complete ? 3 : step} aria-valuetext={complete ? 'Teste concluído' : `Pergunta ${step + 1} de 3`}><span style={{ width: `${(complete ? 3 : step) / 3 * 100}%` }} /></div>}
    {!started ? <div className="conversation-welcome"><span className="eyebrow">FEITO À MÃO. PRONTO PARA A SUA PRATELEIRA.</span><h2>Tenha Filtros São Pedro<br /><em>na sua loja.</em></h2><p>Vamos conversar sobre o mix e as possibilidades para o seu negócio.</p><button className="button pale" type="button" onClick={() => { interacted.current = true; setStarted(true); }}><ButtonLabel>Entrar em contato</ButtonLabel><span aria-hidden="true">↗</span></button><span className="welcome-note mono">TRÊS PERGUNTAS PARA COMEÇAR.</span></div> : complete ? <div className="conversation-finish" role="status"><span className="eyebrow">OBRIGADO PELA CONVERSA</span><h2>Prazer em conhecer<br />você, <em>{answers.name.trim().split(/\s+/)[0]}.</em></h2><p>Você concluiu as três perguntas. Este é um teste de navegação, e as respostas ficam apenas nesta página.</p><div className="conversation-summary"><span>Nome <strong>{answers.name}</strong></span><span>CNPJ <strong>{answers.cnpj}</strong></span><span>E-mail <strong>{answers.email}</strong></span></div><button className="button pale" type="button" onClick={() => { setComplete(false); setStep(0); setDirection('back'); }}><ButtonLabel>Revisar respostas</ButtonLabel><span aria-hidden="true">↶</span></button></div> :
      <form className="conversation-form" onSubmit={submit}>
        <div key={step} className={`question-slide ${direction}`}>
          <span className="question-number mono">0{step + 1} <span aria-hidden="true">→</span></span>
          <label htmlFor="conversation-answer">{question.label}</label>
          <p id="question-hint">{question.hint}</p>
          <input ref={input} id="conversation-answer" name={question.key} type={question.type} inputMode={question.key === 'cnpj' ? 'numeric' : question.type === 'email' ? 'email' : 'text'} autoComplete={question.autoComplete} required maxLength={question.key === 'cnpj' ? 18 : 160} value={answers[question.key]} placeholder={question.placeholder} aria-describedby={`question-hint${error ? ' question-error' : ''}`} aria-invalid={error ? true : undefined} onChange={event => { setAnswers({ ...answers, [question.key]: event.target.value }); setError(''); }} />
          {error && <p className="question-error" id="question-error" role="alert">{error}</p>}
          <div className="question-actions"><button className="button pale" type="submit"><ButtonLabel>{step === 2 ? 'Concluir teste' : 'Continuar'}</ButtonLabel><span aria-hidden="true">→</span></button><span className="enter-hint mono">ou pressione Enter ↵</span></div>
        </div>
      </form>}
    <div className="conversation-bottom"><span className="mono">TRÊS PERGUNTAS. NO SEU TEMPO.</span>{started && !complete && <button type="button" onClick={back} disabled={step === 0} aria-label="Voltar à pergunta anterior">↑ Voltar</button>}</div>
  </section>;
}
function validCnpj(value) {
  if (!/^\d{14}$/.test(value) || /^(\d)\1+$/.test(value)) return false;
  const digit = (length) => { const weights = length === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2]; const mod = weights.reduce((sum, weight, index) => sum + Number(value[index]) * weight, 0) % 11; return mod < 2 ? 0 : 11 - mod; };
  return Number(value[12]) === digit(12) && Number(value[13]) === digit(13);
}
function Filters() {
  const descriptions = [
    'Do nº 00 ao nº 6. O filtro de barro que atravessa gerações.',
    'Uma combinação de cerâmica e acrílico para diferentes exposições.',
    'Novidade. Aguarde, em breve uma linha premium.',
  ];

  return <section className="section filters">
    <div className="section-top">
      <div><span className="eyebrow">O CLÁSSICO, EM SUAS DIFERENTES FORMAS</span><h2>Nossos <em>filtros.</em></h2></div>
      <a className="underlink" href="/produtos/filtros">Explorar a linha ↗</a>
    </div>
    <div className="filter-grid">
      {categories[0].families.map((family, index) => (
        <a href={`/produtos/filtros/${family.toLowerCase()}`} className="filter-card filter-card-with-photo" key={family}>
          <div>
            <span className="mono">0{index + 1} / FILTROS</span>
            <h3>{family}</h3>
            <p>{descriptions[index]}</p>
          </div>
          <span className="filter-card-visual" aria-hidden="true">
            <img className="filter-card-sketch" src="/brand/filtro-sao-pedro-esboco.webp" alt="" loading="lazy" decoding="async" width="287" height="560" />
            <img className="filter-card-photo" src="/brand/filtro-sao-pedro-12litros.webp" alt="" loading="lazy" decoding="async" width="287" height="560" />
          </span>
          <span className="card-foot">Conhecer a família <b>↗</b></span>
        </a>
      ))}
    </div>
  </section>;
}
function Lines() {
  return <section className="section lines"><div className="section-top"><div><span className="eyebrow">UM FORNECEDOR. MUITAS POSSIBILIDADES.</span><h2>Além do <em>filtro.</em></h2></div><p>Um mix para utilidades, decoração, jardinagem, pet e reposição.</p></div><div className="line-grid">{categories.slice(1).map((c, i) => <a key={c.slug} href={`/produtos/${c.slug}`}><span className="mono">0{i + 2}</span><h3>{c.name}</h3><p>{c.note}</p><span className="arrow">↗</span></a>)}</div></section>;
}
function Quality() {
  return <section className="section quality"><div className="section-top"><div><span className="eyebrow">CONFIANÇA PARA COMPRAR. SEGURANÇA PARA REVENDER.</span><h2>Qualidade <em>comprovada.</em></h2></div><a href="/qualidade" className="underlink">Entenda cada cuidado ↗</a></div><div className="seal-grid">{seals.map(([name, sub, detail]) => <details key={name}><summary><span>{name}</span><small>{sub}</small><b>+</b></summary><p>{detail}</p></details>)}</div></section>;
}
const highlights = [
  { label: 'Feito à mão, peça por peça', icon: 'M7 12V6a1.5 1.5 0 0 1 3 0v4-6a1.5 1.5 0 0 1 3 0v6-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.2 14a1.5 1.5 0 0 1 2.4-1.8L7 14' },
  { label: 'Água naturalmente fresca', icon: 'M12 3c-2 3.5-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-4-7.5-6-11ZM9 15a3 3 0 0 0 3 3' },
  { label: 'Tradição desde 1985', icon: 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM8 3v4m8-4v4M4 10h16m-11 5 2 2 4-4' },
  { label: 'Certificação INMETRO', icon: 'M12 3 5 6v5c0 4.4 2.8 7.4 7 10 4.2-2.6 7-5.6 7-10V6l-7-3Zm-3 9 2 2 4-4' },
  { label: 'Jaboticabal - Capital do Filtro de Barro', icon: 'M19 10c0 5-7 11-7 11s-7-6-7-11a7 7 0 0 1 14 0Zm-4 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z' },
  { label: 'Atendemos LOJAS em todo o Brasil', icon: 'M4 11v9h16v-9M3 10l2-6h14l2 6a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 10Zm6 10v-5h6v5' },
];

function Home() {
  return <><section className="hero"><div className="hero-copy"><div className="hero-title"><span className="hero-script" aria-hidden="true">à mão</span><h1><span className="hero-line">O valor</span><span className="hero-line">de ser feito</span><em className="hero-line">à mão.</em></h1></div><p>Líder na fabricação de filtros de barro <span className="hero-craft">100% artesanais.</span><br />De Jaboticabal para lojas de todo o Brasil.</p><div className="actions"><Button href="/catalogo">Solicitar catálogo</Button><a className="underlink" href="#comercial">Falar com o comercial ↗</a></div></div><div className="hero-photo"><picture><source media="(max-width: 760px)" srcSet="/brand/home-banner-mobile.webp" /><img src="/brand/home-banner.webp" alt="Ilustração de um oleiro moldando o corpo de um filtro de barro no torno" fetchPriority="high" /></picture><span className="photo-caption">OLEIRO: UM OFÍCIO QUE ATRAVESSA GERAÇÕES.</span></div></section>
    <ul className="proof-strip" role="list">
      {highlights.map(({ label, icon }) => (
        <li key={label}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={icon} />
          </svg>
          <span>{label}</span>
        </li>
      ))}
    </ul>
    <Filters />
    <Lines />
    <Reveal className="section handmade home-handmade"><div className="image-frame"><img src="/brand/maos.webp" alt="Mãos cobertas de argila trabalhando a borda de uma peça" loading="lazy" /></div><div className="editorial-copy"><span className="eyebrow">O DIFERENCIAL QUE CHEGA AO SEU BALCÃO</span><h2>Feito à mão.<br /><em>Peça por peça.</em></h2><h3>Antes de ser filtro, é terra.<br />Antes de ser forma, é mão.</h3><p>Desde 1985, mantemos o torno e o trabalho de quem conhece a argila. Cada peça guarda o gesto de quem a fez.</p><p>Para a sua loja, uma origem para contar e um produto com identidade própria.</p><Button href="/feito-a-mao">Entre no nosso processo</Button></div></Reveal>
    <Reveal className="section pdv home-pdv"><div className="editorial-copy"><span className="eyebrow">DA EMBALAGEM À EXPOSIÇÃO</span><h2>Um espaço São Pedro.<br /><em>Dentro da sua loja.</em></h2><h3>O cuidado continua no PDV.</h3><p>Gôndolas e displays personalizados ajudam a organizar o mix e dar presença à marca no ponto de venda.</p><p>Da embalagem de embarque ao produto exposto, converse com a equipe sobre as possibilidades para a sua loja.</p><Button href="/para-sua-loja" pale>Vamos planejar seu espaço</Button></div><div className="package"><img src="/brand/display-pdv.webp" alt="Display de ponto de venda São Pedro com filtros, embalagens e vasos em uma loja" loading="lazy" /><span className="mono">CUIDADO QUE ACOMPANHA CADA PEÇA.</span></div></Reveal>
    <Reveal className="section reach"><div><span className="eyebrow">DA NOSSA TERRA, PARA MAIS LONGE</span><h2>De Jaboticabal<br />para o Brasil.<br /><em>E para o mundo.</em></h2></div><div className="reach-list"><article><span className="mono">01 / A TERRA</span><h3>A origem faz parte da peça.</h3><p>Em Jaboticabal, a argila e o ofício se encontram em um polo de produção de filtros de barro.</p></article><article><span className="mono">02 / O TEMPO</span><h3>Secar também é fabricar.</h3><p>O clima da região favorece a secagem natural, uma etapa importante antes da queima.</p></article><article><span className="mono">03 / O ALCANCE</span><h3>Artesanal, com escala.</h3><p>Abastecimento para todos os estados brasileiros e exportação. Converse sobre a operação para a sua região.</p></article></div></Reveal>
    <Quality />
    <Commercial /></>;
}
function HandmadeFilm() {
  const stage = useRef(null); const player = useRef(null); const target = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  function seek() { const video = player.current; if (!video || video.seeking || !Number.isFinite(video.duration)) return; const time = target.current * Math.max(0, video.duration - 1 / 30); if (Math.abs(video.currentTime - time) > 1 / 60) video.currentTime = time; }
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)'); let frame;
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { const rect = stage.current.getBoundingClientRect(); const distance = rect.height - stage.current.firstElementChild.offsetHeight; const value = Math.max(0, Math.min(1, -rect.top / Math.max(1, distance))); setProgress(value); target.current = preference.matches ? 0 : Math.min(1, value / .9); seek(); }); };
    const motion = () => { setReduced(preference.matches); update(); };
    motion(); preference.addEventListener('change', motion); addEventListener('scroll', update, { passive: true }); addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); preference.removeEventListener('change', motion); removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, []);
  const index = Math.min(4, Math.floor(progress * 5));
  return <section ref={stage} className={`film ${reduced ? 'reduced' : ''}`}><div className="film-sticky"><div className="film-media"><video ref={player} src="/video/modelagem.mp4" poster="/video/abertura.webp" muted playsInline preload="auto" onLoadedMetadata={seek} onSeeked={seek} aria-label="A modelagem do barro no torno, controlada pela rolagem" /><img src="/video/cena-final.webp" alt="Peça modelada ao final do processo" style={{ opacity: Math.max(0, Math.min(1, (progress - .9) / .04)) }} /></div><div className="film-copy" key={index}><span className="eyebrow">FEITO À MÃO / 0{index + 1}</span><h1>{scenes[index]}</h1><span className="mono">ROLE PARA ACOMPANHAR O GESTO ↓</span></div><div className="film-progress" style={{ width: `${progress * 100}%` }} /></div></section>;
}
function Intro({ label, title, text }) { return <section className="section page-intro"><span className="eyebrow">{label}</span><h1>{title}</h1>{text && <p>{text}</p>}</section>; }
function Products() {
  const [query, setQuery] = useState('');
  const shown = categories.filter(c => `${c.name} ${c.families.join(' ')}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()));
  return <><Intro label="34 FAMÍLIAS / 7 CATEGORIAS" title={<>Um mix.<br /><em>Muitos caminhos.</em></>} text="Explore as linhas e leve a seleção para uma conversa com o comercial." /><section className="section product-browser"><label className="search">Encontre uma linha<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Busque filtros, velas, vasos…" type="search" /></label><div className="line-grid">{shown.map(c => <a key={c.slug} href={`/produtos/${c.slug}`}><h3>{c.name}</h3><p>{c.note}</p><span className="arrow">↗</span></a>)}</div>{!shown.length && <p role="status">Nenhuma linha encontrada. Experimente outro termo.</p>}</section><Commercial /></>;
}
function CategoryPage({ category, product }) {
  const name = product ? category.families.find(f => f.toLowerCase().replaceAll(' ', '-') === product) : null;
  if (product && !name) return <NotFound />;
  return <><Intro label={`PRODUTOS / ${category.name.toUpperCase()}`} title={name || category.name} text={category.note} /><section className="section"><a href="/produtos" className="underlink">← Todas as linhas</a>{name ? <div className="product-detail"><h2>O que você precisa<br /><em>para comprar bem.</em></h2><div><p>Solicite ao comercial a ficha atualizada de {name.toLowerCase()}, com variações, medidas, embalagem e disponibilidade.</p>{['Variações e capacidades', 'Medidas e características', 'Embalagem comercial', 'Documentação aplicável'].map(x => <div className="spec-row" key={x}>{x}<span>Consultar ficha ↗</span></div>)}<Button href="/contato">Pedir ficha e cotação</Button></div></div> : <div className="filter-grid">{category.families.map(f => <a className="filter-card" key={f} href={`/produtos/${category.slug}/${f.toLowerCase().replaceAll(' ', '-')}`}><span className="mono">{category.name}</span><h3>{f}</h3><span className="card-foot">Ver informações <b>↗</b></span></a>)}</div>}</section><Commercial /></>;
}
function ContentPage({ path }) {
  if (path === '/feito-a-mao') return <><HandmadeFilm /><section className="section"><span className="eyebrow">UM PROCESSO, MUITOS CUIDADOS</span><h2>O ofício tem<br /><em>seu tempo.</em></h2><div className="process-grid">{process.map((s, i) => <Reveal key={s}><span className="mono">0{i + 1}</span><h3>{s}</h3></Reveal>)}</div></section><Reveal className="unplugged section"><span className="eyebrow">BARRO. ÁGUA. GRAVIDADE.</span><h2>O mundo vive na tomada.<br />A água <em>não precisa.</em></h2><div className="unplugged-bottom"><span className="disconnect">Desconecte.</span><div><h3>Menos fio. Mais barro.</h3><p>O filtro de barro filtra pela gravidade e refresca pela própria cerâmica. Um objeto natural para o seu cliente levar para casa.</p><a className="underlink" href="/produtos/filtros">Conheça os filtros ↗</a></div></div></Reveal><Commercial /></>;
  if (path === '/produtos') return <Products />;
  if (path.startsWith('/produtos/')) { const [, , slug, product] = path.split('/'); const c = categories.find(c => c.slug === slug); return c ? <CategoryPage category={c} product={product} /> : <NotFound />; }
  if (path === '/qualidade') return <><Intro label="QUALIDADE / CONFIANÇA EM CADA PEDIDO" title={<>O cuidado também<br />está nos <em>detalhes.</em></>} text="Conheça as características de cada linha e peça a documentação do modelo que pretende revender." /><Quality /><Reveal className="section pdv"><div><h2>Preparado para<br /><em>ir mais longe.</em></h2><p>O transporte faz parte da experiência de compra. Confira a embalagem comercial e as orientações de manuseio com a equipe.</p></div><div className="package"><img src="/brand/embarque.webp" alt="Caixa de embarque São Pedro" /></div></Reveal><Commercial /></>;
  if (path === '/a-sao-pedro') return <><Intro label="SÃO PEDRO / JABOTICABAL, SP" title={<>Desde 1985,<br />o mesmo <em>ofício.</em></>} text="Cerâmica Center Art. Filtros São Pedro. Uma história que começa na terra e continua nas mãos." /><Reveal className="section handmade"><div className="image-frame"><img src="/brand/artesao.webp" alt="Artesão São Pedro no torno" /></div><div className="editorial-copy"><h2>A origem<br />de uma <em>escolha.</em></h2><p>Em Jaboticabal, escolhemos o torno e a modelagem artesanal. Cada curva e cada parede carregam o gesto de quem trabalha a argila.</p><p>Esse ofício cresceu em escala, atravessou o Brasil e cruzou fronteiras. Hoje, encontra no lojista o parceiro que leva a peça até a casa do cliente.</p><Button href="/feito-a-mao">Conheça o processo</Button></div></Reveal><Commercial /></>;
  if (path === '/arquitetura') return <><Intro label="ARQUITETURA / PROJETOS" title={<>Matéria que<br />faz <em>presença.</em></>} text="A textura da cerâmica e a singularidade do trabalho manual abrem espaço para composições com identidade." /><Reveal className="section handmade"><div className="image-frame"><img src="/brand/maos.webp" alt="Textura e marcas da modelagem manual na cerâmica" /></div><div className="editorial-copy"><h2>Uma escolha<br /><em>pelo natural.</em></h2><p>Explore talhas, moringas, vasos, decoração e filtros para o seu projeto. Converse com a equipe sobre acabamentos e disponibilidade.</p><Button href="/produtos">Explorar as linhas</Button></div></Reveal><Commercial /></>;
  if (path === '/para-sua-loja') return <><Intro label="LOJISTAS / DISTRIBUIDORES / REDES" title={<>Feito à mão.<br />Pronto para a sua <em>prateleira.</em></>} text="Origem para contar, mix para compor e uma equipe para conversar sobre o seu pedido." /><section className="section process-grid">{['Escolha as linhas', 'Converse com o comercial', 'Planeje o primeiro pedido', 'Organize seu ponto de venda'].map((x, i) => <Reveal key={x}><span className="mono">0{i + 1}</span><h3>{x}</h3></Reveal>)}</section><Lines /><Commercial /></>;
  if (path === '/contato' || path === '/catalogo') return <><Intro label="ATENDIMENTO B2B" title={path === '/catalogo' ? <>O próximo passo<br />do seu <em>mix.</em></> : <>Vamos conversar<br />sobre sua <em>loja?</em></>} text="Jaboticabal · São Paulo · Brasil" /><Commercial catalog={path === '/catalogo'} /><section className="section direct-contact"><h3>Contato direto</h3><a href={`mailto:${contactEmail}`}>{contactEmail} ↗</a><a href="tel:+551632025251">(16) 3202-5251 ↗</a><p>Rua Dr. Abel Sader, 155 · Jaboticabal, SP</p></section></>;
  return <NotFound />;
}
function NotFound() { return <Intro label="PÁGINA NÃO ENCONTRADA" title={<><em>Vamos voltar?</em><br /><a href="/">Ir para o início ↗</a></>} />; }
function App() {
  const path = decodeURI(location.pathname).replace(/\/$/, '') || '/';
  useEffect(() => {
    document.title = `${nav.find(([, url]) => url === path)?.[0] || (path === '/' ? 'Da terra para sua loja' : 'Produtos')} · São Pedro Cerâmica`;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('motion-ready');
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
  }, [path]);
  return <><Header /><main id="conteudo">{path === '/' ? <Home /> : <ContentPage path={path} />}</main><footer><Mark compact /><div>{nav.map(([name, url]) => <a key={url} href={url}>{name}</a>)}</div><p>Center Art Cerâmica Ltda. · Filtros São Pedro<br />Jaboticabal, São Paulo · Atendimento B2B<br />Fabricado no Maior Polo Industrial<br />de Filtros de Cerâmica (Barro) do Mundo</p><div className="footer-end">
    <span>Desenvolvido por Agência Daksa</span>
    <a href="#conteudo">Voltar ao topo ↑</a>
  </div></footer></>;
}
createRoot(document.getElementById('root')).render(<App />);
