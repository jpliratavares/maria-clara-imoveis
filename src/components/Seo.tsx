import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { listings, money } from '../data/listings';

const ORIGIN = 'https://claraandrade.com.br';
const SITE = 'Maria Clara Andrade França | Imóveis';
const IMAGE = `${ORIGIN}/sorriso-frontal.jpeg`;

function setMeta(selector: string, key: 'name' | 'property', field: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(key, field);
    document.head.appendChild(node);
  }
  node.content = content;
}

export default function Seo() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const listing = pathname.startsWith('/imovel/')
      ? listings.find(item => pathname === `/imovel/${encodeURIComponent(item.id)}`)
      : undefined;

    let title = 'Maria Clara Andrade França | Corretora de Imóveis em João Pessoa';
    let description = 'Conheça Maria Clara Andrade França, corretora de imóveis independente em João Pessoa e região. Atendimento próximo para comprar, vender ou alugar imóveis.';
    let image = IMAGE;
    let canonicalPath = '/';
    let indexable = pathname === '/';

    if (pathname === '/imoveis') {
      title = `Imóveis à Venda e para Alugar em João Pessoa | ${SITE}`;
      description = 'Consulte oportunidades de imóveis em João Pessoa e região com atendimento de Maria Clara Andrade França.';
      canonicalPath = '/imoveis';
      indexable = listings.length > 0 && !search;
    } else if (listing) {
      title = `${listing.title} | ${SITE}`;
      description = `${listing.type} para ${listing.deal.toLowerCase()} em ${listing.neighborhood}, ${listing.city}. ${money(listing.price)}. Conheça o imóvel e fale com Maria Clara.`;
      image = listing.images[0] || IMAGE;
      canonicalPath = `/imovel/${encodeURIComponent(listing.id)}`;
      indexable = true;
    } else if (pathname !== '/') {
      title = `Página não encontrada | ${SITE}`;
      description = 'Conheça Maria Clara Andrade França e encontre informações sobre atendimento imobiliário em João Pessoa.';
      indexable = false;
    }

    const canonical = ORIGIN + canonicalPath;
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow');
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname, search]);

  return null;
}
