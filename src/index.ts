import { parseUser } from './auth0'

export async function onExecutePostLogin (event: any, api: any): Promise<void> {
  console.log('SATOSA INTEGRATION: onExecutePostLogin')
  const user = parseUser(event.user)
  console.log(`USER ID: ${user.user_id}`)
}
