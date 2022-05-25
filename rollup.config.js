import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/main.ts",
  output: {
    file: "./dist/bundle.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    // 타입스크립트
    typescript(),
  ],
};