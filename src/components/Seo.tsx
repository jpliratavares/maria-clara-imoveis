import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ORIGIN = 'https://claraandrade.com.br';
export default function Seo(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const game=pathname==='/jogo';
  const title=game?'Jogo da cobrinha | Maria Clara Andrade França':'Maria Clara Andrade França | Portfólio pessoal';
  const description=game?'Um minigame de cobrinha no portfólio pessoal de Maria Clara Andrade França.':'Conheça Maria Clara Andrade França, sua trajetória pessoal, experiência no ambiente imobiliário de João Pessoa e formação profissional em andamento.';
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
