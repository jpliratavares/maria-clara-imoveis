import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, HeartHandshake, Landmark, Megaphone, Scale, Sparkles, Globe2, Menu, X } from 'lucide-react';
import Seo from './components/Seo';
import SnakeGame from './components/SnakeGame';

const trajectory = [
   {stage:'FORMAÇÃO EM ANDAMENTO',title:'Gestão Pública',icon:Landmark,description:'Formação em Gestão Pública, conforme apresentação profissional já existente no portfólio.',skills:['Gestão Pública','Causas sociais'],current:true},
  {stage:'ATUAÇÃO PROFISSIONAL',title:'Social media, marketing e copywriting',icon:Megaphone,description:'Experiência em comunicação digital para salão de beleza, clínica de harmonização orofacial, policlínica e loja de assistência técnica e acessórios. Criação de conteúdo, textos publicitários, stories e atendimento por WhatsApp.',skills:['Social media'],current:true},
  {stage:'EXPERIÊNCIA EM RAMO IMOBILIARIO',title:'SDR — Clau Negócios e Gestão',icon:BriefcaseBusiness,description:'Atuação em desenvolvimento de relacionamento comercial e prospecção como SDR.',skills:['Comunicação','Relacionamento comercial']},
  {stage:'ATENDIMENTO',title:'Recepção e secretaria — SOS Unhas',icon:HeartHandshake,description:'Experiência em recepção, organização e atendimento ao público.',skills:['Atendimento','Organização']},
  {stage:'2025',title:'Auxiliar administrativo — CTV Construtora / CAGEPA',icon:Landmark,description:'Atuação administrativa na CTV Construtora, prestadora de serviços à CAGEPA.',skills:['Rotinas administrativas','Documentação','Escritório']},
  {stage:'2024',title:'Delegacia da Polícia Civil',icon:Scale,description:'Produção e entrega de documentos, atendimento ao público e atenção aos prazos e à qualidade dos registros.',skills:['Documentação','Atendimento ao público','Responsabilidade']},
  {stage:'FORMAÇÃO ACADÊMICA',title:'Direito — UNIPÊ (2021–2024)',icon:BookOpen,description:'Estudos em Direito, sem indicação de graduação concluída no currículo.',skills:['Direito','Instituições']},
  {stage:'FORMAÇÃO ACADÊMICA',title:'Relações Internacionais — Estácio',icon:Globe2,description:'Estudos em Relações Internacionais.',skills:['Relações Internacionais']},
  {stage:'FORMAÇÃO ACADÊMICA',title:'Produção Publicitária — UNIESP',icon:Sparkles,description:'Estudos em Produção Publicitária, complementando a experiência prática em comunicação.',skills:['Publicidade','Comunicação']},
 
];

function Trajectory() {
  return <section className="trajectory-section" id="trajetoria" aria-labelledby="trajectory-title">
    <div className="wrap">
      <div className="trajectory-heading">
        <div><p className="kicker">MINHA TRAJETÓRIA</p><h2 id="trajectory-title">Caminhos diferentes.<br/><em>Uma identidade.</em></h2></div>
        <p>Minha trajetória reúne comunicação digital, atendimento, rotinas administrativas e experiências institucionais. Também inclui estudos em Direito, Relações Internacionais, Produção Publicitária e Gestão Pública.</p>
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
      <div className="trajectory-outro"><BriefcaseBusiness size={21} strokeWidth={1.6}/><div><strong>Uma trajetória em construção</strong><p>As experiências estão apresentadas com as datas informadas no currículo; as demais não receberam períodos presumidos.</p></div><a href="#sobre" aria-label="Voltar à apresentação">Sobre mim <ArrowUpRight size={16}/></a></div>
    </div>
  </section>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <header className="header"><div className="wrap header-row">
      <Link className="logo" to="/"><span>MC<span className="accent">A.</span></span><small>MARIA CLARA<br/>ANDRADE</small></Link>
      <button className="mobile-nav-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={24}/> : <Menu size={24}/>}</button><nav id="primary-navigation" className={`nav${menuOpen ? " open" : ""}`}><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre mim</a><a href="#trajetoria" onClick={() => setMenuOpen(false)}>Trajetória</a><Link to="/jogo" onClick={() => setMenuOpen(false)}>Clara Run</Link></nav>
    </div></header>
    <main>
      <section className="hero hero-personal"><div className="wrap hero-personal-grid">
        <div className="hero-personal-copy">
          <p className="kicker">MUITO PRAZER, SOU</p>
          <h1>Maria Clara<br/><em>Andrade.</em></h1>
          <p className="hero-role"> Social Media · Copywriting · Design</p>
          <p className="hero-sub">Atuo com social media, marketing e copywriting. Minha trajetória também passa pelo atendimento ao público, pela área administrativa e pela Polícia Civil, reunindo criatividade, organização e comunicação.</p>
          <div className="hero-actions"><a className="ctn-btn" href="#sobre">Conheça minha história <ArrowRight size={17}/></a></div>
        </div>
        <div className="hero-personal-visual"><div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}retrato-preto-e-branco.jpeg`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = `${import.meta.env.BASE_URL}sorriso-frontal.jpeg`; }} alt="Maria Clara Andrade em retrato pessoal preto e branco" loading="eager"/></div><div className="portrait-caption"><span>PORTFÓLIO PESSOAL</span><span>JOÃO PESSOA · PB</span></div></div>
      </div></section>
      <section className="about" id="sobre"><div className="wrap about-grid">
        <div className="about-image"><img src={`${import.meta.env.BASE_URL}olhar-lateral.jpeg`} alt="Retrato lateral de Maria Clara Andrade França" loading="lazy"/></div>
        <div><p className="kicker">UM POUCO SOBRE MIM</p><h2>Comunicação, escuta<br/><em>e propósito social.</em></h2>
        <p>Sou a Maria Clara: especialista em social media, marketing e copywriting, apaixonada por transformar ideias em conexões reais para marcas de diferentes segmentos. Minha bagagem traz experiências nos ramos corporativo e imobiliário — além de cursar gestão pública —, somadas a uma forte vivência em atendimento, suporte administrativo e desenvolvimento comercial. Junto a isso, carrego uma formação múltipla que passa pelo Direito, Relações Internacionais e Produção Publicitária. Gosto de unir escuta atenta, criatividade e estratégia para dar vida a projetos que fazem sentido</p>
</div>
      </div></section>
      <section className="purpose-section" aria-labelledby="purpose-title"><div className="wrap purpose-layout">
        <div className="purpose-mark"><HeartHandshake size={35} strokeWidth={1.25}/><span>O QUE ME MOVE</span></div>
        <div className="purpose-photo"><img src={`${import.meta.env.BASE_URL}foto-balanco.jpeg`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = `${import.meta.env.BASE_URL}olhar-lateral.jpeg`; }} alt="Maria Clara em um balanço ao ar livre" loading="lazy"/></div><div className="purpose-copy"><p className="kicker light">PROPÓSITO</p><h2 id="purpose-title">Acredito em uma sociedade<br/><em>mais humana.</em></h2><p>As causas sociais são parte do que me motiva a seguir aprendendo. É por isso que escolhi estudar Gestão Pública: quero compreender como as instituições e as políticas públicas podem contribuir para uma sociedade que escute, acolha e respeite mais as pessoas.</p><span className="purpose-signature">Maria Clara Andrade</span></div>
      </div></section>
      <Trajectory/>
      <section className="wrap section" style={{paddingTop:0}}><p className="kicker">NOVIDADES EM CONSTRUÇÃO</p><h2>Uma pausa para jogar Clara Run.</h2><p>Uma aventura pixelada inspirada no jogo do dinossauro, com a Clara como protagonista.</p><Link className="construction-link" to="/jogo">Jogar Clara Run <ArrowRight size={17}/></Link></section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><div><h2>MARIA CLARA<span className="accent">.</span></h2><p>Comunicação, estratégia e trajetória profissional · João Pessoa e região.</p></div><div><a href="#sobre">Sobre mim</a><a href="#trajetoria">Trajetória</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Maria Clara Andrade</span><span>Portfólio pessoal</span></div></footer>
  </>;
}
export default function App(){return <><Seo/><Routes><Route path="/" element={<Home/>}/><Route path="/jogo" element={<SnakeGame/>}/><Route path="*" element={<Home/>}/></Routes></>;}
