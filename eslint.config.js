import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    // rules: {
    //   "@typescript-eslint/no-unused-vars": "off", // Disable unused variable check
    //   "@typescript-eslint/no-explicit-any": "off", // Disable explicit any checks
    //   "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return type checks
    //   "@typescript-eslint/no-empty-function": "off", // Disable empty function check
    //   "@typescript-eslint/no-inferrable-types": "off", // Disable inferring types for variables
    //   "@typescript-eslint/ban-types": "off", // Disable ban on specific types
    //   "@typescript-eslint/explicit-function-return-type": "off", // Disable explicit return type for functions
    //   "@typescript-eslint/no-non-null-assertion": "off", // Disable non-null assertion checks
    // },
  }
);
