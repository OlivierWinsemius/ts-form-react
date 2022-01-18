const esbuild = require("esbuild");

esbuild.serve(
  { servedir: "./src/examples" },
  {
    bundle: true,
    platform: "browser",
    entryPoints: ["./src/examples/index.tsx"],
  }
);
