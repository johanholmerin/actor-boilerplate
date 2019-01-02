import typescript from "rollup-plugin-typescript2";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import worker from 'rollup-plugin-worker';

// Delete 'dist'
require("rimraf").sync("dist");

export default {
  input: "src/bootstrap.ts",
  output: {
    dir: "dist",
    format: "system",
    sourcemap: true,
    // Add loader to Workers
    banner: 'self.importScripts && !self.System && importScripts("system.js");'
  },
  plugins: [
    typescript({
      // Make sure we are using our version of TypeScript.
      typescript: require("typescript"),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true
        }
      }
    }),
    nodeResolve(),
    worker(),
    terser()
  ],
  experimentalCodeSplitting: true
};
