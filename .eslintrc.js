module.exports = {
  extends: ["prettier", "prettier/react", "airbnb"],
  plugins: ["prettier", "react"],
  parserOptions: {
    ecmaFeatures: {
      es6: true,
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  rules: {
    "func-names": ["error", "never"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "global-require": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"]
      }
    ]
  }
};
