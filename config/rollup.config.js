import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import packageJson from '../package.json';

/** @typedef {import('rollup').RollupOptions} RollupOptions */

/** @type {RollupOptions} */
const config = {
  input: 'src/index.ts',
  external: /node_modules/,
  output: [
    {
      file: `dist/${packageJson.main}`,
      interop: 'auto',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: `dist/${packageJson.module}`,
      interop: 'auto',
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
  ],
  plugins: [
    // @ts-ignore peerDepxExternal is typed wrong
    /** @type {Plugin} */ peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: 'config/tsconfig.build.json', }),
    json(),
  ],
};

/** @type {RollupOptions} */
export default [config,];
