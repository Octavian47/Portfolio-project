module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use babel-jest to transpile JavaScript and TypeScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios).+\\.js$', // Include specific ES modules (axios) to be transformed
  ],
  testEnvironment: 'jsdom', // Ensures Jest uses a DOM-like environment
};
