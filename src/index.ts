import { parseUser } from './auth0'
import { createConfiguration, getDocument, getInteraction, createSession, createRedirectUrl } from './satosa'
import { SATOSA_HOSTED_URL, SATOSA_SERVICE_URL } from './constants'

export async function onExecutePostLogin (event: any, api: any): Promise<void> {
  const user = parseUser(event.user)
  const apiKey = event.secrets.API_KEY ?? ''
  const hostedUrl = process.env.SATOSA_HOSTED_URL ?? SATOSA_HOSTED_URL
  const serviceUrl = process.env.SATOSA_SERVICE_URL ?? SATOSA_SERVICE_URL
  const callbackUrl = process.env.CALLBACK_URL ?? ''
  const organizationId = process.env.SATOSA_ORGANIZATION_ID ?? ''
  const documentId = process.env.SATOSA_DOCUMENT_ID ?? ''
  const config = createConfiguration(serviceUrl, apiKey)
  const document = await getDocument(config, documentId)
  const interaction = await getInteraction(config, document.id, document.published_revision, user.user_id)
  if (!interaction) {
    const session = await createSession(config, {
      userId: user.user_id,
      email: user.email,
      givenName: user.given_name,
      familyName: user.family_name,
      phoneNumber: user.phone_number
    })
    const redirectUrl = createRedirectUrl(
      hostedUrl,
      organizationId,
      document.id,
      session.id,
      callbackUrl
    )
    api.redirect.sendUserTo(redirectUrl)
  }
}
