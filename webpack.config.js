module.exports = {
  target: `node16`,
  entry: "./index.js",
  mode: "production",
  output: {
    module: true,
    filename: "index_bundle.mjs",
  },
  experiments: {
    outputModule: true,
  },
};
