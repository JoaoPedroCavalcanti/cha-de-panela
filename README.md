# Chá de Panela

Site estático do chá de panela — Next.js (App Router), TypeScript, Tailwind e shadcn/ui. Sem backend próprio: formulários via Formspree; presentes com PIX (copiar/QR) + link de cartão (Asaas). Pronto para deploy na Vercel.

## Rotas

| Rota | Página |
|---|---|
| `/` | Home (hero + CTAs) |
| `/nossa-historia` | Nossa história |
| `/cha-de-panela` | Data, local e infos |
| `/mensagens` | Mensagem privada ao casal |
| `/presentes` | Lista de contribuições |
| `/confirmar-presenca` | RSVP |

## Como rodar (local)

```bash
npm install
npm run dev -- --port 43127 --hostname 127.0.0.1
```

No seu PC: [http://127.0.0.1:43127](http://127.0.0.1:43127).

### Compartilhar com outras pessoas (Cloudflare Tunnel)

Enquanto o `npm run dev` estiver rodando, abra **outro terminal** na pasta do projeto e rode:

```bash
npx --yes cloudflared tunnel --url http://127.0.0.1:43127
```

O Cloudflared imprime uma URL pública tipo `https://….trycloudflare.com` — mande esse link.  
Quem abrir acessa o site no seu computador (não precisa deploy). O link muda a cada vez que você reinicia o túnel; o `npm run dev` precisa continuar aberto.

Para build de produção local:

```bash
npm run build
npm start -- --port 43127
```

## Editar conteúdo

Todo o texto/config fica em `src/content/`:

- `event.ts` — nomes, data, local, PIX, link de cartão, Formspree IDs, URL do site
- `story.ts` — blocos da história + fotos
- `gifts.ts` — lista de presentes (itens **não somem** após contribuição)
- `nav.ts` — abas do menu
- `copy.ts` — textos de UI das páginas

Troque placeholders (data, local, chave PIX, etc.) antes do lançamento. Fotos: coloque arquivos em `public/` e referencie os caminhos nos content files.

## API (RSVP)

Suba o backend (`cha-de-panela-api`):

```bash
cd ../cha-de-panela-api
cp .env.example .env
docker compose up --build
```

No front, `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8088
NEXT_PUBLIC_FORMSPREE_MESSAGES_ID=xxxxxxxx   # só mensagens
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3001
```

RSVP: `POST /api/rsvp/` com `{ name, attending, notes, companions: [{ name }] }`.

## Formspree (mensagens)

Ainda usado só em `/mensagens`. Crie um form no [formspree.io](https://formspree.io) e coloque o ID em `NEXT_PUBLIC_FORMSPREE_MESSAGES_ID`.

## Presentes e pagamento

- Clique em um item abre o **PaymentSheet** (sheet inferior).
- PIX: copia a chave de `event.payment.pixKey`; QR opcional via `pixQrImageSrc`.
- Cartão: abre `cardPaymentUrl` do item ou `event.payment.cardPaymentUrl`.
- Itens permanecem na lista — é guia de contribuição, não estoque.

## Deploy na Vercel

1. Importe o repositório na [Vercel](https://vercel.com).
2. Framework: Next.js (detectado automaticamente).
3. Adicione as env vars `NEXT_PUBLIC_*` no projeto.
4. Deploy. Domínio customizado é opcional no plano free.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Formspree (mensagens)
- RSVP via API Django (`NEXT_PUBLIC_API_URL`)

## Licença

MIT (ou a que o casal preferir).
