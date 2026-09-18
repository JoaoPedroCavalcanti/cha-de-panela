export type TitoPhoto = {
  src: string
  alt: string
  caption: string
}

export type TitoContent = {
  name: string
  title: string
  intro: string
  story: string
  roles: string[]
  photos: TitoPhoto[]
  closing: string
}

export const tito: TitoContent = {
  name: "Tito",
  title: "Tito",
  intro: "O cupido de quatro patas. Sem ele, talvez essa história fosse outra.",
  story:
    "Tito entrou na vida da gente e, do jeitinho dele, ajudou a nos aproximar. Hoje ele é da casa, da família e — vamos ser honestos — quem manda no sofá. Este chá de panela também é um pouco dele: estamos montando um lar onde tem painel, panelinha e um pinscher de plantão.",
  roles: [
    "Cupido oficial do relacionamento",
    "Gerente de operações do sofá",
    "Aprovador vitalício de petiscos",
    "Fiscal da lista de convidados",
  ],
  photos: [
    {
      src: "/photos/tito-olhar.jpg",
      alt: "Tito de olho arregalado na cama",
      caption: "Quando ouviu falar em chá de panela",
    },
    {
      src: "/photos/tito-barriga.jpg",
      alt: "Tito de barriga pra cima",
      caption: "Assinando a autorização com a barriga",
    },
    {
      src: "/photos/tito-bandana.jpg",
      alt: "Tito de bandana colorida",
      caption: "Dress code do evento, segundo ele",
    },
    {
      src: "/photos/tito-surpreso.jpg",
      alt: "Tito com cara de surpreso",
      caption: "Conferindo se o nome dele está no convite",
    },
    {
      src: "/photos/tito-carro.jpg",
      alt: "Tito deitado no carro",
      caption: "Copiloto (e dono) do banco da frente",
    },
    {
      src: "/photos/tito-deitado.jpg",
      alt: "Tito deitado de cabeça pra baixo",
      caption: "Perspectiva oficial sobre a organização da festa",
    },
    {
      src: "/photos/tito-dormindo.jpg",
      alt: "Tito dormindo de barriga pra cima",
      caption: "Depois de aprovar a lista de presentes",
    },
  ],
  closing:
    "Se vierem nos visitar, saibam: o Tito recebe, julga e — se gostar de vocês — libera o sofá. Às vezes.",
}
