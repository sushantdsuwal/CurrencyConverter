module.exports = {
  '**/*.ts?(x)': ['eslint', () => 'tsc --skipLibCheck --noEmit'],
  '*.{ts,tsx,scss,md,json}': 'prettier --write',
};
