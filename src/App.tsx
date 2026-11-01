import { Link, Route, Routes } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Seo from './components/Seo';
import SnakeGame from './components/SnakeGame';

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
          <p className="hero-sub">Estudo Gestão Pública, cursei até o 7º período de Direito e tenho experiência em delegacia e produção publicitária. Hoje, atuo como social media, conectando comunicação, criatividade e estratégia.</p>
          <div className="hero-actions"><a className="ctn-btn" href="#sobre">Conheça minha história <ArrowRight size={17}/></a></div>
        </div>
        <div className="hero-personal-visual"><div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}sorriso-frontal.jpeg`} alt="Retrato de Maria Clara Andrade França" loading="eager"/></div><div className="portrait-caption"><span>PORTFÓLIO PESSOAL</span><span>JOÃO PESSOA · PB</span></div></div>
      </div></section>
      <section className="about" id="sobre"><div className="wrap about-grid">
        <div className="about-image"><img src={`${import.meta.env.BASE_URL}olhar-lateral.jpeg`} alt="Maria Clara Andrade França em retrato profissional" loading="lazy"/></div>
        <div><p className="kicker">UM POUCO SOBRE MIM</p><h2>Comunicação com propósito.<br/><em>Conexões reais.</em></h2>
          <p>Sou Maria Clara Andrade França. Atualmente, curso Gestão Pública e trabalho como social media. Minha trajetória acadêmica também inclui estudos em Direito até o 7º período.</p>
          <p>Minha experiência profissional passa por uma delegacia e pela produção publicitária. Essas vivências contribuíram para minha forma de comunicar, compreender contextos e desenvolver projetos com responsabilidade.</p>
        </div>
      </div></section>
      <section className="wrap section" id="trajetoria">
        <div className="section-head"><div><p className="kicker">MINHA TRAJETÓRIA</p><h2>Experiências que se encontram.</h2><p>Gestão Pública, Direito, produção publicitária e comunicação digital fazem parte da minha construção profissional.</p></div></div>
        <div className="portfolio-note"><MapPin size={20}/><div><strong>João Pessoa e região, Paraíba</strong><p>Social media · Estudante de Gestão Pública · Estudos em Direito até o 7º período · Experiência em delegacia e produção publicitária.</p><p><small>Este site é um portfólio pessoal e não oferece serviços de corretagem, anúncios de imóveis, captação de clientes ou intermediação de compra, venda e locação.</small></p></div></div>
      </section>
      <section className="wrap section" style={{paddingTop:0}}><p className="kicker">NOVIDADES EM CONSTRUÇÃO</p><h2>Enquanto isso, uma pausa para jogar.</h2><p>Um clássico da cobrinha com um toque especial.</p><Link className="construction-link" to="/jogo">Jogar cobrinha <ArrowRight size={17}/></Link></section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><div><h2>MARIA CLARA<span className="accent">.</span></h2><p>Comunicação, estratégia e trajetória profissional · João Pessoa e região.</p></div><div><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Maria Clara Andrade</span><span>Portfólio pessoal</span></div></footer>
  </>;
}
export default function App(){return <><Seo/><Routes><Route path="/" element={<Home/>}/><Route path="/jogo" element={<SnakeGame/>}/><Route path="*" element={<Home/>}/></Routes></>;}
