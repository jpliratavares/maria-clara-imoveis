import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ORIGIN = 'https://claraandrade.com.br';
export default function Seo(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const game=pathname==='/jogo';
  const title=game?'Clara Run | Jogo pixelado de Maria Clara Andrade':'Maria Clara Andrade | Design Gráfico, Social Media e Marketing';
  const description=game?'Clara Run: jogo de corrida e salto com uma protagonista pixelada inspirado no dinossauro do navegador.':'Conheça Maria Clara Andrade França: experiência em design gráfico, Canva, CapCut, pacote Adobe, social media, marketing, copywriting, atendimento, administração e área comercial, com estudos em Direito, Relações Internacionais e Produção Publicitária.';
  document.title=title;
  const values:[string,'name'|'property',string,string][]=[
   ['meta[name="description"]','name','description',description],
   ['meta[name="robots"]','name','robots',game?'noindex,follow':'index,follow,max-image-preview:large'],
   ['meta[property="og:title"]','property','og:title',title],
   ['meta[property="og:description"]','property','og:description',description],
   ['meta[property="og:url"]','property','og:url',ORIGIN+(game?'/jogo':'/')],
   ['meta[name="twitter:title"]','name','twitter:title',title],
   ['meta[name="twitter:description"]','name','twitter:description',description]
  ];
  for(const [selector,attribute,name,value] of values){let node=document.head.querySelector<HTMLMetaElement>(selector);if(!node){node=document.createElement('meta');node.setAttribute(attribute,name);document.head.appendChild(node)}node.content=value}
  let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
  canonical.href=ORIGIN+(game?'/jogo':'/');
 },[pathname]);
 return null;
}
