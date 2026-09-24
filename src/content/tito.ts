export type TitoPhoto = {
  src: string
  alt: string
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
  intro: "Nosso filho de 4 patas",
  story:
    "Tito sempre fez parte da nossa história, nos passeios, nas fotos engraçadas e agora oficialmente faz parte da nossa família.",
  roles: [
    "Cupido oficial do relacionamento",
    "Nosso designer de interiores",
    "Aprovador vitalício de petiscos",
    "Fiscal da lista de convidados",
  ],
  photos: [
    {
      src: "/photos/tito-olhar.jpg",
      alt: "Tito de olho arregalado na cama",
    },
    {
      src: "/photos/tito-barriga.jpg",
      alt: "Tito de barriga pra cima",
    },
    {
      src: "/photos/tito-bandana.jpg",
      alt: "Tito de bandana colorida",
    },
    {
      src: "/photos/tito-surpreso.jpg",
      alt: "Tito com cara de surpreso",
    },
    {
      src: "/photos/tito-carro.jpg",
      alt: "Tito deitado no carro",
    },
    {
      src: "/photos/tito-deitado.jpg",
      alt: "Tito deitado de cabeça pra baixo",
    },
    {
      src: "/photos/tito-dormindo.jpg",
      alt: "Tito dormindo de barriga pra cima",
    },
  ],
  closing:
    "Se vierem nos visitar, saibam: Tito recebe, julga e se gostar de vocês, libera o sofá. Às vezes.",
}
