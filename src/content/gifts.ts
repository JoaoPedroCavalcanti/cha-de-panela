import type { GiftItem } from "./types"

/**
 * Placeholder gift list. Items never disappear after a contribution —
 * this is a contribution guide, not inventory.
 */
export const gifts: GiftItem[] = [
  {
    id: "jogo-de-panelas",
    name: "Jogo de panelas",
    description: "Conjunto antiaderente para o dia a dia na cozinha nova.",
    amountBRL: 320,
  },
  {
    id: "jogo-de-talheres",
    name: "Jogo de talheres",
    description: "24 peças em aço inox para receber família e amigos.",
    amountBRL: 180,
  },
  {
    id: "liquidificador",
    name: "Liquidificador",
    description: "Potente o bastante para vitaminas, molhos e aquela maionese.",
    amountBRL: 250,
  },
  {
    id: "jogo-de-toalhas",
    name: "Jogo de toalhas",
    description: "Toalhas macias para o banheiro do nosso cantinho.",
    amountBRL: 150,
  },
  {
    id: "air-fryer",
    name: "Air fryer",
    description: "Para jantares rápidos sem abrir mão do sabor.",
    amountBRL: 450,
  },
  {
    id: "contribuicao-livre",
    name: "Contribuição livre",
    description: "Escolha o valor que fizer sentido para você — qualquer carinho ajuda.",
    amountBRL: 100,
  },
]
