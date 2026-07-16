# GRILLE-COMPARATIVE-T6 — « Béton Noéma vs container vs bois vs dur classique »

> Livrable NOEMA_CMO · Vague 0 / tactique #2 du playbook (`BENCHMARK-001.md` §4).
> Posé le 2026-07-16. **Non bloqué** par les 3 décisions de Jeremy — actif de contenu à ~0 XOF.
> Objectif : donner au prospect un **outil de décision honnête** qui fait ressortir l'argument
> n°2 (« du béton, pas du container »), tout en respectant l'anti-invention (prix indicatifs,
> chiffres non sourcés tagués `[HYP]`/`[TBV]`).
>
> **Statut prix : INDICATIF. Aucune cellule prix n'engage — devis exact gratuit.** Tant que la
> matrice de prix Noéma n'est pas actée (cf. CLAUDE.md, dossier maître), les fourchettes sont `[HYP]`.

---

## 0. Ce que cette grille doit faire (et ne pas faire)

- **Faire :** déplacer la comparaison du terrain « prix d'achat » (où le container/bois gagne) vers
  le terrain « coût réel sur la durée + confort + statut + récupérabilité » (où Noéma gagne).
- **Ne pas faire :** dénigrer nommément un concurrent (garde-fou), promettre une perf technique non
  validée, ni afficher un prix ferme. On gagne **par la preuve**, pas par le slogan.
- Règle de lecture client : *« Le container est moins cher à poser. Le béton est moins cher à vivre. »*

---

## 1. La grille (version maître — source des déclinaisons web & WhatsApp)

Comparés : **Box Commerce Noéma (béton préfabriqué, trame 1,20 m)** · **Container maritime aménagé** ·
**Local bois / préfa léger** · **Dur classique (parpaing maçonné sur place)**.
Légende : ✅ avantage net · 🟡 correct/variable · ❌ point faible. `[TBV]` = à confirmer (méthode indiquée).

| Critère | 🟦 **Noéma béton** | Container aménagé | Bois / préfa léger | Dur classique (parpaing) |
|---|---|---|---|---|
| **Délai de mise à dispo** | ✅ **Posé en 1 jour** (hors fabrication) `[hypothèse V1, à valider chantier]` | 🟡 Livré vite, mais découpe/isolation = semaines | 🟡 Rapide mais finition variable | ❌ Plusieurs semaines à mois |
| **Prix d'entrée (pose)** | 🟡 Indicatif, **devis gratuit** `[HYP]` | ✅ Souvent le moins cher à l'achat brut | ✅ Bas à l'achat | ❌ Élevé (main-d'œuvre longue) |
| **Confort thermique (climat tropical)** | ✅ **Pack climat** : double toit ventilé, ventilation traversante, casquettes `[perf −6 à −10 °C = hypothèse V1 à mesurer]` | ❌ Acier = fournaise sans clim, condensation | 🟡 Correct si bien conçu, sinon chaud | 🟡 Bon mais sans conception climat dédiée |
| **Durée de vie / vieillissement** | ✅ Béton = tient dans la durée, ne pourrit pas, ne rouille pas | 🟡 Rouille/corrosion en climat humide `[TBV durée locale]` | ❌ Pourriture, termites, entretien lourd | ✅ Bonne durée de vie |
| **Résistance feu / eau / effraction** | ✅ Béton (incombustible, ne pourrit pas) | 🟡 Acier (feu OK, corrosion KO) | ❌ Bois = feu + eau + termites | ✅ Bonne |
| **Statut social / image « du dur »** | ✅ **C'est du dur** — perçu comme un vrai local | ❌ « boîte en fer », image low-cost | ❌ Perçu provisoire | ✅ Référence du sérieux |
| **Récupérable / déplaçable (actif mobile)** | ✅ **Variante location : démontable, on le reprend** — unique sur le marché | 🟡 Déplaçable mais lourd (grue/camion) | 🟡 Démontable mais s'abîme | ❌ Non — perdu si on part |
| **Modes de paiement** | ✅ Achat · **location** · location-accession · Orange Money/Wave `[cadres à finaliser]` | ❌ Achat sec en général | ❌ Achat sec | ❌ Achat / autofinancement |
| **Suivi & confiance** | ✅ Suivi chantier photo/vidéo **sur WhatsApp** | 🟡 Selon prestataire | 🟡 Selon artisan | ❌ Chantier long, peu tracé |
| **Personnalisation (offres/niveaux)** | ✅ 5 offres × M1/M2/M3, langage P1-P9 | 🟡 Sur mesure = surcoût | 🟡 Variable | ✅ Total mais lent/cher |

> **Angle de vérité assumé :** sur la **ligne « prix d'entrée »**, le container/bois gagnent souvent. On
> ne le cache pas — on l'oppose immédiatement au **coût sur la durée** (thermique, entretien, durée de
> vie, récupérabilité) et au **statut**. C'est la mécanique Cemex/Kwikspace du benchmark : vendre la
> fiabilité et le coût total, pas le prix affiché.

### Chiffres à combler avant publication chiffrée `[TBV]`
Ne **pas** publier de prix ni de durées chiffrées tant que non sourcés :
- Fourchette prix container aménagé Abidjan 2025-26 → **relevé terrain** (2-3 ateliers) `[TBV]`.
- Durée de vie / rythme de corrosion container en climat lagunaire → **avis technique** `[TBV]`.
- Perf thermique Pack climat (−6 à −10 °C) → **mesure sur module témoin** `[hypothèse V1]` (dépend Décision 2).
- Prix « à partir de » Noéma par offre → **matrice de prix actée** (dossier maître) `[HYP]`.

---

## 2. Déclinaison WEB — page Offres (`apps/construction`)

**Emplacement :** bloc « Pourquoi le béton Noéma ? » sur la page offres, sous le comparateur d'offres.
**Titre :** *« Le container est moins cher à poser. Le béton est moins cher à vivre. »*
**Sous-titre :** *« Voici la comparaison honnête, critère par critère. »*

**Spécifications de rendu :**
- Tableau responsive mobile-first (3G, LCP < 2,5 s) : sur mobile, basculer en **cartes empilées** par
  critère (pas de scroll horizontal).
- Colonne Noéma en surbrillance (fond `Dew #B0DDF1` léger, jamais Orange sauf CTA).
- Chaque ✅ Noéma = puce couleur `Dawn #385772` ; ❌ = gris neutre, **pas** de rouge agressif sur les
  concurrents (on n'enfonce pas, on éclaire).
- Mentions obligatoires en pied de tableau :
  - *« Prix indicatifs — devis exact gratuit. »*
  - *« Performances techniques : hypothèses V1 à valider par ingénieur structure agréé. »*
- **CTA unique en fin de bloc (Orange `#FF3311`) :**
  bouton **« Recevoir mon devis gratuit sur WhatsApp »** → deep link `wa.me` avec message pré-rempli :
  `Bonjour Noéma, je compare le béton au container. J'aimerais un devis pour [offre].`
  → *tag de source à conserver dans le lien pour l'attribution (cf. Vague 0 tactique #1).*

**KPI (repris du playbook) :** taux de clic vers WhatsApp depuis la page offres. **Revue à 4 semaines.**
**Seuil d'arrêt :** si le bloc ne génère aucune conversation WhatsApp attribuée sur 4 semaines malgré du
trafic, retravailler le **titre/angle** (pas supprimer la grille — l'argument reste juste).

---

## 3. Déclinaison WHATSAPP — visuel + message prêt à envoyer

### 3a. Brief visuel (pour NOEMA_VISUAL_AGENT)
- **Format :** carré 1080×1080 (feed) + vertical 1080×1920 (statut WhatsApp/TikTok/Facebook).
- **Contenu :** version condensée à **4 critères max** (les plus vendeurs) : *Posé en 1 jour · Du béton pas
  du container · On le reprend si vous arrêtez · Frais sous le soleil (Pack climat)*.
- **Palette :** fonds `Cream #FAF6EB` / `Night #000A21` ; accents `Dawn`/`Dew` ; **Orange `#FF3311`
  réservé au seul CTA**. Respecter « Noéma » (accent).
- **Preuve visuelle :** dès qu'une photo de module réel existe (Décision 2), remplacer tout rendu 3D par
  une **photo terrain**. Tant qu'aucun module posé → pas de fausse photo, on utilise le pictogramme/rendu
  clairement identifié comme illustration.
- **CTA gravé sur le visuel :** *« Devis gratuit → WhatsApp »* + le numéro réel (dès Décision 1).

### 3b. Message texte prêt à envoyer (diffusion / réponse entrante)
```
Vous hésitez entre un container et un vrai local ?

🧱 Noéma, c'est du BÉTON, pas du fer :
• Posé en 1 jour, propre, sans gros engin
• Frais sous le soleil (toit ventilé, pas de fournaise)
• En location : on le reprend si vous arrêtez — le commerce sans le risque

Le container est moins cher à poser. Le béton est moins cher à vivre.

👉 Dites-moi votre projet, je vous envoie un devis gratuit.
```
> À n'activer **qu'une fois le numéro WhatsApp réel branché** (Décision 1). Sans numéro qui répond et
> qu'on peut tracer, on ne diffuse rien — règle Vague 0.

---

## 4. Ce qui débloque la version publiable

| Prérequis | Dépend de | Sans lui |
|---|---|---|
| Numéro WhatsApp réel + tag de source | **Décision 1** | CTA inerte → ne pas diffuser |
| Photo d'un module réel | **Décision 2** (showroom) | On reste sur illustration, jamais fausse photo |
| Fourchettes prix `[TBV]`/`[HYP]` levées | Matrice de prix + relevé terrain container | Publier la grille **sans chiffres**, sur les critères qualitatifs (déjà valable) |

**Recommandation CMO :** publier **dès maintenant la version qualitative** (sans chiffres, colonnes
critères) sur le site — elle est déjà vraie et utile — puis enrichir avec les chiffres au fur et à
mesure qu'ils sont sourcés. Ne **pas** attendre les prix pour poser l'argument.

---

*Prochaine étape logique une fois Décision 1 tranchée : intégrer ce bloc dans `apps/construction`
(page offres) + produire le visuel via NOEMA_VISUAL_AGENT. Consigner le résultat dans `LEARNINGS.md`.*
