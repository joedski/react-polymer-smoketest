module.exports = {
  extends: [
    'airbnb',
  ],
  parser: 'babel-eslint',
  plugins: [
    'react',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 0,
  }
};
