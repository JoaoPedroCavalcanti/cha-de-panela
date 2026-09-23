# Chá de Panela

Site do chá de panela — Next.js (App Router), TypeScript, Tailwind e shadcn/ui. RSVP, mensagens e presentes via API Django (`cha-de-panela-api`); pagamento PIX + link Asaas. Front na Vercel.

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

- `event.ts` — nomes, data, local, PIX, link de cartão, URL do site
- `story.ts` — blocos da história + fotos
- `nav.ts` — abas do menu
- `copy.ts` — textos de UI das páginas

Presentes vêm da API (`GET /api/gifts/`), não de arquivo estático.

Troque placeholders (data, local, chave PIX, etc.) antes do lançamento. Fotos do casal: `public/photos/`.

## API (RSVP, mensagens, presentes)

Suba o backend (`cha-de-panela-api`):

```bash
cd ../cha-de-panela-api
cp .env.example .env
docker compose up --build
docker compose exec api python manage.py seed_gifts
```

No front, `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8088
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3001
```

- RSVP: `POST /api/rsvp/` — `{ name, attending, notes, companions: [{ name }] }`
- Mensagens: `POST /api/messages/` — `{ name, message }` (lidas no `/admin`)
- Presentes: `GET /api/gifts/?q=&page=&page_size=&sort=` (CRUD + fotos no `/admin`)

## Presentes e pagamento

- Lista, busca, ordenação e paginação vêm do backend.
- Clique em um item abre o **PaymentSheet**.
- PIX: chave em `event.payment.pixKey`; QR opcional via `pixQrImageSrc`.
- Cartão: `cardPaymentUrl` do item ou `event.payment.cardPaymentUrl`.
- Itens não somem após contribuição — é guia, não estoque.

## Deploy na Vercel

1. Importe o repositório na [Vercel](https://vercel.com).
2. Framework: Next.js (detectado automaticamente).
3. Adicione `NEXT_PUBLIC_API_URL` (URL pública da API) e `NEXT_PUBLIC_SITE_URL`.
4. Deploy. Domínio customizado é opcional no plano free.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui
- RSVP, mensagens e presentes via API Django (`NEXT_PUBLIC_API_URL`)

## Licença

MIT (ou a que o casal preferir).
