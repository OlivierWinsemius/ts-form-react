module.exports = {
  preset: "ts-jest",
  globals: { "ts-jest": { tsconfig: "./tsconfig.json" } },
  moduleDirectories: ["node_modules", "src"],
};
