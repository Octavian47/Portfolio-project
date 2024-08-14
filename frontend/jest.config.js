module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios).+\\.js$',  // Include specific ES modules that need transformation
    ],
  };
  