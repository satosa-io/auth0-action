import { parseUser } from './auth0'
import { createConfiguration, getDocument, getInteraction } from './satosa'
import { SATOSA_SERVICE_URL } from './constants'

export async function onExecutePostLogin (event: any, api: any): Promise<void> {
  const user = parseUser(event.user)
  const apiKey = event.secrets.API_KEY ?? ''
  const serviceUrl = process.env.SATOSA_SERVICE_URL ?? SATOSA_SERVICE_URL
  const documentId = process.env.SATOSA_DOCUMENT_ID ?? ''
  const config = createConfiguration(serviceUrl, apiKey)
  const document = await getDocument(config, documentId)
  const interaction = await getInteraction(config, document.id, document.published_revision, user.user_id)
  console.log(JSON.stringify(user))
  console.log(JSON.stringify(document))
  console.log(JSON.stringify(interaction))
  // IF NO INTERACTIONS
  // CREATE STATEFUL SESSION
  // REDIRECT TO HOSTED PAGE
}
