module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
