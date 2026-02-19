import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],

    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "unused-imports": unusedImports,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 🚨 Detecta imports que no existen
      "import/no-unresolved": "error",

      // ⚠️ Detecta imports no usados (warning)
      "unused-imports/no-unused-imports": "warn",

      // ⚠️ Variables no usadas (pero ignora las que empiezan con _)
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // React moderno
      "react/react-in-jsx-scope": "off",

      // Quita prop-types si usas TS o no las quieres
      "react/prop-types": "off",
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
]);
