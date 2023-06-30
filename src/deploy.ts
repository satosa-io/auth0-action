import { dump, deploy } from 'auth0-deploy-cli'
import { parse, stringify } from 'yaml'
import { tmpdir } from 'os'
import { resolve } from 'path'
import { readFile, copyFile, writeFile } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'fs'
import { z } from 'zod'

const SATOSA_ACTION = {
  name: 'satosa',
  code: './actions/satosa/code.js',
  deployed: true,
  runtime: 'node16',
  status: 'built',
  supported_triggers: [
    {
      id: 'post-login',
      version: 'v3'
    }
  ],
  dependencies: [
    {
      name: 'zod',
      version: '3.21.4'
    },
    {
      name: 'axios',
      version: '1.4.0'
    }
  ],
  secrets: [
    {
      name: 'API_KEY',
      value: process.env.SATOSA_API_KEY ?? ''
    }
  ]
}

const ActionConfig = z.object({
  name: z.string(),
  code: z.string(),
  dependencies: z.array(z.object({
    name: z.string(),
    version: z.string()
  })),
  deployed: z.boolean(),
  runtime: z.string(),
  secrets: z.array(z.object({
    name: z.string(),
    value: z.string()
  }).partial()),
  status: z.string(),
  supported_triggers: z.array(z.object({
    id: z.string(),
    version: z.string()
  }))
})

async function main (): Promise<void> {
  const cliConfig = {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN ?? '',
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ?? '',
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ?? ''
  }
  const configPath = resolve(tmpdir(), 'local')
  await dump({
    output_folder: configPath,
    format: 'yaml',
    config: cliConfig
  })
  const configInput = await readFile(resolve(configPath, 'tenant.yaml'), { encoding: 'utf8' })
  const config = parse(configInput)
  const actions = z.array(ActionConfig).parse(config?.actions ?? [])
  const isSatosaInstalled = actions.find(a => a.name === SATOSA_ACTION.name) !== undefined
  if (!isSatosaInstalled) {
    if (!existsSync(resolve(configPath, 'actions'))) mkdirSync(resolve(configPath, 'actions'))
    if (!existsSync(resolve(configPath, 'actions/satosa'))) mkdirSync(resolve(configPath, 'actions/satosa'))
    actions.push(SATOSA_ACTION)
  }
  const installedActions = actions.map(a => a.name === SATOSA_ACTION.name ? SATOSA_ACTION : a)
  const configOutput = stringify({ ...config, actions: installedActions })
  await writeFile(resolve(configPath, 'tenant.yaml'), configOutput)
  await copyFile(resolve('./action.js'), resolve(configPath, 'actions/satosa/code.js'))
  await deploy({
    input_file: resolve(configPath, 'tenant.yaml'),
    config: cliConfig
  })
}

main()
