// src/data/publications.ts — articles & billets (Camille)
export interface Publication {
  slug: string
  title: string
  /** ISO YYYY-MM-DD (tri et affichage) */
  date: string
  excerpt: string
  body: string[]
  /** Optionnel — carte liste et bandeau article */
  coverImage?: string
}

const MONTHS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const

export function formatPublicationDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return `${d} ${MONTHS_FR[m - 1]} ${y}`
}

export const defaultPublications: Publication[] = [
  {
    slug: 'se-former-hypnose-luxopuncture-champ-developpement',
    date: '2026-03-28',
    title: 'Se former à l’hypnose ou à la luxopuncture : un champ en développement',
    excerpt:
      'Formations, publics variés et compétences transversales : où en sont les métiers d’accompagnement non médicamenteux.',
    body: [
      'Le développement des pratiques d’accompagnement non médicamenteuses a ouvert la voie à de nouveaux parcours professionnels. Les formations en hypnose et en luxopuncture attirent aujourd’hui un public varié, allant des professionnels de santé aux personnes en reconversion.',
      'L’hypnose dispose d’un cadre relativement structuré, avec différentes écoles et courants, souvent inspirés des travaux de Milton Erickson. Les formations peuvent varier en durée et en contenu, mais elles s’appuient généralement sur une base théorique et pratique solide.',
      'La luxopuncture, plus récente, repose sur une transmission plus directe, souvent organisée autour de formations courtes. Elle s’inscrit dans la continuité des techniques réflexes, avec une adaptation technologique qui en simplifie l’usage.',
      'Ces pratiques s’inscrivent dans une évolution plus large du rapport au soin et à l’accompagnement. Elles répondent à une demande croissante de prise en compte des dimensions émotionnelles et comportementales.',
      'Au-delà de la technique, le métier repose sur des compétences transversales : capacité d’écoute, compréhension des mécanismes humains, adaptation aux situations individuelles. C’est cette dimension qui structure la relation entre le praticien et la personne accompagnée.',
      'Le secteur est encore en structuration, avec une diversité d’approches et de formations. Cette dynamique contribue à définir progressivement les contours de ces métiers, à la croisée entre accompagnement, bien-être et transformation des comportements.',
    ],
    coverImage: '/images/blog/article-5.png',
  },
  {
    slug: 'reequilibrage-alimentaire-transformation-comportements',
    date: '2026-03-22',
    title: 'Rééquilibrage alimentaire : une transformation des comportements',
    excerpt:
      'Au-delà des régimes restrictifs : habitudes, stress et accompagnements qui visent des changements durables.',
    body: [
      'Le rééquilibrage alimentaire ne se résume pas à une question de nutrition. Il implique une compréhension plus large des mécanismes qui régulent la prise alimentaire, à la fois physiologiques, comportementaux et émotionnels.',
      'Le corps dispose de systèmes de régulation internes, notamment les signaux de faim et de satiété. Mais ces signaux peuvent être perturbés par des facteurs extérieurs, en particulier le stress. Dans de nombreuses situations, l’alimentation devient une réponse émotionnelle, indépendante des besoins réels.',
      'Les régimes restrictifs ont longtemps été la réponse privilégiée à ces déséquilibres. Pourtant, leur efficacité à long terme reste limitée. La restriction entraîne souvent frustration et perte de repères, ce qui peut conduire à des comportements compensatoires.',
      'Le rééquilibrage alimentaire propose une approche différente. Il s’agit de restaurer une relation plus stable à l’alimentation, en travaillant sur les habitudes et sur les déclencheurs des comportements. Dans ce cadre, certaines pratiques comme l’hypnose ou la luxopuncture peuvent intervenir en amont, en aidant à réduire les compulsions et à mieux gérer le stress.',
      'Cette approche s’inscrit dans une logique progressive. Plutôt que de transformer brutalement les habitudes, elle vise à instaurer des changements durables, en tenant compte du rythme de chacun. Elle repose autant sur la compréhension des comportements que sur les connaissances nutritionnelles.',
    ],
    coverImage: '/images/blog/article-4.png',
  },
  {
    slug: 'arret-tabac-mecanismes-comprendre',
    date: '2026-03-15',
    title: 'Arrêt du tabac : comprendre les mécanismes pour mieux agir',
    excerpt:
      'Dépendance physique, comportementale et psychologique : pourquoi le sevrage est complexe et comment les approches se complètent.',
    body: [
      'L’arrêt du tabac constitue l’un des défis les plus complexes en matière de comportement. Si la dépendance à la nicotine joue un rôle central, elle ne suffit pas à expliquer la difficulté du sevrage. Le tabac s’inscrit dans un ensemble de routines, de gestes et d’associations émotionnelles qui renforcent sa persistance.',
      'La dépendance est en réalité triple. Elle est d’abord physique, liée à la nicotine, qui agit sur les circuits de récompense du cerveau. Elle est ensuite comportementale, à travers des gestes répétés au fil de la journée. Elle est enfin psychologique, associée à des moments de pause, de gestion du stress ou de socialisation.',
      'Les méthodes classiques de sevrage reposent sur les substituts nicotiniques et sur l’accompagnement comportemental. Elles visent à réduire progressivement la dépendance physique tout en modifiant les habitudes. En parallèle, des approches complémentaires comme l’hypnose ou les techniques réflexes, dont la luxopuncture, se sont développées pour agir sur les dimensions psychologiques et émotionnelles.',
      'Ces méthodes n’interviennent pas directement sur la dépendance chimique, mais cherchent à faciliter le changement en réduisant les automatismes et en modifiant la perception du manque. Elles peuvent contribuer à apaiser l’anxiété, à diminuer les compulsions et à renforcer la motivation.',
      'L’arrêt du tabac s’inscrit rarement dans un processus linéaire. Il implique souvent plusieurs tentatives, des ajustements, et une transformation progressive des habitudes. Dans ce contexte, les différentes approches disponibles peuvent être combinées, chacune agissant sur un aspect spécifique de la dépendance.',
    ],
    coverImage: '/images/blog/article-3.png',
  },
  {
    slug: 'hypnose-pratique-ancienne-outil-contemporain',
    date: '2026-03-08',
    title: 'Hypnose : une pratique ancienne devenue outil contemporain',
    excerpt:
      'Des origines du XVIIIe siècle aux usages actuels : ce qu’est vraiment l’état d’hypnose et pourquoi il agit sur les comportements automatisés.',
    body: [
      'L’hypnose occupe une place singulière dans le paysage des pratiques thérapeutiques. Longtemps associée à l’univers du spectacle, elle est aujourd’hui utilisée dans des contextes variés, allant de la gestion du stress à l’accompagnement de la douleur ou des addictions.',
      'Ses origines remontent au XVIIIe siècle, avec les travaux de Franz Anton Mesmer, qui introduit la notion de « magnétisme animal ». Si cette théorie a été abandonnée, elle ouvre la voie à une exploration des états modifiés de conscience. Au XIXe siècle, des médecins comme James Braid ou Jean-Martin Charcot contribuent à transformer l’hypnose en objet d’étude scientifique. Mais c’est au XXe siècle, avec Milton Erickson, que l’hypnose prend sa forme moderne. Erickson développe une approche plus souple, centrée sur le langage, la suggestion et l’expérience subjective.',
      'Contrairement aux idées reçues, l’hypnose ne correspond pas à un état de sommeil. Il s’agit plutôt d’un état de concentration intense, dans lequel l’attention est focalisée et le filtrage critique habituel est atténué. Cet état permet d’accéder plus facilement à certains automatismes ou schémas mentaux, souvent à l’origine de comportements répétitifs.',
      'Dans ce cadre, l’hypnose est utilisée pour intervenir sur des comportements profondément ancrés. Elle permet, par exemple, de modifier les associations inconscientes liées à la cigarette, à l’alimentation ou au stress. Elle est également employée dans le domaine médical, notamment pour la gestion de la douleur ou de l’anxiété, et fait l’objet d’un nombre croissant de recherches.',
      'L’intérêt de l’hypnose réside dans sa capacité à agir là où les approches purement rationnelles montrent leurs limites. Plutôt que de convaincre, elle propose une expérience qui permet d’intégrer différemment certaines informations. Cette dimension expérientielle explique en partie son efficacité dans des domaines où les comportements sont fortement automatisés.',
    ],
    coverImage: '/images/blog/article-2.png',
  },
  {
    slug: 'luxopuncture-approche-moderne-techniques-reflexes',
    date: '2026-03-01',
    title: 'Luxopuncture : une approche moderne issue des techniques réflexes',
    excerpt:
      'Lumière infrarouge, points réflexes et attentes contemporaines : comment la luxopuncture prolonge l’acupuncture sans aiguille.',
    body: [
      'La luxopuncture est une pratique relativement récente, apparue en France au début des années 2000, qui s’inscrit dans la continuité des techniques dites réflexes, tout en cherchant à s’adapter aux attentes contemporaines. Elle se distingue par son approche non invasive et par l’utilisation de la lumière infrarouge pour stimuler certains points du corps.',
      'Inspirée directement de l’acupuncture traditionnelle chinoise, la luxopuncture reprend le principe selon lequel des zones spécifiques du corps sont reliées à des fonctions physiologiques et émotionnelles. Là où l’acupuncture utilise des aiguilles pour activer ces points, la luxopuncture repose sur un faisceau infrarouge appliqué à la surface de la peau à l’aide d’un stylet. Cette stimulation est indolore et ne provoque aucune effraction cutanée, ce qui la rend particulièrement accessible à un public réticent aux méthodes invasives.',
      'Le mécanisme avancé repose sur la stimulation de circuits neuro-hormonaux impliqués dans la régulation du stress, de l’appétit et des comportements addictifs. Certains points seraient associés à la libération d’endorphines, connues pour leur effet apaisant, ou à la modulation du système nerveux autonome. Dans ce cadre, la luxopuncture est principalement utilisée pour accompagner des problématiques liées à l’arrêt du tabac, au rééquilibrage alimentaire ou à la gestion du stress.',
      'Son développement s’explique en partie par une évolution des attentes : de plus en plus de personnes recherchent des approches douces, sans médicament, capables d’agir à la fois sur le corps et sur le comportement. La luxopuncture s’inscrit dans cette tendance, en proposant une intervention rapide, généralement organisée en plusieurs séances rapprochées.',
      'Si elle ne dispose pas encore d’un corpus scientifique équivalent à celui de disciplines médicales plus anciennes, elle s’inscrit néanmoins dans une logique cohérente avec les recherches actuelles sur les interactions entre système nerveux, émotions et comportements. À ce titre, elle trouve sa place comme outil d’accompagnement, notamment dans des démarches de changement où la dimension comportementale est centrale.',
    ],
    coverImage: '/images/blog/article-1.png',
  },
]

export function getPublicationBySlug(slug: string, items: Publication[]): Publication | undefined {
  return items.find((p) => p.slug === slug)
}

export function listPublicationsNewestFirst(items: Publication[]): Publication[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}
