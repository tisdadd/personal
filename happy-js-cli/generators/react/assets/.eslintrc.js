module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:storybook/recommended",
    "plugin:security/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": [2, { extensions: [".jsx", ".tsx"] }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  // keeping parts of linting that it complains about otherwise here
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["airbnb-typescript/base"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      settings: {
        "import/resolver": {
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        },
      },
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: ["**/*.stories.*", "**/.storybook/**/*.*"],
            peerDependencies: true,
          },
        ],
      },
    },
  ],
};
