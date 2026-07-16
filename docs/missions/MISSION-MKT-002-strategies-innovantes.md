# MISSION-MKT-002 — Diagnostic, marché & 5 stratégies de rupture

> Émetteur : Jeremy (fondateur) · Destinataire : NOEMA_CMO
> Priorité : haute · Livrable : `docs/marketing/STRATEGIE-001.md` (+ commit)
> Prérequis : avoir lu `docs/marketing/BENCHMARK-001.md` si MISSION-MKT-001
> est terminée — s'appuyer dessus, ne pas la répéter. Sinon, le signaler et
> exécuter quand même avec recherche web.

---

## 0. La commande

Trois étages, dans cet ordre, chacun nourrissant le suivant :
1. ANALYSE de mon modèle de vente et de mon produit **sous ma contrainte
   réelle : trésorerie faible**.
2. ANALYSE DE MARCHÉ (Côte d'Ivoire d'abord, Gabon ensuite).
3. **CINQ stratégies marketing innovantes** — pas les recettes que tout le
   monde recommande (« faites des réseaux sociaux », « faites de la pub
   Facebook ») : des mécaniques dignes des plus grandes multinationales,
   percutantes, mais exécutables avec notre cash. L'audace dans l'idée,
   la prudence dans le budget.

## ÉTAGE 1 — Diagnostic modèle de vente × produit × trésorerie

Analyse chaque mode de vente à travers le filtre CASH, pas seulement marge :

| À produire | Contenu exigé |
|---|---|
| Radiographie produit | Ce que le produit a d'objectivement rare (pose 1 jour, béton démontable, actif récupérable, pack tropical, trame/catalogue fermé) et ce qui est copiable en <12 mois par un concurrent |
| Cash-map des 4 modes de vente | Achat / location / location-accession / location de terrain : pour chacun, quand le cash RENTRE vs quand il SORT (fabrication, pose, BFR). Vérité à écrire noir sur blanc : la LOCATION est notre meilleure histoire marketing mais notre pire consommatrice de trésorerie au départ — comment le marketing peut-il compenser (acomptes, précommandes, sponsors) ? |
| Séquençage recommandé | Quel(s) mode(s) pousser en an 1 pour financer les autres, avec justification chiffrée [HYP] s'appuyant sur le pricing engine du repo (`apps/construction`, unit economics) |
| 3 vulnérabilités marketing | Les points où une promesse marketing pourrait dépasser notre capacité réelle (production artisanale, SAV, délais) — à verrouiller AVANT toute campagne |

## ÉTAGE 2 — Analyse de marché (recherche web obligatoire, sources datées)

- **Demande** : segments C1/C2/C3 en Côte d'Ivoire — indicateurs macro
  disponibles (urbanisation Abidjan, informel commercial, déficit sanitaires
  publics, flux diaspora) [FAIT-A/B avec source et date ; sinon TBV].
- **Offre en face** : à quoi le client compare-t-il réellement un module
  Noéma ? (container aménagé, kiosque bois/tôle, maçonnerie traditionnelle,
  local en location classique). Tableau comparatif prix/délai/durabilité/
  statut social — le « statut du dur » est un facteur culturel à traiter
  sérieusement.
- **Moments d'achat** : quand un boutiquier, une mairie, un diaspora
  décident-ils ? (rentrée, fêtes, saison sèche pour les chantiers, campagnes
  électorales locales pour les mairies [à manier avec prudence], périodes de
  transferts diaspora). Calendrier d'opportunités an 1.
- **Canaux réellement dominants** en CI par cible (WhatsApp, TikTok, radio,
  affichage, terrain, foires — Archibat) avec coûts d'entrée en fourchettes
  [HYP/TBV].
- Conclure l'étage par : **le** segment tête de pont recommandé (un seul)
  et l'insight client central qui portera toutes les campagnes.

## ÉTAGE 3 — Les 5 stratégies de rupture

Contraintes de conception :
- Interdiction de proposer du générique. Chaque stratégie doit avoir une
  MÉCANIQUE nommable (comme « Patrimonio Hoy » ou « le dépliage Boxabl ») —
  si on ne peut pas la raconter en une phrase qui surprend, elle est rejetée.
- Chacune doit s'appuyer sur un actif que NOUS avons déjà (pose en 1 jour
  filmable, module démontable, trame LEGO P1-P9, configurateur web, suivi
  WhatsApp, double implantation Chine-Afrique) — pas sur un budget média.
- Coût de lancement ≤ 500 000 XOF [HYP] par stratégie, ou financé par le
  client/partenaire (précommandes, sponsoring, troc de visibilité).
- Au moins UNE stratégie orientée prospection premium C2, au moins UNE
  orientée diaspora C3, au moins UNE purement organique/virale.

Format OBLIGATOIRE par stratégie (1 page max chacune) :
1. **Nom de code** (mémorable, en français).
2. **Le pitch en une phrase** — celle qu'on dirait à un journaliste.
3. **La mécanique** pas à pas (qui fait quoi, où, avec quoi).
4. **Inspiration multinationale** : de qui c'est adapté et ce qu'on change.
5. **Pourquoi ça marche ICI** : l'insight ivoirien/gabonais exploité.
6. **Budget** de lancement + coût de croisière [HYP], en XOF.
7. **KPI de vérité** (un seul chiffre qui dit si ça marche) + seuil d'arrêt.
8. **Risques & garde-fous** (réglementaire, réputation, capacité de prod).
9. **Premier pas exécutable sous 14 jours** avec ce qu'on a aujourd'hui.

Puis : **matrice de scoring** des 5 (impact an 1 / coût / vitesse de preuve /
risque), ton classement, et LA stratégie que tu lancerais en premier avec son
plan 90 jours détaillé semaine par semaine.

## Règles

- Respect intégral du system prompt : anti-invention ([FAIT]/[HYP]/[TBV]),
  aucun chiffre de marché inventé, prix Noéma toujours indicatifs, ligne
  rouge investissement diaspora (mode Pionniers uniquement, zéro promesse de
  rendement), aucune promesse produit non tenue par la prod.
- Aucune stratégie ne doit dépendre d'un actif qu'on n'a pas encore (usine,
  grosse flotte, notoriété) — s'il faut un module témoin, le dire comme
  prérequis explicite, pas comme acquis.
- Mettre à jour `docs/marketing/LEARNINGS.md` avec les enseignements.
- Commit + push sur la branche de travail courante. Jamais sur main.
