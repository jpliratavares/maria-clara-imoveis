import source from './published-listings.json';
export type Deal = 'Venda' | 'Aluguel';
export type Listing = { id:string; title:string; neighborhood:string; city:string; deal:Deal; type:string; price:number; beds:number; baths:number; parking:number; area:number; images:string[]; description:string; features:string[]; featured?:boolean; sourceUrl?:string };
export const listings: Listing[] = source as Listing[];
export const money=(value:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(value);
