import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bath, BedDouble, CarFront, MapPin, Menu, MessageCircle, Ruler, Search, X } from 'lucide-react';
import { listings, money, type Listing } from './data/listings';
import { CONTACT, whatsappLink } from './lib/contact';

function ContactButton({label,message}:{label:string;message:string}) {
  return <a className="ctn-btn" href={whatsappLink(message)}><MessageCircle size={17}/>{label}<ArrowUpRight size={16}/></a>;
}
function Header(){
  const [open,setOpen]=useState(false);
  return <header className="header"><div className="wrap header-row">
    <Link to="/" className="logo" onClick={()=>setOpen(false)}><span>MC<span className="accent">.</span></span><small>MARIA CLARA<br/>ANDRADE FRANÇA · IMÓVEIS</small></Link>
    <nav className={open?'nav open':'nav'}>
      <NavLink to="/" end onClick={()=>setOpen(false)}>Início</NavLink>
      <NavLink to="/imoveis" onClick={()=>setOpen(false)}>Imóveis</NavLink>
      <a href="/#sobre" onClick={()=>setOpen(false)}>Sobre</a>
      <a href="/#contato" onClick={()=>setOpen(false)}>Contato</a>
    </nav>
    <div className="desktop-contact"><ContactButton label="Fale comigo" message="Olá, Maria Clara! Gostaria de conversar sobre imóveis."/></div>
    <button className="menu" onClick={()=>setOpen(!open)} aria-label="Abrir navegação">{open?<X/>:<Menu/>}</button>
  </div></header>;
}
function Footer(){
  return <footer className="footer"><div className="wrap footer-top"><div><h2>MARIA CLARA<span className="accent">.</span></h2><p>Imóveis e novas possibilidades em João Pessoa e região.</p></div><div><Link to="/imoveis">Explorar imóveis</Link><a href="/#sobre">Sobre</a><a href="/#contato">Contato</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Maria Clara Andrade França</span><span>{CONTACT.creci?'CRECI '+CONTACT.creci:'CRECI a informar antes da publicação'}</span></div></footer>;
}
function ListingCard({item}:{item:Listing}){
  return <Link className="listing" to={'/imovel/'+item.id}><div className="listing-photo"><img src={item.images[0]} alt={'Imagem ilustrativa de '+item.title} loading="lazy"/><b>{item.deal}</b></div>
    <div className="listing-body"><p className="location"><MapPin size={14}/>{item.neighborhood}, {item.city}</p><h3>{item.title}</h3>
      <div className="facts"><span><Ruler size={15}/>{item.area} m²</span><span><BedDouble size={15}/>{item.beds} quartos</span><span><CarFront size={15}/>{item.parking} vagas</span></div>
      <strong className="price">{money(item.price)}{item.deal==='Aluguel'&&<small> / mês</small>}</strong></div></Link>;
}
function SearchPanel(){
  const navigate=useNavigate();const [deal,setDeal]=useState('');const [type,setType]=useState('');const [city,setCity]=useState('');
  function submit(){const p=new URLSearchParams();if(deal)p.set('finalidade',deal);if(type)p.set('tipo',type);if(city)p.set('cidade',city);navigate('/imoveis?'+p.toString());}
  return <div className="search-panel"><label>FINALIDADE<select value={deal} onChange={e=>setDeal(e.target.value)}><option value="">Comprar ou alugar</option><option>Venda</option><option>Aluguel</option></select></label>
    <label>TIPO DE IMÓVEL<select value={type} onChange={e=>setType(e.target.value)}><option value="">Todos os tipos</option><option>Apartamento</option><option>Casa</option><option>Studio</option></select></label>
    <label>LOCALIZAÇÃO<select value={city} onChange={e=>setCity(e.target.value)}><option value="">Toda a região</option><option>João Pessoa</option><option>Cabedelo</option></select></label>
    <button onClick={submit}><Search size={18}/>Buscar imóveis<ArrowRight size={17}/></button></div>;
}
const demo='Imagens, preços e imóveis ilustrativos — catálogo de demonstração.';
function Home(){
 return <><section className="hero"><div className="hero-bg"/><div className="wrap hero-inner"><p className="kicker light">IMÓVEIS EM JOÃO PESSOA E REGIÃO</p>
 <h1>O lugar certo<br/>para a sua <em>próxima</em><br/>história.</h1><p className="hero-sub">Comprar ou alugar pode ser simples. Descubra imóveis com orientação próxima, atenção aos detalhes e tranquilidade em cada escolha.</p>
 <Link className="underlined" to="/imoveis">Explore os imóveis <ArrowUpRight size={19}/></Link></div></section>
 <div className="wrap search-offset"><SearchPanel/></div>
 <section className="wrap section"><div className="section-head"><div><p className="kicker">SELEÇÃO DE IMÓVEIS</p><h2>Espaços para viver novas histórias.</h2><p>Conheça opções para diferentes momentos e estilos de vida.</p></div><Link className="underlined dark" to="/imoveis">Ver todos os imóveis <ArrowUpRight size={17}/></Link></div>
 <div className="listing-grid">{listings.filter(x=>x.featured).map(item=><ListingCard key={item.id} item={item}/>)}</div><p className="demo">{demo}</p></section>
 <section className="about" id="sobre"><div className="wrap about-grid"><div className="about-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&q=85" alt="Ambiente imobiliário ilustrativo"/></div>
 <div><p className="kicker">PRAZER, MARIA CLARA</p><h2>Mais que imóveis.<br/><em>Conexões reais.</em></h2>
 <p>Sou Maria Clara Andrade França, corretora de imóveis independente, com atuação em João Pessoa e região.</p><p>Minha proposta é oferecer uma experiência objetiva, humana e personalizada para quem deseja comprar, vender ou alugar um imóvel.</p>
 <ContactButton label="Vamos conversar" message="Olá, Maria Clara! Gostaria de saber mais sobre seus serviços."/></div></div></section>
 <section className="wrap section" id="contato"><div className="contact-band"><div><p className="kicker light">VAMOS CONVERSAR?</p><h2>Seu próximo endereço<br/>começa com uma conversa.</h2><p>Conte o que você procura. Vamos encontrar o caminho juntos.</p></div><ContactButton label="Entrar em contato" message="Olá, Maria Clara! Quero conversar sobre imóveis."/></div></section></>;
}
function Catalog(){
 const [params,setParams]=useSearchParams();const [sort,setSort]=useState('destaques');const deal=params.get('finalidade')||'',type=params.get('tipo')||'',city=params.get('cidade')||'';
 function setFilter(key:string,value:string){const p=new URLSearchParams(params);value?p.set(key,value):p.delete(key);setParams(p);}
 const shown=useMemo(()=>{const items=listings.filter(x=>(!deal||x.deal===deal)&&(!type||x.type===type)&&(!city||x.city===city));return sort==='menor'?items.sort((a,b)=>a.price-b.price):sort==='maior'?items.sort((a,b)=>b.price-a.price):items;},[deal,type,city,sort]);
 return <main className="wrap page"><p className="kicker">NOSSO CATÁLOGO</p><h1>Encontre seu <em>lugar.</em></h1><p>Explore possibilidades de compra e locação em João Pessoa e região.</p>
 <div className="filters"><label>Finalidade<select value={deal} onChange={e=>setFilter('finalidade',e.target.value)}><option value="">Todas</option><option>Venda</option><option>Aluguel</option></select></label>
 <label>Tipo<select value={type} onChange={e=>setFilter('tipo',e.target.value)}><option value="">Todos</option><option>Apartamento</option><option>Casa</option><option>Studio</option></select></label>
 <label>Cidade<select value={city} onChange={e=>setFilter('cidade',e.target.value)}><option value="">Todas</option><option>João Pessoa</option><option>Cabedelo</option></select></label>
 <label>Ordenar<select value={sort} onChange={e=>setSort(e.target.value)}><option value="destaques">Destaques</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option></select></label></div>
 <div className="count">{shown.length} {shown.length===1?'imóvel encontrado':'imóveis encontrados'}{(deal||type||city)&&<button onClick={()=>setParams({})}>Limpar filtros <X size={14}/></button>}</div>
 {shown.length?<div className="listing-grid">{shown.map(item=><ListingCard key={item.id} item={item}/>)}</div>:<div className="empty"><h2>Nenhum imóvel encontrado.</h2><button onClick={()=>setParams({})}>Limpar filtros</button></div>}<p className="demo">{demo}</p></main>;
}
function Detail(){
 const {id}=useParams();const item=listings.find(x=>x.id===id);const [photo,setPhoto]=useState(0);
 if(!item)return <div className="wrap page"><h1>Imóvel não encontrado</h1><Link to="/imoveis">Voltar ao catálogo</Link></div>;
 const selected=Math.min(photo,item.images.length-1);
 return <main className="wrap page"><Link className="back" to="/imoveis"><ArrowLeft size={17}/>Voltar aos imóveis</Link><div className="detail-heading"><div><p className="kicker">{item.deal.toUpperCase()} · {item.type.toUpperCase()}</p><h1>{item.title}</h1><p className="location"><MapPin size={16}/>{item.neighborhood}, {item.city} — PB</p></div><strong>{money(item.price)}{item.deal==='Aluguel'&&<small> / mês</small>}</strong></div>
 <div className="gallery"><img className="main-photo" src={item.images[selected]} alt={'Imagem ilustrativa de '+item.title}/>{item.images.length>1&&<div className="thumbs">{item.images.map((src,i)=><button key={src} onClick={()=>setPhoto(i)} className={i===selected?'active':''} aria-label={'Ver foto '+(i+1)}><img src={src} alt=""/></button>)}</div>}</div>
 <div className="detail-grid"><div><div className="specs"><span><Ruler/> {item.area} m²</span><span><BedDouble/> {item.beds} quartos</span><span><Bath/> {item.baths} banheiros</span><span><CarFront/> {item.parking} vagas</span></div><h2>Sobre este imóvel</h2><p>{item.description}</p><h2>Características</h2><div className="features">{item.features.map(f=><span key={f}>{f}</span>)}</div><p className="demo">{demo}</p></div>
 <aside className="lead"><p className="kicker">ATENDIMENTO PESSOAL</p><h2>Gostou deste imóvel?</h2><p>Converse diretamente com Maria Clara e tire suas dúvidas.</p><ContactButton label="Tenho interesse" message={'Olá, Maria Clara! Tenho interesse no imóvel '+item.title+' ('+item.id+').'}/></aside></div></main>;
}
export default function App(){return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/imoveis" element={<Catalog/>}/><Route path="/imovel/:id" element={<Detail/>}/><Route path="*" element={<div className="wrap page"><h1>Página não encontrada</h1><Link to="/">Voltar ao início</Link></div>}/></Routes><Footer/></>;}
