import { Link, Route, Routes } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, HeartHandshake, Landmark, Megaphone, Scale, Sparkles, Globe2 } from 'lucide-react';
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
    stage: 'ESTÁGIO PROFISSIONAL',
    title: 'Estágio em produção publicitária',
    icon: Sparkles,
    description: 'Durante meu estágio em produção publicitária, tive contato com a área de comunicação e com diferentes formas de construir e apresentar mensagens. Essa vivência integra o repertório que levo para minha atuação atual.',
    skills: ['Produção publicitária', 'Linguagem', 'Comunicação']
  },
  {
    stage: 'ESTÁGIO NA ÁREA JURÍDICA',
    title: 'Estágio em delegacia',
    icon: Scale,
    description: 'Meu estágio em uma delegacia me aproximou do cotidiano de uma instituição pública ligada à área jurídica. Essa experiência faz parte do caminho que despertou meu interesse pelas instituições e por seu papel na sociedade.',
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
    description: 'Hoje, as causas sociais são uma das principais motivações da minha trajetória. Estudo Gestão Pública com o desejo de compreender melhor as políticas públicas e contribuir, no futuro, para uma sociedade mais humana e justa.',
    skills: ['Gestão Pública', 'Causas sociais', 'Políticas públicas'],
    current: true
  }
];

function Trajectory() {
  return <section className="trajectory-section" id="trajetoria" aria-labelledby="trajectory-title">
    <div className="wrap">
      <div className="trajectory-heading">
        <div><p className="kicker">MINHA TRAJETÓRIA</p><h2 id="trajectory-title">Caminhos diferentes.<br/><em>Uma identidade.</em></h2></div>
        <p>Minha formação e meus estágios passam pela comunicação, pelo Direito e pelas Relações Internacionais. Hoje, a Gestão Pública representa meu desejo de aproximar conhecimento, causas sociais e transformação humana.</p>
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
      <div className="trajectory-outro"><BriefcaseBusiness size={21} strokeWidth={1.6}/><div><strong>Uma trajetória em construção</strong><p>As experiências estão apresentadas por área, sem datas não confirmadas. Os trabalhos na delegacia e em produção publicitária foram estágios. Este site é um portfólio pessoal e não oferece intermediação imobiliária.</p></div><a href="#sobre" aria-label="Voltar à apresentação">Sobre mim <ArrowUpRight size={16}/></a></div>
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
          <p className="hero-sub">Sou social media e estudante de Gestão Pública, movida pelo interesse em causas sociais e pelo desejo de contribuir para uma sociedade mais humana. Minha trajetória inclui estudos em Direito e Relações Internacionais e estágios em delegacia e produção publicitária.</p>
          <div className="hero-actions"><a className="ctn-btn" href="#sobre">Conheça minha história <ArrowRight size={17}/></a></div>
        </div>
        <div className="hero-personal-visual"><div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}sorriso-frontal.jpeg`} alt="Retrato de Maria Clara Andrade França" loading="eager"/></div><div className="portrait-caption"><span>PORTFÓLIO PESSOAL</span><span>JOÃO PESSOA · PB</span></div></div>
      </div></section>
      <section className="about" id="sobre"><div className="wrap about-grid">
        <div className="about-image"><img src={`${import.meta.env.BASE_URL}olhar-lateral.jpeg`} alt="Maria Clara Andrade França em retrato profissional" loading="lazy"/></div>
        <div><p className="kicker">UM POUCO SOBRE MIM</p><h2>Comunicação, escuta<br/><em>e propósito social.</em></h2>
          <p>Sou Maria Clara Andrade França. Atualmente, curso Gestão Pública e trabalho como social media. Minha trajetória acadêmica também inclui estudos em Direito até o 7º período e Relações Internacionais até o 3º.</p>
          <p>Realizei estágios em delegacia e produção publicitária, experiências que ampliaram minha visão sobre instituições, pessoas e comunicação. Hoje, meu interesse por causas sociais é uma motivação importante para seguir estudando Gestão Pública.</p>
        </div>
      </div></section>
      <section className="purpose-section" aria-labelledby="purpose-title"><div className="wrap purpose-layout">
        <div className="purpose-mark"><HeartHandshake size={35} strokeWidth={1.25}/><span>O QUE ME MOVE</span></div>
        <div className="purpose-copy"><p className="kicker light">PROPÓSITO</p><h2 id="purpose-title">Acredito em uma sociedade<br/><em>mais humana.</em></h2><p>As causas sociais são parte do que me motiva a seguir aprendendo. É por isso que escolhi estudar Gestão Pública: quero compreender como as instituições e as políticas públicas podem contribuir para uma sociedade que escute, acolha e respeite mais as pessoas.</p><span className="purpose-signature">Maria Clara Andrade</span></div>
      </div></section>
      <Trajectory/>
      <section className="wrap section" style={{paddingTop:0}}><p className="kicker">NOVIDADES EM CONSTRUÇÃO</p><h2>Enquanto isso, uma pausa para jogar.</h2><p>Um clássico da cobrinha com um toque especial.</p><Link className="construction-link" to="/jogo">Jogar cobrinha <ArrowRight size={17}/></Link></section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><div><h2>MARIA CLARA<span className="accent">.</span></h2><p>Comunicação, estratégia e trajetória profissional · João Pessoa e região.</p></div><div><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Maria Clara Andrade</span><span>Portfólio pessoal</span></div></footer>
  </>;
}
export default function App(){return <><Seo/><Routes><Route path="/" element={<Home/>}/><Route path="/jogo" element={<SnakeGame/>}/><Route path="*" element={<Home/>}/></Routes></>;}
