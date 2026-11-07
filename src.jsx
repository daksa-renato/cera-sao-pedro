import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import './style.css';
const videoEnd = 0.90;
const finalFadeEnd = 0.94;

const chapters = [
  { tag: '01 / A TERRA', lines: ['Tudo nasce', 'da terra.'], text: 'A argila úmida guarda a memória do chão.' },
  { tag: '02 / AS MÃOS', lines: ['Mãos humanas', 'dão forma.'], text: 'A pressão dos dedos encontra o ritmo do torno.' },
  { tag: '03 / A ÁGUA', lines: ['A água pede', 'seu lugar.'], text: 'O oleiro abre na argila o espaço que ela vai ocupar.' },
  { tag: '04 / A PUREZA', lines: ['A pureza', 'da água.'], text: 'Um gesto simples à mesa: servir um copo de água.' },
  { tag: '05 / A SAÚDE', lines: ['Cuidar é', 'um ritual.'], text: 'Beber água ao longo do dia é uma forma de cuidar da saúde.' },
];

function App() {
  const stage = useRef(null);
  const video = useRef(null);
  const scene = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const targetTime = useRef(0);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduced(media.matches);
    syncPreference();
    media.addEventListener('change', syncPreference);

    let raf;
    const update = () => {
      if (raf !== undefined) return;
      raf = requestAnimationFrame(() => {
        raf = undefined;
        const rect = stage.current.getBoundingClientRect();
        const distance = rect.height - scene.current.offsetHeight;
        setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1, distance))));
      });
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
      media.removeEventListener('change', syncPreference);
      cancelAnimationFrame(raf);
    };
  }, []);

  function seekToScroll() {
    const player = video.current;
    if (!player || player.seeking || !Number.isFinite(player.duration)) return;
    const time = targetTime.current * Math.max(0, player.duration - 1 / 30);
    if (Math.abs(player.currentTime - time) >= 1 / 60) {
      player.currentTime = time;
    }
  }

  useEffect(() => {
    targetTime.current = reduced ? 0 : Math.min(1, progress / videoEnd);
    seekToScroll();
  }, [progress, reduced]);

const finalOpacity = Math.max(0, Math.min(1, (progress - videoEnd) / (finalFadeEnd - videoEnd)));
  const chapter = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
  const { tag, lines, text } = chapters[chapter];
  return <><header><a className="brand" href="#inicio" aria-label="São Pedro, início"><span className="brand-symbol">s<span>p</span></span><span>CERÂMICA<br/><b>SÃO PEDRO</b></span></a><a className="header-link" href="#sobre">A matéria e o gesto <span>↗</span></a><span className="draft">ESTUDO Nº 01</span></header><main><section ref={stage} className="scroll-stage" id="inicio"><div ref={scene} className="scene">
  <div className="video-stage">
    <video
      ref={video}
      src="/video/modelagem.mp4"
      poster="/video/abertura.webp"
      preload="auto"
      muted
      playsInline
      aria-label="Oleiro moldando uma peça de barro, da massa à forma final"
      onLoadedMetadata={seekToScroll}
      onSeeked={seekToScroll}
    />
    <img
      src="/video/cena-final.webp"
      className="video-final"
      alt="Oleiro segurando a peça de barro já modelada no torno"
      aria-hidden={finalOpacity < 1}
      style={{ opacity: finalOpacity }}
    />
  </div>
<div className="intro-label">TERRA. MÃOS. TEMPO.</div><div className="chapter" key={chapter}>
  <span className="eyebrow chapter-tag">{tag}</span>
  <h1>{lines.map((line, index) => (
    <span className="chapter-line" key={line}>
      <span className={index === 1 ? 'chapter-echo' : undefined}>{line}</span>
    </span>
  ))}</h1>
  <p>{text}</p>
</div><div className="scene-bottom"><div className="scroll-hint"><span className="mouse"/> ROLE PARA DAR FORMA</div><div className="counter" aria-hidden="true"><span>{Math.round(progress * 100)}%</span></div><span className="vertical-label">UM ENCONTRO COM A ORIGEM</span></div><div className="progress"><div style={{width:`${progress*100}%`}}/></div><nav className="chapter-nav" aria-label="Etapas da modelagem">{chapters.map((c,i)=><button key={i} aria-label={`Ir à etapa ${i+1}`} aria-current={chapter===i?'step':undefined} className={chapter===i?'selected':''} onClick={()=>{const el=stage.current;window.scrollTo({top:el.offsetTop+(el.offsetHeight-scene.current.offsetHeight)*(i/chapters.length+.04),behavior:reduced?'instant':'smooth'});}}><span>0{i+1}</span><i/></button>)}</nav></div></section><section className="closing" id="sobre"><div className="closing-top"><span className="eyebrow">A BELEZA ESTÁ NO PROCESSO</span><span>01 — 05</span></div><h2>Antes de chegar<br/>à sua casa,<br/><em>passa pelas mãos.</em></h2><div className="closing-bottom"><p>Terra que se transforma.<br/>Gestos que deixam sua marca.<br/>Uma história que começa muito antes do primeiro uso.</p><a href="#inicio">Rever a transformação <span>↗</span></a></div><footer><span>CERÂMICA SÃO PEDRO</span><span>Protótipo visual · Imagens de referência</span><span>FEITO DE TERRA E TEMPO.</span></footer></section></main></>};
createRoot(document.getElementById('root')).render(<App/>);
