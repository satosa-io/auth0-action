import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

type ReplaceConfigValues = Record<string, string>

const IGNORE_BUNDLE_MODULES = ['axios', 'zod']

const nodeResolveOptions = {
  resolveOnly (moduleName: string): boolean {
    const mod = IGNORE_BUNDLE_MODULES.find(mn => mn.includes(moduleName))
    return mod === undefined
  }
}

const variables = [
  'AUTH0_CUSTOM_DOMAIN',
  'AUTH0_DOMAIN',
  'CALLBACK_URL',
  'SATOSA_ORGANIZATION_ID',
  'SATOSA_SERVICE_URL',
  'SATOSA_DOCUMENT_ID',
  'SATOSA_HOSTED_URL'
]

const replaceConfig = {
  preventAssignment: true,
  values: variables.reduce((values: ReplaceConfigValues, variable: string) => {
    if (process.env.MARKETPLACE_DEPLOY === 'true') {
      values[`process.env.${variable}`] = `event.secrets.${variable}`
      return values
    }
    const eValue = process.env[variable]
    values[`process.env.${variable}`] = eValue ? `"${eValue}"` : 'undefined'
    return values
  }, {})
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
