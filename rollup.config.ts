import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const IGNORE_BUNDLE_MODULES = ['zod']

const nodeResolveOptions = {
  resolveOnly (moduleName: string): boolean {
    const mod = IGNORE_BUNDLE_MODULES.find(mn => mn.includes(moduleName))
    return mod === undefined
  }
}

export default {
  input: 'dist/src/index.js',
  output: {
    file: 'action.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    nodeResolve(nodeResolveOptions),
    commonjs()
  ]
}
