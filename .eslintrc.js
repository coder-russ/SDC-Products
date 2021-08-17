module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['newrelic.js', 'getHttp.js'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
};
