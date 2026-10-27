# Importação de imóveis — Clau Negócios e Gestão

Perfil de referência: https://www.chavesnamao.com.br/corretor/clau-negocios-e-gestao/id-1283063/

## Estado da integração

Não foi possível recuperar os anúncios individualizados do perfil por acesso público automatizado. Não há API pública de leitura confirmada para este perfil. Portanto, o catálogo de produção começa vazio: **não publicar imóveis fictícios como reais**.

O site lê `src/data/published-listings.json`. Cada entrada validada pode gerar um card e página própria, com link de origem.

### Contrato de cada registro

```json
{
  "id": "id-estavel-do-imovel",
  "title": "Título verificado",
  "neighborhood": "Bairro",
  "city": "João Pessoa",
  "deal": "Venda",
  "type": "Apartamento",
  "price": 0,
  "beds": 0,
  "baths": 0,
  "parking": 0,
  "area": 0,
  "images": [],
  "description": "Descrição aprovada",
  "features": [],
  "featured": false,
  "sourceUrl": "https://www.chavesnamao.com.br/imovel/..."
}
```

Os números devem corresponder às informações reais; **não use 0 quando a informação for desconhecida** sem antes atualizar os componentes para aceitar valores nulos. Fotos devem ser de uso autorizado, preferencialmente hospedadas no próprio site.

## Sincronização

A integração automática depende de um feed, arquivo de exportação ou acesso autorizado fornecido pelo anunciante/CRM/portal. Não cadastrar manualmente links inferidos nem realizar coleta indiscriminada sem avaliar termos de uso e direitos sobre imagens.

Contato oficial do suporte: atendimento@chavesnamao.com.br. Solicitar exportação de anúncios ativos em XML/CSV/JSON ou acesso homologado.

## Publicação

Atualizar `published-listings.json` e enviar para `main` aciona o GitHub Actions. Conferir disponibilidade e preço antes de publicar.
