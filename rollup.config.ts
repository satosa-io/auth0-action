import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

const IGNORE_BUNDLE_MODULES = ['axios', 'zod']

const nodeResolveOptions = {
  resolveOnly (moduleName: string): boolean {
    const mod = IGNORE_BUNDLE_MODULES.find(mn => mn.includes(moduleName))
    return mod === undefined
  }
}

const replaceConfig = {
  values: {
    'process.env.SATOSA_SERVICE_URL': process.env.SATOSA_SERVICE_URL ? `"${process.env.SATOSA_SERVICE_URL}"` : 'undefined',
    'process.env.SATOSA_DOCUMENT_ID': process.env.SATOSA_DOCUMENT_ID ? `"${process.env.SATOSA_DOCUMENT_ID}"` : 'undefined'
  },
  preventAssignment: true
}

export default {
  input: 'dist/src/index.js',
  output: {
    file: 'action.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    replace(replaceConfig),
    nodeResolve(nodeResolveOptions),
    commonjs()
  ]
}
