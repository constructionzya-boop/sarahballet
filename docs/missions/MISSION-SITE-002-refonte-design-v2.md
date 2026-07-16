# MISSION-SITE-002 — Refonte design V2 « Vitrine minimale animée »

> Émetteur : Jeremy (fondateur) · Destinataire : session SITE
> Priorité : haute · Portée : `apps/construction` (design system `@noema/ui`)
> Verdict fondateur sur la V1 : architecture et prestations VALIDÉES,
> design REFUSÉ — positions/orientations des widgets, densité de widgets
> et animations insuffisantes. **Refonte complète de la peau du site.**
> Jeremy fournira des détails complémentaires après la passe 1 : la mission
> s'exécute par passes avec point d'arrêt (voir §7).

---

## 1. Ce qui NE CHANGE PAS (interdit d'y toucher)

- Architecture d'information : routes, pages, offres/prestations, contenus,
  i18n, SEO, données structurées.
- Fonctionnel : configurateur 3 presets, checkout, espace investisseurs,
  visite 3D, deep links WhatsApp, tracking source de lead.
- Contraintes produit : trame 1,20 m, nomenclature P1-P9, prix indicatifs.
- Budget perf : mobile-first 3G, LCP < 2,5 s, CLS < 0,1.

Tout le reste — layout, composition, composants visuels, animations,
décoration — est à REFAIRE.

## 2. Référence maîtresse : le template « constructeur minimaliste »

Jeremy a validé un template de landing page de constructeur (maisons
ossature bois) dont voici la décomposition exacte à transposer :

- **Canvas** : fond gris perle très clair, quasi blanc. Le contenu vit dans
  des CARTES BLANCHES flottantes à très grand radius (24-32 px), ombres
  douces larges et diffuses (jamais dures), généreusement espacées. La page
  respire : ~96-128 px entre sections desktop, 48-64 px mobile.
  → Adapter à Noéma : fond Snow `#F7F1EC` (ou Cream avec grain déjà en
  place), cartes blanches pures, texte Night `#000A21`.
- **Navbar** : fine, intégrée à la première carte, liens discrets à gauche,
  2 pills à droite (CTA « Laisser une demande » + téléphone). → Chez nous :
  pill « Devis WhatsApp » (Orange) + pill téléphone (outline Night).
- **HERO scindé** : à gauche, H1 très grand avec la promesse chiffrée
  (« Maison clé en main dès 100 m² en 2 mois » → chez nous : « Votre local
  en béton, posé en 1 jour ») + sous-titre 2 lignes + CTA pill sombre.
  À droite, GRANDE CARTE PHOTO arrondie (le produit en situation) qui
  déborde légèrement en hauteur, avec 2 pills FLOTTANTS posés dessus en
  haut. Le hero est LUI-MÊME une carte, pas une section pleine largeur.
- **Rangée de 3 STAT-CARDS** sous le hero : chaque carte = petite pastille
  photo ronde en haut, GROS CHIFFRE (65~, 7+, 180+) puis légende grise
  2 lignes. → Chez nous : « 1 jour de pose », « 2 700 mm sous plafond »,
  « 5 offres, 3 niveaux M1-M3 » (uniquement des faits vrais du repo).
- **Section « technologie »** : titre 2 lignes + paragraphe à gauche,
  ILLUSTRATION AXONOMÉTRIQUE grise au centre (chez nous : éclaté du
  système poteaux rainurés + panneaux, SVG ou rendu 3D statique), et à
  droite une COLONNE DE CARTES SOMBRES (fond Night, radius 20 px) :
  vignette photo arrondie à gauche, titre blanc + 2 lignes grises.
  3 cartes : Solidité béton / Fraîcheur pack tropical / Démontable.
- **Catalogue** : cartes photo pleine image en carousel, bandeau overlay en
  bas de chaque carte (nom + « à partir de X »), flèches de navigation
  rondes, CTA pill « Voir le catalogue ». → Nos 5 offres.
- **Modes de paiement** : grille de 4 cartes ALTERNÉES claire/sombre/claire/
  sombre, titre + paragraphe court + flèche ronde en coin bas-droit.
  → Achat / Location / Location-accession / Mobile money & CB.
- **Process** : « Trois pas vers votre nouveau local » — 3 colonnes avec
  NUMÉROS GÉANTS en outline (1 2 3), titre, paragraphe. → Configurez sur
  WhatsApp / Fabrication atelier / Pose en 1 jour.
- **Typographie** : sans-serif géométrique, titres en graisse moyenne
  (pas black), interlignage serré, beaucoup de gris moyen pour le texte
  secondaire. Chiffres = élément décoratif majeur.

## 3. Masques d'images organiques (référence 2)

Les photos ne sont plus des rectangles : créer un composant
`MaskedPhoto` (évolution de PhotoFrame, garder le mode placeholder) avec
des variants de découpe SVG `clip-path` :
- `diagonal` : image fendue par 2 bandes diagonales arrondies (effet X).
- `lobes` : masque en 4 lobes verticaux arrondis (effet colonnes).
- `corner` : un seul angle mangé par une grande courbe.
- `wave-edge` : bord latéral ondulé organique.
Usage : 1 masque fort maximum par section, jamais deux différents côte à
côte. Les masques sont des `<clipPath>` SVG réutilisables (pas d'images
pré-découpées), donc compatibles placeholders actuels.

## 4. Séparateurs de sections (référence 3)

Créer `SectionDivider` : composant SVG full-width entre deux sections de
couleurs différentes, variants : `wave`, `curve`, `tilt`, `tilt-opacity`
(2 couches translucides), `drops`, `zigzag`, `clouds`, `mountains`.
- Props : `variant`, `from`, `to` (tokens couleur), `flip`, `height`.
- Usage sobre : 2-3 dividers max par page, aux transitions fortes
  (ex. Snow → Night avant le footer, Night → Snow après le hero sombre
  d'une page intérieure). Le reste des transitions = simple espace.
- Implémentation : `<svg preserveAspectRatio="none">` + path, AUCUNE image.

## 5. Widgets & animations (le manque n°1 de la V1)

Inventaire MINIMUM de composants animés à livrer dans `@noema/ui` (chacun
démontré dans /kitchen-sink) :
1. `StatCard` avec **compteur animé** au scroll (0 → valeur, 1,2 s, ease-out).
2. `FeatureCardDark` (vignette + texte, hover : lift 4 px + ombre).
3. `OfferCard` catalogue (hover : zoom photo 1,05, overlay qui se soulève).
4. `PaymentCard` claire/sombre avec flèche ronde animée au hover (rotation
   -45° → 0°).
5. `ProcessStep` numéro outline géant (le numéro se dessine au scroll —
   stroke-dashoffset).
6. `MaskedPhoto` (§3) avec parallax interne léger (l'image bouge de ~8 %
   dans son masque au scroll).
7. `SectionDivider` (§4).
8. `FloatingPill` (badges posés sur les photos hero, apparition décalée).
9. `Marquee` défilement infini (villes desservies, composants P1-P9).
10. `TimelinePose` : frise horizontale « la pose en 1 jour » heure par
    heure, progression au scroll.
11. `AccordionFAQ` (hauteur animée, chevron rotatif).
12. `TestimonialCard` avec avatar + note.
13. `WhatsAppFAB` flottant : apparaît après 600 px de scroll, pulse
    discret toutes les 8 s.
14. `StickyNav` : la navbar se détache en pill compacte glassmorphism au
    scroll (déjà en place → conserver mais harmoniser avec la nouvelle DA).
15. `ConfiguratorTeaser` : carte home qui aperçoit le configurateur avec
    micro-animation de swap de façade.

Règles d'animation GLOBALES (Framer Motion, `LazyMotion` + `domAnimation`) :
- Reveal on scroll par défaut : fade + translateY 24 px, durée 0,5 s,
  stagger 80 ms entre enfants, `once: true` (jamais de re-trigger).
- UNIQUEMENT `transform` et `opacity` (GPU) — jamais width/height/top en
  animation continue.
- `prefers-reduced-motion` : tout se réduit à un fade simple.
- Micro-interactions : boutons scale 0,98 au press ; liens avec underline
  qui se dessine.
- Aucune animation bloquante avant LCP : le hero apparaît immédiatement,
  les reveals ne concernent que le below-the-fold.

## 6. Adaptation charte (rappel des tokens)

Night `#000A21` (cartes sombres, nav, footer) · Dawn `#385772` (secondaire)
· Dew `#B0DDF1` (accents doux, fonds de pastilles) · Cream `#FAF6EB` /
Snow `#F7F1EC` (fonds) · Sand `#EBDDCF` (surfaces chaudes) · Orange
`#FF3311` (CTA et accents UNIQUEMENT — jamais en fond de section).
Le template de référence est gris/noir : le transposer dans CETTE palette,
ne pas copier ses gris.

## 7. Exécution par passes (commit + rapport à chaque passe)

- **Passe 1** : tokens/DA + les 15 composants dans `@noema/ui` + refonte
  complète de la HOME selon §2 + /kitchen-sink à jour. Build + lint + tests
  verts, captures d'écran des sections. **PUIS STOP : rapport en 10 lignes
  et attendre les détails complémentaires de Jeremy avant les pages
  intérieures.**
- **Passe 2** (après retour de Jeremy) : décliner sur les pages offres,
  configurateur, investisseurs, contact.
- **Passe 3** : polish responsive complet + audit perf (Lighthouse mobile,
  LCP < 2,5 s prouvé) + accessibilité (contrastes AA, focus visibles,
  reduced-motion testé).
- Chaque passe = 1 commit minimum, message clair en français, push sur la
  branche de travail courante. Jamais sur main.
