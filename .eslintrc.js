module.exports = {
    extends: ['react-app', 'react-app/jest'],
    rules: {
      'react-hooks/exhaustive-deps': 'warn', // Downgrade from error to warning
      'no-unused-vars': 'warn', // Downgrade from error to warning
    },
  };