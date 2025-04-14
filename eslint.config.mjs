import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
//const configPath = path.resolve(__dirname, "tailwind.config.mjs");

const eslintConfig = [
  ...compat.plugins("import"),
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  // 👇 Add custom rules as a new object here
  {
    // settings: {
    //   tailwindcss: {
    //     config:"tailwind.config.mjs",
    //   },
    // },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in types are first
            "external", // External libraries
            "internal", // Internal modules
            ["parent", "sibling"], // Parent and sibling types can be mingled together
            "index", // Then the index file
            "object", // Object imports
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      //'tailwindcss/no-custom-classname': 'error', // Turns off checking unknown class names
    },
  },
];

export default eslintConfig;
