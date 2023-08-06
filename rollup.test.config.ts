import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

export default {
  input: 'dist/test/action.test.js',
  output: {
    file: 'test/index.test.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    commonjs()
  ]
}
