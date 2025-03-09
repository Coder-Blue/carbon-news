import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import tanstackEslintPluginRouter from "@tanstack/eslint-plugin-router";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import drizzle from "eslint-plugin-drizzle";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/build/",
      "**/dist/",
      "**/*.log",
      "**/coverage/",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "plugin:@tanstack/eslint-plugin-query/recommended",
      "plugin:@tanstack/eslint-plugin-router/recommended",
      "plugin:@eslint/js/recommended",
      "plugin:tailwindcss/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react-refresh/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:jsx-a11y/recommended",
      "standard",
    ),
  ),
  {
    plugins: {
      "@tanstack/query": fixupPluginRules(tanstackQuery),
      "@tanstack/router": fixupPluginRules(tanstackEslintPluginRouter),
      react: fixupPluginRules(react),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      tailwindcss: fixupPluginRules(tailwindcss),
      "react-hooks": fixupPluginRules(reactHooks),
      "react-refresh": fixupPluginRules(reactRefresh),
      drizzle,
      prettier: fixupPluginRules(prettier),
    },

    rules: {
      "no-undef": "off",
    },
  },
];
