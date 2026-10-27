import { Link, Route, Routes } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Seo from './components/Seo';

function Home() {
  return <>
    <header className="header"><div className="wrap header-row">
      <Link className="logo" to="/"><span>MC<span className="accent">.</span></span><small>MARIA CLARA<br/>ANDRADE FRANÇA</small></Link>
      <nav className="nav"><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a></nav>
    </div></header>
    <main>
      <section className="hero hero-personal"><div className="wrap hero-personal-grid">
        <div className="hero-personal-copy">
          <p className="kicker">MUITO PRAZER, SOU</p>
          <h1>Maria Clara<br/><em>Andrade França.</em></h1>
          <p className="hero-role">Minha trajetória no mercado imobiliário</p>
          <p className="hero-sub">Acredito no valor de ouvir, aprender e construir relações de confiança. Este é um espaço para compartilhar um pouco da minha história e da minha formação.</p>
          <div className="hero-actions"><a className="ctn-btn" href="#sobre">Conheça minha história <ArrowRight size={17}/></a></div>
        </div>
        <div className="hero-personal-visual"><div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}sorriso-frontal.jpeg`} alt="Retrato de Maria Clara Andrade França" loading="eager"/></div><div className="portrait-caption"><span>PORTFÓLIO PESSOAL</span><span>JOÃO PESSOA · PB</span></div></div>
      </div></section>
      <section className="about" id="sobre"><div className="wrap about-grid">
        <div className="about-image"><img src={`${import.meta.env.BASE_URL}olhar-lateral.jpeg`} alt="Maria Clara Andrade França em retrato profissional" loading="lazy"/></div>
        <div><p className="kicker">UM POUCO SOBRE MIM</p><h2>Mais que imóveis.<br/><em>Conexões reais.</em></h2>
          <p>Sou Maria Clara Andrade França. Tenho experiência no ambiente imobiliário de João Pessoa e região e sigo investindo na minha formação profissional.</p>
          <p>Valorizo uma comunicação clara, o cuidado com as pessoas e o aprendizado contínuo. Quero construir uma trajetória pautada pela responsabilidade e pela confiança.</p>
        </div>
      </div></section>
      <section className="wrap section" id="trajetoria">
        <div className="section-head"><div><p className="kicker">MINHA TRAJETÓRIA</p><h2>Aprender, evoluir e criar conexões.</h2><p>Uma apresentação pessoal sobre meus interesses e meu desenvolvimento no setor imobiliário.</p></div></div>
        <div className="portfolio-note"><MapPin size={20}/><div><strong>João Pessoa e região, Paraíba</strong><p>Atuação no ambiente imobiliário e formação profissional em andamento.</p><p><small>Este site é um portfólio pessoal e não oferece serviços de corretagem, anúncios de imóveis, captação de clientes ou intermediação de compra, venda e locação.</small></p></div></div>
      </section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><div><h2>MARIA CLARA<span className="accent">.</span></h2><p>Portfólio pessoal · João Pessoa e região.</p></div><div><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Maria Clara Andrade França</span><span>Portfólio pessoal</span></div></footer>
  </>;
}
export default function App(){return <><Seo/><Routes><Route path="*" element={<Home/>}/></Routes></>;}
