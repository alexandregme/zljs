import { copyFileSync } from "fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "core/index.ts",
    "next/index": "core/next/index.ts",
    "rhf/index": "core/rhf/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: true,
  target: "es2020",
  outDir: "dist",
  tsconfig: "tsconfig.build.json",
  // Components use hooks/stores but carry no directive; mark the package as client-side for Next.js App Router
  banner: { js: '"use client";' },
  onSuccess: async () => {
    copyFileSync("core/styles.css", "dist/styles.css");
  },
});
