# @noema/config

Presets partagés du monorepo Noéma.

| Export | Usage |
|---|---|
| `@noema/config/typescript/base.json` | TS strict, socle non-framework |
| `@noema/config/typescript/nextjs.json` | Apps Next.js (jsx preserve, plugin next) |
| `@noema/config/typescript/react-library.json` | Paquets React (`@noema/ui`, …) |
| `@noema/config/eslint/base` | ESLint 9 flat — JS/TS |
| `@noema/config/eslint/react` | + react-hooks + jsx-a11y |
| `@noema/config/eslint/next` | + @next/eslint-plugin-next (core-web-vitals) |
| `@noema/config/tailwind/base.css` | Socle Tailwind v4 (tokens dans `@noema/ui`) |

## Exemple d'usage (dans une app)

```jsonc
// tsconfig.json
{ "extends": "@noema/config/typescript/nextjs.json" }
```

```js
// eslint.config.mjs
import next from "@noema/config/eslint/next";
export default next;
```
