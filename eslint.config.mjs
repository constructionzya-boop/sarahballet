import base from "@noema/config/eslint/base";

// Config racine (fichiers outillage à la racine). Chaque app/paquet fournit
// sa propre eslint.config.mjs adaptée (react/next).
export default [...base, { ignores: ["apps/**", "packages/**", "services/**"] }];
