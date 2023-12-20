const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "dist/index.js",
  output: {
    file: "dist/bundle.min.js", // Output bundle file
    name: "ChordsTransposer",
    format: "umd",
    sourcemap: true,
    exports: "named",
  },
  plugins: [
    // Add any necessary plugins here
    terser(),
  ],
};
