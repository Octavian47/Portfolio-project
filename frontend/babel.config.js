module.exports = {
  presets: [
    '@babel/preset-env', // Transpiles modern JavaScript
    '@babel/preset-react' // Transpiles JSX and other React features
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Allows the re-use of Babel's injected helper code to save on codesize
  ],
};
