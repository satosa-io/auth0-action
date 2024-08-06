import { parseUser } from './auth0'
import { createConfiguration, getDocument, getInteraction, createSession, createRedirectUrl } from './satosa'
import { SATOSA_HOSTED_URL, SATOSA_SERVICE_URL } from './constants'

export async function onExecutePostLogin (event: any, api: any): Promise<void> {
  const user = parseUser(event.user)
  const apiKey = event.secrets.API_KEY ?? ''
  const hostedUrl = process.env?.SATOSA_HOSTED_URL || event.secrets?.SATOSA_HOSTED_URL || event.configuration?.SATOSA_HOSTED_URL || SATOSA_HOSTED_URL
  const serviceUrl = process.env?.SATOSA_SERVICE_URL || event.secrets?.SATOSA_SERVICE_URL || event.configuration?.SATOSA_SERVICE_URL || SATOSA_SERVICE_URL
  const customDomain = process.env?.AUTH0_CUSTOM_DOMAIN || event.secrets?.AUTH0_CUSTOM_DOMAIN || event.configuration?.AUTH0_CUSTOM_DOMAIN || ''
  const authDomain = customDomain || process.env?.AUTH0_DOMAIN || event.secrets?.AUTH0_DOMAIN || event.configuration?.AUTH0_DOMAIN || ''
  const continueUrl = `https://${authDomain as string}/continue`
  const callbackUrl = process.env?.CALLBACK_URL || event.secrets?.CALLBACK_URL || event.configuration?.CALLBACK_URL || continueUrl
  const organizationId = process.env?.SATOSA_ORGANIZATION_ID || event.secrets?.SATOSA_ORGANIZATION_ID || event.configuration?.SATOSA_ORGANIZAION_ID || ''
  const documentId = process.env?.SATOSA_DOCUMENT_ID || event.secrets?.SATOSA_DOCUMENT_ID || event.configuration?.SATOSA_DOCUMENT_ID || ''
  const config = createConfiguration(serviceUrl, apiKey)
  const document = await getDocument(config, documentId)
  const interaction = await getInteraction(config, document.id, document.published_revision, user.user_id)
  if (!interaction) {
    const session = await createSession(config, {
      userId: user.user_id,
      email: user.email ?? null,
      givenName: user.given_name ?? null,
      familyName: user.family_name ?? null,
      phoneNumber: user.phone_number ?? null
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

export async function onContinuePostLogin (event: any, api: any): Promise<void> {}
