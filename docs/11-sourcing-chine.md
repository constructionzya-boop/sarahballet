# 11 · Sourcing Chine — stratégie petit budget

> Document **interne** (non public). Objectif : importer moules, quincaillerie et
> premiers stocks avec un budget serré et un risque maîtrisé. Chiffres = ordres
> de grandeur indicatifs à confirmer par devis fournisseurs datés (règle §4.6).

## Principe : le 1er conteneur doit dérisquer, pas maximiser

Ne pas viser le prix unitaire le plus bas au premier achat. Viser la **preuve**
que la chaîne fonctionne : moules conformes (±2-3 mm), transitaire fiable,
dédouanement Abidjan maîtrisé. Le volume viendra après.

## 1. Groupage LCL vs conteneur complet FCL 20′

| Critère | **LCL** (groupage) | **FCL 20′** (conteneur complet) |
|---|---|---|
| Quand | Petits volumes, test, < ~12-14 m³ | Dès qu'on remplit ~2/3 d'un 20′ |
| Coût | Payé au m³/tonne + frais fixes portuaires élevés | Forfait conteneur, moins cher au m³ |
| Risque | Manutention multiple, délais variables | Scellé départ→arrivée, moins de casse |
| Seuil de bascule | — | **~10-12 m³** : au-delà, le FCL 20′ devient moins cher au m³ |

> Règle : tant qu'on est sous ~10 m³, LCL. Le jeu de moules + quincaillerie +
> élec + 1er stock marques annexes remplit vite un **20′ mixte** → viser FCL 20′
> dès le premier vrai achat (voir §7).

## 2. Négociation MOQ et moules

- **MOQ (quantité minimale)** : demander la MOQ réelle par référence ; négocier
  un premier lot réduit « échantillon de série » quitte à payer un léger surcoût.
- **Paiement moules** : **30 % d'acompte T/T**, **solde après inspection** tierce
  conforme (jamais 100 % d'avance). Refuser tout fournisseur exigeant le solde
  avant inspection.
- Faire chiffrer le **coût d'amortissement du moule par module** (déjà intégré
  dans `lib/economics.ts` → `ATELIER_FIXED.moldsAmortFcfa`).
- Exiger les **tolérances par écrit** (±2-3 mm) dans le PO et la facture pro forma.

## 3. Inspection qualité tierce (obligatoire)

- **QC avant embarquement** par un tiers indépendant (type **SGS / QIMA /
  Bureau Veritas**), ~**300 $/jour d'inspection**.
- C'est une **assurance anti-catastrophe** : 300 $ pour éviter un conteneur de
  moules hors tolérances. Non négociable dès le premier achat.
- Checklist d'inspection : dimensions/tolérances, état des surfaces de moulage,
  quantités, marquage, emballage maritime, conformité à l'échantillon validé.

## 4. Incoterms recommandé : FOB + transitaire Abidjan

- **FOB port chinois** : le fournisseur livre à bord, on maîtrise le fret via
  **notre** transitaire (meilleur contrôle des coûts qu'en CIF/DDP opaques).
- Choisir un **transitaire de confiance à Abidjan** (recommandation + antériorité
  vérifiable) qui gère fret maritime, arrivée, et **dédouanement**.
- Éviter DDP « tout compris » d'un fournisseur inconnu : marges cachées et zéro
  visibilité douane.

## 5. Checklist anti-arnaques Alibaba

1. **Fournisseur** : ancienneté, Gold/Verified, **audit d'usine** (rapport ou
   visio en direct de la ligne), références exportées vers l'Afrique de l'Ouest.
2. **Paiement** : jamais sur un compte **personnel** ; T/T société ou Trade
   Assurance. Fuir Western Union / crypto / « compte différent de la société ».
3. **Échantillon** validé et **scellé** = référence contractuelle de l'inspection.
4. **Pro forma** détaillée : specs, tolérances, Incoterm, délais, pénalités de
   retard, conditions de solde après inspection.
5. **Prix trop bas** = signal d'alerte (sous-qualité ou arnaque).
6. **Inspection tierce** = le filet qui rend les 5 points précédents opposables.

## 6. Calendrier réaliste (1er achat)

| Étape | Durée indicative |
|---|---|
| Sélection fournisseur + échantillon validé | 2-3 semaines |
| Commande moules → fabrication | **45-60 jours** |
| Inspection tierce avant embarquement | 1-2 jours |
| Transit maritime Chine → Abidjan | **~35 jours** |
| Dédouanement + acheminement dépôt | 1-2 semaines |
| **Total commande → moules au dépôt** | **~3,5 à 4 mois** |

> Planifier la trésorerie sur ce cycle : l'argent sort tôt (acompte), la valeur
> arrive ~4 mois plus tard. Aligner avec les pré-commandes (acomptes clients).

## 7. Le montage « 1er conteneur mixte » (20′)

Remplir un seul 20′ avec tout ce qui dérisque le lancement :

- **Moules** (jeu de base : poteaux rainurés, panneaux P1, claustras P2…).
- **Quincaillerie** : boulonnerie skid, platines, profilés de rainure, joints.
- **Électricité** : tableaux pré-câblés, prises, luminaires (niveau M2).
- **1er stock marques annexes** : étanchéité (Étansol), kit eau P8 (Hydralis),
  claustras/brasseurs (Ventalis), sanitaire (Saniva) — teste 4 chaînes B2B d'un
  coup.

Avantages : un seul dédouanement, un seul transitaire à roder, un coût rendu
Abidjan calculable pour **tous** les postes, et de quoi monter l'**unité
showroom** + honorer les **3 premières pré-commandes** (cf. pré-vente §4.5).

## 8. Coût rendu Abidjan (à chiffrer, ne pas engager sans devis)

Poste par poste, obtenir des devis datés : FOB + fret + assurance + **TEC
UEMOA/CEDEAO** (5/10/20 % selon catégorie) + frais portuaires + transitaire +
acheminement. Vérifier les **exonérations Code des Investissements (CEPICI)**
pour les biens d'équipement/moules. → alimente `MODULE_COST.materialsFcfa`.
