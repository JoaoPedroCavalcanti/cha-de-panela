# Chá de Panela — contexto para o agent

Documento condensado do que foi alinhado com o casal. Use isto como fonte de verdade para tasks. UI em português; commits/código em inglês.

## Objetivo
Site one-shot do chá de panela: bonito, mobile-first (maioria abre no celular), focado em presentes/contribuições. Uso único; tráfego baixo (~10–20 simultâneos).

Repo: https://github.com/JoaoPedroCavalcanti/cha-de-panela  
Branch de trabalho: `main`

## Decisões fechadas
- **Estático**, sem backend próprio, sem banco, sem auth
- **Hospedagem:** Vercel (free)
- **Presentes = contribuição** com valor sugerido; itens **nunca somem** (não é estoque/reserva)
- **Pagamento:** PIX (chave/QR + valor só como texto de referência) + cartão via link (PicPay). **Sem Asaas/API** de gateway
- **Mensagens aos noivos:** privadas (só o casal recebe) — form → Formspree, **sem mural público**
- **RSVP / confirmar presença:** form no site → Formspree
- Lista de presentes: placeholders inventados; casal define conteúdo real depois
- Nomes reais: `Carol & João` (em `src/content/event.ts`)
- Fotos do casal: em `public/photos/` (originais locais em `/fotos`, ignorado no git)
- Data/local/PIX reais: ainda placeholders em `src/content/`

## Abas / rotas
| Rota | Aba |
|---|---|
| `/` | Home (hero + CTAs) |
| `/nossa-historia` | Nossa história |
| `/cha-de-panela` | Chá de panela (data, local, infos) |
| `/mensagens` | Mensagens aos noivos (form privado) |
| `/presentes` | Presentes |
| `/confirmar-presenca` | Confirmar presença |

## Stack
- Next.js App Router + TypeScript + Tailwind + shadcn/ui
- Conteúdo em `src/content/` (`event.ts`, `story.ts`, `gifts.ts`, `nav.ts`, `copy.ts`)
- Formspree via env: `NEXT_PUBLIC_FORMSPREE_MESSAGES_ID`, `NEXT_PUBLIC_FORMSPREE_RSVP_ID`, `NEXT_PUBLIC_SITE_URL`
- Ver `.env.example` e `README.md`

## Fluxo de presentes
1. Grid de itens → clique abre PaymentSheet
2. Mostra valor, PIX (copiar), QR opcional, botão cartão (PicPay)
3. Agradecimento no sheet; item permanece na lista

## Referências de design
Inspiração visual/UX (aplicar no design-pass; não copiar conteúdo):

1. **Ceremony (Framer)** — https://ceremony.framer.website/  
   Editorial, hero com foto do casal, serif + sans, seções espaçosas, RSVP com foto ao lado.

2. **iCasei (Gabriela e Mateus)** — https://sites.icasei.com.br/gabrielemateus2927/home  
   Site BR de casamento: abas/páginas, grid de presentes claro, form de RSVP prático.

**Direção:** clima/editorial do Ceremony + padrões práticos do iCasei (nav, gifts, forms).  
Mobile-first. Evitar visual genérico “AI purple/cream”.

## O que já está pronto
- Scaffold Next + páginas das 5 abas + home
- PaymentSheet (PIX/PicPay)
- Forms Mensagens + RSVP (estados UI + Formspree)
- README, OG image, conteúdo placeholder
- Código na `main` do GitHub

## Próximo (prioridade)
1. **Design-pass** com as refs acima (tipografia, cores, hero full-bleed, fotos, motion sutil)
2. Conteúdo real (nomes, data, local, PIX, lista de presentes, fotos)
3. Configurar Formspree + env
4. Deploy Vercel
5. Opcional: `package-lock.json` / favicon se faltarem no clone (`npm install` regenera lock)

## Fora de escopo
- Backend/API própria, Supabase, mural público de mensagens
- Asaas / PIX dinâmico por API
- Reserva/estoque de presentes / contador “já compraram”
- Hospedar no PC do casal

## Como trabalhar neste repo (preferência do dono)
- Editar no **clone local** do usuário; commit + push
- **Não** abrir Cloud VM só para editar/subir
- Sem `cursor/` (ou menção a Cursor/agent) em nomes de branch, commits ou texto user-facing
- Commits como se o dono tivesse feito; mensagens em inglês, clean conventional commits
- Push direto na branch pedida (em geral `main`), sem teatro desnecessário de PR — a menos que peçam PR

## Onde mexer
- Textos/config: `src/content/*`
- Páginas: `src/app/**`
- UI: `src/components/**`
- Assets: `public/`

## Critérios de qualidade
- Responsivo (prioridade celular)
- Copy real em PT-BR (sem lorem)
- Estados de form: idle / loading / success / error
- Presentes nunca desaparecem após “pagamento”
