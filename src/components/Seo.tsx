import { useEffect } from 'react';
export default function Seo(){
 useEffect(()=>{
  const title='Maria Clara Andrade França | Portfólio pessoal';
  const description='Conheça a trajetória de Maria Clara Andrade França, sua experiência no ambiente imobiliário de João Pessoa e sua formação profissional em andamento.';
  document.title=title;
  for(const [selector,attribute,name,value] of [
   ['meta[name="description"]','name','description',description],
   ['meta[property="og:title"]','property','og:title',title],
   ['meta[property="og:description"]','property','og:description',description],
   ['meta[name="twitter:title"]','name','twitter:title',title],
   ['meta[name="twitter:description"]','name','twitter:description',description]
  ]){let node=document.head.querySelector<HTMLMetaElement>(selector);if(!node){node=document.createElement('meta');node.setAttribute(attribute,name);document.head.appendChild(node)}node.content=value}
 },[]);
 return null;
}
