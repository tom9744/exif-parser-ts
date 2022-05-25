import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts'

const CONFIG = [
  // Bundle .ts files.
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  // Bundle .d.ts files.
  {
    input: './dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]

export default CONFIG;