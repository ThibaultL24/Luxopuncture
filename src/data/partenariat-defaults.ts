// src/data/partenariat-defaults.ts — fiches « recommandations » (page /recommandations)
import type { PartenariatPartnerCard } from '../lib/admin-types'

/** Contenu inspiré de la marque [CCC&BIO](https://cccetbio.fr/) — cosmétiques bio, France. */
export const defaultPartenariatPartnerCards: PartenariatPartnerCard[] = [
  {
    id: 'caroline-cccetbio',
    name: 'Caroline',
    role: 'Fondatrice de CCC&BIO — cosmétiques naturels & bio',
    paragraphs: [
      'Caroline est derrière CCC&BIO, une marque de soins **cosmétiques naturels et bio**, **fabriqués en France**, pensés pour le confort de la peau au quotidien.',
      'Les formules sont **certifiées Ecocert**, **labellisées Cosmébio** et **vegan** ; chaque produit est élaboré avec des ingrédients d’origine naturelle et biologique, sans test sur les animaux.',
      'On y trouve notamment une **huile de soin buste & poitrine au néroli bio** et un **contour des yeux à l’eau florale de bleuet bio** — deux gestes simples pour prendre soin des zones sensibles avec douceur.',
      'Je suis heureuse de mettre en avant cette démarche : une beauté bio authentique, transparente et respectueuse de vous comme de l’environnement.',
    ],
    images: [
      { src: '/images/caroline1.jpeg', alt: 'Caroline — fondatrice de CCC&BIO' },
      { src: '/images/caroline2.jpg', alt: 'CCC&BIO — cosmétiques bio' },
      { src: '/images/caroline3.jpg', alt: 'Soins naturels CCC&BIO' },
      { src: '/images/caroline4.jpg', alt: 'Caroline — marque CCC&BIO' },
      { src: '/images/caroline5.jpg', alt: 'CCC&BIO — produits fabriqués en France' },
      { src: '/images/caroline8.jpg', alt: 'CCC&BIO — soins bio et engagement' },
    ],
    websiteUrl: 'https://cccetbio.fr/',
    websiteLabel: 'cccetbio.fr',
    socials: {
      instagram: 'https://www.instagram.com/_cccetbio/',
      facebook: 'https://www.facebook.com/share/1CVdewam2o/',
      linkedin: 'https://www.linkedin.com/in/caroline-gallouin-0a8242385/',
    },
  },
  {
    id: 'thibault-lenormand-dev',
    name: 'Thibault Lenormand',
    role: 'Développeur fullstack — je vous le recommande',
    paragraphs: [
      'Je tenais à mettre en avant **Thibault** : ce n’est pas une fiche “profil”, c’est une **recommandation**. Son parcours ne ressemble à aucun autre — **lettres modernes**, **théâtre** au Cours Florent, puis le **code** et le **web2 / web3**. On sent chez lui ce mélange rare : exigence sur les mots, goût pour le travail bien fait, et une vraie **écoute** quand il conçoit un outil ou une interface.',
      'Formé au bootcamp **The Hacking Project**, il accompagne des projets qui vont du site classique aux sujets plus **techniques** (données, **IA**, **Web3**). Il s’implique aussi dans l’écosystème **Intuition**, où il porte une vision de la **réputation** et du **contrôle des données** plus équitable pour les utilisateurs. Quand il faut expliquer ou rédiger, son bagage littéraire fait la différence : les textes restent **clairs** et **humains**.',
      'Si vous cherchez quelqu’un pour un **projet digital** — avec du **sens**, de la **pédagogie** et le souci du **détail** — vous pouvez le contacter via son **profil Malt** pour une mission ou un échange. Les liens ci-dessous permettent aussi de voir son travail et de le suivre.',
    ],
    images: [{ src: '/images/thibault-lenormand.png', alt: 'Thibault Lenormand' }],
    websiteUrl: 'https://www.malt.fr/profile/thibaultlenormand1',
    websiteLabel: 'Malt — missions & contact',
    socials: {
      instagram: '',
      facebook: '',
      linkedin: 'https://www.linkedin.com/in/thibault-lenormand-b38b96268/',
      github: 'https://github.com/ThibaultL24',
      x: 'https://x.com/ThibaultLENORM2',
    },
  },
]
