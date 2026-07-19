# Étude — Toit parasol & lame d'air 300 sous pluies battantes et rafales (V1)

> Bureau d'études Noéma · Mission C (question d'étude) — « le toit parasol et
> sa lame d'air ouverte tiennent-ils les fortes pluies et les coups de vent
> d'orage ? Le produit est-il vendable ? »
> Base : specs.json V1 (tôle 76/18 galva 0,5 blanche, pente ≥5 %, débords
> 800/600/600, lame d'air 2900→3200, claustra P2 2600→2900, gouttière Ø125,
> descente Ø80) · étude vent ING-001 (qp = 1,0 kPa [HYP SODEXAM TBV]).
> Climat de référence : Abidjan/Libreville — « lignes de grains » : orages
> brefs, rafales fortes, pluie intense quasi horizontale [FAIT-B].
> ⚠️ Hypothèse V1 — à valider par ingénieur structure agréé.

---

## LA RÉPONSE EN 4 LIGNES

1. **Le concept est le BON pour ce climat** — la double toiture ventilée est
   la solution canonique de l'architecture tropicale ; c'est un argument de
   vente, pas une faiblesse.
2. **Le vent est le vrai sujet structurel** : un toit léger débordant est une
   aile d'avion. Calcul ci-dessous : ça tient, À CONDITION de respecter la
   densité de fixation et les équerres — et de le prouver par l'essai E7.
3. **La pluie battante entrera un peu** par le claustra et la lame d'air dans
   les orages extrêmes — c'est GÉRABLE par 3 parades simples (§4), à
   intégrer avant commercialisation.
4. **Verdict marché : GO** — avec les 3 parades et 2 essais (§6). Aucun
   point rédhibitoire identifié.

## 1. Vent d'orage : soulèvement (le risque n°1 d'un toit léger)

Hypothèse d'action : qp = 1,0 kPa (rafale ≈ 145 km/h en pression de pointe,
enveloppe côtière) [HYP — à confirmer SODEXAM/ASECNA]. Le toit parasol se
comporte en **toiture isolée (canopy)** : coefficient net de soulèvement
c_p,net ≈ −1,2 global, −1,8 en rive [FAIT-B, EN 1991-1-4 ordre de grandeur].

| Grandeur | Valeur | Note |
|---|---|---|
| Surface de toiture (Studio) | 4,80 × 6,20 = **29,8 m²** | débords compris [CALCUL] |
| Poids propre (tôle+pannes) | ≈ 0,09 kPa | 8-9 kg/m² — négligeable [CALCUL] |
| Soulèvement global ELU | ≈ 1,5×1,2×1,0×29,8 ≈ **54 kN** | γ=1,5 [CALCUL] |
| Par équerre (14 poteaux) | ≈ 3,8 kN moyen · **≈ 5,8 kN en rive** (×1,5 local) | [CALCUL] |
| Capacité visée équerre + 2×M12 | ≥ 12 kN (critère d'essai E7, ING-001) | marge ≈ **×2 en rive** [CALCUL] |

Conclusions structurelles :
- **Ça tient dans l'hypothèse enveloppe**, marge ×2 — MAIS toute la sécurité
  repose sur la chaîne : vis tôle→panne (toutes les ondes en rive, 1/2 en
  partie courante — la densité de rive N'EST PAS négociable), boulons
  panne→équerre 2×M12, soudures d'équerre a=4, insert de tête de poteau.
  Un seul maillon bâclé et le toit part en premier — comme sur tous les
  hangars de la côte [FAIT-C, retours d'expérience sinistres].
- Le **débord avant 800** est le point le plus sollicité (porte-à-faux +
  rive) : conserver le retour de tôle (drip 40) qui raidit la rive, et
  prévoir l'essai d'arrachement E7 sur la configuration RÉELLE.
- Poteau lesté par le toit : traction remontée dans le poteau ≈ 5,8 kN <
  poids poteau+scellement (variante vendue) ; en variante LOCATION (skid),
  vérifier le lest total : module ≈ 7,8 t ≫ 54 kN de soulèvement → OK
  global [CALCUL], mais assemblage platine-skid à vérifier en traction [TBV].

## 2. Forte pluie : la gouttière suit-elle ?

Intensité de dimensionnement : **150 mm/h** (orage tropical court, période
de retour ~10 ans, Abidjan) [FAIT-B, ordre de grandeur TBV données SODEXAM].

| Grandeur | Valeur |
|---|---|
| Débit de toiture 29,8 m² × 150 mm/h | **1,24 L/s** [CALCUL] |
| Capacité demi-ronde Ø125, pente 5 mm/m | ≈ 2,5-3 L/s [FAIT-B] → marge ×2 |
| Capacité descente PVC Ø80 | ≈ 2,6 L/s [FAIT-B] → marge ×2 |

→ **Dimensionnement OK**, y compris orage exceptionnel (200 mm/h : 1,65 L/s,
marge encore ≥1,5). Le vrai risque n'est pas le calcul, c'est **la feuille
morte** : gouttière débordante = rideau d'eau sur le mur arrière (citerne,
coffret). Parades : crapaudine sur la naissance, trop-plein assumé côté
arrière (l'eau retombe DEVANT la plinthe, jamais dedans — larmier de rive),
consigne d'entretien 2×/an dans le contrat de location (l'actif reste à
nous : l'entretien est un revenu récurrent, pas une corvée).

## 3. Pluie battante : par où l'eau peut entrer (géométrie exacte)

Dans une ligne de grains, la pluie tombe à ~9 m/s poussée par des rafales de
15-25 m/s : inclinaison **60-70° par rapport à la verticale** [CALCUL].

| Ouverture | Protection géométrique | Angle limite d'entrée | Verdict |
|---|---|---|---|
| Lame d'air 2900→3200 | débord 600 au-dessus (rive à ~3200) | atan(600/300) = **63°** | entrée possible aux pointes d'orage [CALCUL] |
| Claustra P2 2600→2900 | débord 600, rive 600 plus haut | atan(600/600) = **45°** | embruns fréquents par vent fort [CALCUL] |
| Façade avant (débord 800) | atan(800/300) = 69° (lame) | mieux protégée | OK sauf orage frontal |

Où va l'eau qui entre ? Au-dessus du plafond P7 (posé à 2700) : le plénum.
Sans précaution, elle stagne sur P7 et finit par goutter aux joints →
**désagrément client réel, à traiter AVANT commercialisation** (§4).
En dessous de 2700, seule la bande claustra visible (2600-2700) peut
laisser passer des embruns — gênant pour un séjour, indifférent pour un
sanitaire public.

## 4. Les 3 parades (simples, moulées ou vissées — zéro remise en cause)

1. **Arase de tête de mur pentée vers l'extérieur** : le dessus du dernier
   élément (P2/tête de poteau) reçoit un profil-capot avec pente 10 % vers
   l'extérieur + goutte d'eau — l'eau du plénum est renvoyée dehors par
   gravité, jamais vers P7. Coût quasi nul (géométrie de moule) [HYP].
2. **P2 « chicane » sur les façades exposées** : motif du claustra à
   recouvrement (lumières orientées vers le bas, chevauchement ≥ 20 mm,
   type persienne béton) : l'air passe, la trajectoire de pluie à 45-65°
   est brisée. Même moule, autre insert — les façades abritées gardent le
   motif libre. À valider par l'essai d'arrosage E9 [HYP].
3. **Plénum drainé** : P7 posé avec joints ouverts en rive extérieure et
   cale de 5 mm côté claustra → toute eau accidentelle du plénum file vers
   l'arase (parade 1) et ressort. Ne JAMAIS étancher le plénum : il doit
   respirer, c'est son travail thermique.

Confort acoustique (à connaître pour vendre) : pluie forte sur tôle simple
peau ≈ bruyant ; le plénum + plafond P7 atténuent sensiblement (plafond =
écran). Option « confort + » : feutre anti-tambourinement sous tôle
(~1 500-2 500 XOF/m² [HYP]) — à proposer en option, pas en standard.
Corrosion côtière : tôle prélaquée sur galva **Z275 minimum**, visserie
inox/EPDM, retouches de coupe — exigence d'achat Chine à écrire dans le
cahier des charges fournisseur [TBV fiches].

## 5. Et l'harmattan / la poussière ?

Saison sèche : la lame d'air aspire de la poussière → dépôt sur P7 (invisible,
plénum) et léger passage par claustra. Moustiquaire inox déjà prescrite =
premier filtre. Acceptable en l'état ; nettoyage plénum à l'entretien
annuel. Aucune parade supplémentaire nécessaire en V1.

## 6. Verdict marché

**GO — le produit est vendable, et la toiture est un argument, pas un
risque**, sous 3 conditions bloquantes avant la première vente :
1. Intégrer les parades 1 et 3 (arase pentée + plénum drainé) au standard,
   et la parade 2 (P2 chicane) sur façades exposées.
2. Réussir **2 essais** sur le module témoin :
   - **E7 arrachement** : traction verticale ≥ 12 kN sur équerre en
     configuration réelle (déjà au programme ING-001) ;
   - **E9 arrosage** (nouveau) : lance à jet plat simulant une pluie à 60°
     pendant 20 min sur façade exposée → AUCUNE goutte sous P7, plénum
     ressuyé en 30 min. Critère simple, filmable — et la vidéo de l'essai
     est un contenu marketing en or (« on a testé la tornade »).
3. Confirmer qp auprès de SODEXAM/ASECNA et faire valider la note vent par
   l'ingénieur agréé (l'hypothèse 1,0 kPa est enveloppe mais non sourcée
   localement).

Aucun de ces trois points n'est coûteux ni long. Le concurrent container
n'a ni ventilation, ni débords, ni cette histoire à raconter.

---
⚠️ Avis du bureau d'études IA — document de travail V1. Validation requise :
ingénieur structure agréé + architecte [+ essais : E7 arrachement équerre,
E9 arrosage dynamique, données vent SODEXAM].
