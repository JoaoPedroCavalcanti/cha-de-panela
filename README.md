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

## Formspree (mensagens + RSVP)

1. Crie uma conta em [formspree.io](https://formspree.io).
2. Crie **dois** forms (ou um com campo `formType`):
   - Mensagens aos noivos
   - Confirmar presença
3. Copie o ID de cada form (`https://formspree.io/f/<ID>`).
4. Crie `.env.local` na raiz:

```bash
NEXT_PUBLIC_FORMSPREE_MESSAGES_ID=xxxxxxxx
NEXT_PUBLIC_FORMSPREE_RSVP_ID=yyyyyyyy
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

5. Reinicie o `npm run dev`. Sem esses IDs, os forms mostram estado de erro com instrução clara (útil em desenvolvimento).

Campos enviados:

- **Mensagens:** `name`, `message`, `contact?`, `formType=mensagem`
- **RSVP:** `name`, `phone`, `email?`, `attending`, `guests`, `notes?`, `formType=rsvp`

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
- Formspree (somente no cliente)
- Sem banco, auth ou API própria de gateway

## Licença

MIT (ou a que o casal preferir).
