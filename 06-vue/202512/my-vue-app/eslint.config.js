import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**/*", "node_modules/**/*"],
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"]
    }
  },
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off"
    }
  }
]);
