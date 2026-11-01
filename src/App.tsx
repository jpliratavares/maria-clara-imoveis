import { Link, Route, Routes } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Landmark, Megaphone, Scale, Sparkles, Globe2 } from 'lucide-react';
import Seo from './components/Seo';
import SnakeGame from './components/SnakeGame';

const trajectory = [
  {
    stage: 'ATUAÇÃO ATUAL',
    title: 'Social media & comunicação digital',
    icon: Megaphone,
    description: 'Hoje, minha atuação profissional está ligada à comunicação digital. É onde reúno criatividade, produção de conteúdo e a busca por uma comunicação clara e relevante.',
    skills: ['Comunicação digital', 'Conteúdo', 'Criatividade'],
    current: true
  },
  {
    stage: 'EXPERIÊNCIA PROFISSIONAL',
    title: 'Produção publicitária',
    icon: Sparkles,
    description: 'A experiência com produção publicitária faz parte do meu repertório em comunicação, ampliando minha visão sobre linguagem, apresentação de ideias e construção de mensagens.',
    skills: ['Produção publicitária', 'Linguagem', 'Comunicação']
  },
  {
    stage: 'VIVÊNCIA NA ÁREA JURÍDICA',
    title: 'Experiência em delegacia',
    icon: Scale,
    description: 'Minha passagem por uma delegacia integra minha trajetória profissional e me proporcionou contato com a rotina de um ambiente institucional ligado à área jurídica.',
    skills: ['Ambiente institucional', 'Área jurídica', 'Rotinas profissionais']
  },
  {
    stage: 'FORMAÇÃO ACADÊMICA',
    title: 'Direito — estudos até o 7º período',
    icon: BookOpen,
    description: 'Cursei Direito até o sétimo período. Essa etapa acadêmica faz parte da minha formação e contribuiu para meu interesse por instituições e relações sociais.',
    skills: ['Estudos jurídicos', 'Formação acadêmica']
  },
  {
    stage: 'FORMAÇÃO ACADÊMICA',
    title: 'Relações Internacionais — estudos até o 3º período',
    icon: Globe2,
    description: 'Também cursei Relações Internacionais até o terceiro período. Essa experiência integra minha formação acadêmica e ampliou meu contato com temas ligados às relações entre sociedades e instituições.',
    skills: ['Relações Internacionais', 'Formação acadêmica']
  },
  {
    stage: 'FORMAÇÃO EM ANDAMENTO',
    title: 'Graduação em Gestão Pública',
    icon: Landmark,
    description: 'Atualmente curso Gestão Pública, dando continuidade à minha formação e ao interesse por gestão, instituições e atuação na sociedade.',
    skills: ['Gestão Pública', 'Formação em andamento'],
    current: true
  }
];

function Trajectory() {
  return <section className="trajectory-section" id="trajetoria" aria-labelledby="trajectory-title">
    <div className="wrap">
      <div className="trajectory-heading">
        <div><p className="kicker">MINHA TRAJETÓRIA</p><h2 id="trajectory-title">Caminhos diferentes.<br/><em>Uma identidade.</em></h2></div>
        <p>Minha formação e minhas experiências se cruzam entre comunicação, Direito, Relações Internacionais e Gestão Pública. Cada etapa acrescenta uma perspectiva ao trabalho que desenvolvo hoje.</p>
      </div>
      <div className="trajectory-layout">
        <div className="trajectory-rail" aria-hidden="true"><span>EXPERIÊNCIAS & FORMAÇÃO</span><strong>{String(trajectory.length).padStart(2,'0')}</strong><p>Frentes que compõem minha trajetória profissional e acadêmica.</p></div>
        <ol className="trajectory-list">
          {trajectory.map((item, index) => {
            const Icon = item.icon;
            return <li className="trajectory-item" key={item.title}>
              <div className="trajectory-node" aria-hidden="true"><Icon size={22} strokeWidth={1.7}/></div>
              <article className="trajectory-content">
                <div className="trajectory-meta"><span>{String(index+1).padStart(2,'0')} / {String(trajectory.length).padStart(2,'0')}</span><span>{item.stage}</span>{item.current && <span className="trajectory-current">EM CURSO / ATUAL</span>}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="trajectory-tags" aria-label="Áreas relacionadas">{item.skills.map(skill=><span key={skill}>{skill}</span>)}</div>
              </article>
            </li>;
          })}
        </ol>
      </div>
      <div className="trajectory-outro"><BriefcaseBusiness size={21} strokeWidth={1.6}/><div><strong>Uma trajetória em construção</strong><p>As experiências estão apresentadas por área, sem datas ou cargos não confirmados. Este site é um portfólio pessoal e não oferece intermediação imobiliária.</p></div><a href="#sobre" aria-label="Voltar à apresentação">Sobre mim <ArrowUpRight size={16}/></a></div>
    </div>
  </section>;
}

function Home() {
  return <>
    <header className="header"><div className="wrap header-row">
      <Link className="logo" to="/"><span>MC<span className="accent">.</span></span><small>MARIA CLARA<br/>ANDRADE</small></Link>
      <nav className="nav"><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a><Link to="/jogo">Joguinho</Link></nav>
    </div></header>
    <main>
      <section className="hero hero-personal"><div className="wrap hero-personal-grid">
        <div className="hero-personal-copy">
          <p className="kicker">MUITO PRAZER, SOU</p>
          <h1>Maria Clara<br/><em>Andrade.</em></h1>
          <p className="hero-role">Gestão Pública em formação · Social Media</p>
          <p className="hero-sub">Estudo Gestão Pública, cursei Direito até o 7º período e Relações Internacionais até o 3º. Tenho experiência em delegacia e produção publicitária. Hoje, atuo como social media, conectando comunicação, criatividade e estratégia.</p>
          <div className="hero-actions"><a className="ctn-btn" href="#sobre">Conheça minha história <ArrowRight size={17}/></a></div>
        </div>
        <div className="hero-personal-visual"><div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}sorriso-frontal.jpeg`} alt="Retrato de Maria Clara Andrade França" loading="eager"/></div><div className="portrait-caption"><span>PORTFÓLIO PESSOAL</span><span>JOÃO PESSOA · PB</span></div></div>
      </div></section>
      <section className="about" id="sobre"><div className="wrap about-grid">
        <div className="about-image"><img src={`${import.meta.env.BASE_URL}olhar-lateral.jpeg`} alt="Maria Clara Andrade França em retrato profissional" loading="lazy"/></div>
        <div><p className="kicker">UM POUCO SOBRE MIM</p><h2>Comunicação com propósito.<br/><em>Conexões reais.</em></h2>
          <p>Sou Maria Clara Andrade França. Atualmente, curso Gestão Pública e trabalho como social media. Minha trajetória acadêmica também inclui estudos em Direito até o 7º período e Relações Internacionais até o 3º.</p>
          <p>Minha experiência profissional passa por uma delegacia e pela produção publicitária. Essas vivências contribuíram para minha forma de comunicar, compreender contextos e desenvolver projetos com responsabilidade.</p>
        </div>
      </div></section>
      <Trajectory/>
      <section className="wrap section" style={{paddingTop:0}}><p className="kicker">NOVIDADES EM CONSTRUÇÃO</p><h2>Enquanto isso, uma pausa para jogar.</h2><p>Um clássico da cobrinha com um toque especial.</p><Link className="construction-link" to="/jogo">Jogar cobrinha <ArrowRight size={17}/></Link></section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><div><h2>MARIA CLARA<span className="accent">.</span></h2><p>Comunicação, estratégia e trajetória profissional · João Pessoa e região.</p></div><div><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Maria Clara Andrade</span><span>Portfólio pessoal</span></div></footer>
  </>;
}
export default function App(){return <><Seo/><Routes><Route path="/" element={<Home/>}/><Route path="/jogo" element={<SnakeGame/>}/><Route path="*" element={<Home/>}/></Routes></>;}
