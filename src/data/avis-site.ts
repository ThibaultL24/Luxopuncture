// src/data/avis-site.ts — captures d’avis (fichiers dans public/images/avis_site/)
/** Noms de fichiers affichés dans les banderoles « avis écrits ». Ajouter/retirer des PNG ici après changement dans le dossier. */
export const avisSiteFilenames: readonly string[] = [
  'avis-carine-garrigos.png',
  'avis-chrystelle-lebeau.png',
  'avis-claire-doriac.png',
  'avis-claire-emmanuelle-meyer.png',
  'avis-cynthia-cc.png',
  'avis-dl-tabac.png',
  'avis-eg-pd.png',
  'avis-fb-tabac.png',
  'avis-gl-pd.png',
  'avis-gm-pd.png',
  'avis-gr-relaxation.png',
  'avis-h-karbajou.png',
  'avis-laurianne-dauba-pd.png',
  'avis-lea-barrier.png',
  'avis-lm-pd.png',
  'avis-marie-france-zumaquero.png',
  'avis-martine-debusquois.png',
  'avis-pluchart-trucchiero.png',
  'avis-sandrine-rey.png',
  'avis-thibault.png',
]

const BASE = '/images/avis_site/'

export function avisSiteImageSrc(filename: string): string {
  return `${BASE}${filename}`
}
