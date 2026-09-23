# Chá de Panela

Site do chá de panela — Next.js (App Router), TypeScript, Tailwind e shadcn/ui. RSVP, mensagens e presentes via API Django (`cha-de-panela-api`); pagamento só via Asaas Checkout (PIX ou cartão). Front na Vercel.

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

- `event.ts` — nomes, data, local, URL do site
- `story.ts` — blocos da história + fotos
- `nav.ts` — abas do menu
- `copy.ts` — textos de UI das páginas

Presentes e pagamento vêm da API (`GET /api/gifts/`, `POST /api/gifts/{id}/checkout/`) — Asaas (PIX ou cartão). Sem PicPay nem chave PIX no front.

Troque placeholders (data, local, etc.) antes do lançamento. Fotos do casal: `public/photos/`.

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
- Checkout: `POST /api/gifts/{id}/checkout/` → redireciona ao Asaas (PIX ou cartão)

## Presentes e pagamento

- Lista, busca, ordenação e paginação vêm do backend.
- Clique em um item abre o sheet → botão cria checkout Asaas (PIX + cartão).
- Após `CHECKOUT_PAID` no webhook, o presente fica `is_active=false` e some da lista.
- Itens podem ser reativados no admin da API.

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
