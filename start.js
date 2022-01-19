const esbuild = require("esbuild");

esbuild.serve(
  { servedir: "./src/examples" },
  {
    bundle: true,
    platform: "browser",
    sourcemap: "inline",
    entryPoints: ["./src/examples/index.tsx"],
  }
);
