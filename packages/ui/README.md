# @noema/ui — Design system

Tokens de la charte + composants React partagés par les 7 sites. Thème par
marque = **surcharge de tokens** (`data-brand`), jamais de fork de composant.

## Installation dans une app

```css
/* app/globals.css */
@import "@noema/ui/styles/theme.css";
```

```tsx
import { Button, Card, WhatsAppButton } from "@noema/ui";
```

Les apps Next doivent transpiler le paquet : `transpilePackages: ["@noema/ui"]`.

## Tokens

| Token | Hex | Usage |
|---|---|---|
| `night` | `#000A21` | Texte, bandeaux |
| `dawn` | `#38577D` | Secondaire |
| `dew` | `#BFDEF1` | Accent doux |
| `cream` | `#FAF6EB` | Fond principal |
| `snow` | `#F7F1EC` | Fond alternatif |
| `orange` | `#FF3311` | Accent fort (CTA) |
| `accent` | = `orange` | Thémable par marque via `data-brand` |

Marques annexes : `data-brand="etansol|hydralis|ventalis|saniva"` surcharge
`--color-accent`.

## Composants

**Base** : `Button` · `Badge` · `Card` (+ Header/Title/Body/Footer) ·
`Heading`/`Text`/`Eyebrow` · `Container`/`Section` · `Input` · `Textarea` ·
`Label` · `Select` · `Divider` · `Link` · `Alert`.

**Réseau** : `WhatsAppButton` (deep link wa.me) · `BrandSwitcher` (les 5 sites) ·
`TrustBar` (agréments/LBTP/assurances) · `CaseStudyCard` (preuve sociale).
