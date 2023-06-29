import { z } from 'zod'
import axios from 'axios'
import { removeEmpty } from './utils'

const Configuration = z.object({
  serviceUrl: z.string().url(),
  apiKey: z.string()
})

const Document = z.object({
  created_at: z.string().datetime(),
  id: z.string().ulid(),
  modified_at: z.string().datetime(),
  name: z.string(),
  published_revision: z.number().int(),
  status: z.string()
})

const Interaction = z.object({
  user_key: z.string(),
  created_at: z.string().datetime(),
  custom_attributes: z.record(z.string()),
  document_id: z.string().ulid(),
  id: z.string().ulid(),
  modified_at: z.string().datetime(),
  revision_id: z.number().int(),
  system_attributes: z.object({
    ip_address: z.string().nullable(),
    user_agent: z.string().nullable()
  }).partial(),
  user_attributes: z.object({
    email_address: z.string().email().nullable(),
    family_name: z.string().nullable(),
    given_name: z.string().nullable(),
    phone_number: z.string().nullable()
  }).partial()
})

const Session = z.object({
  created_at: z.string().datetime(),
  id: z.string().ulid(),
  modified_at: z.string().datetime(),
  user_key: z.string(),
  custom_attributes: z.record(z.string()),
  user_attributes: z.object({
    email_address: z.string().nullable(),
    family_name: z.string().nullable(),
    given_name: z.string().nullable(),
    phone_number: z.string().nullable()
  }).partial()
})

interface SessionInfo {
  userId: string
  email: null | string
  givenName: null | string
  familyName: null | string
  phoneNumber: null | string
}

export function createConfiguration (serviceUrl: string, apiKey: string): z.infer<typeof Configuration> {
  return Configuration.parse({ serviceUrl, apiKey })
}

export async function getDocument (config: z.infer<typeof Configuration>, documentId: string): Promise<z.infer<typeof Document>> {
  if (documentId === '') throw new Error('documentId is missing')
  const url = new URL(config.serviceUrl + '/documents/' + documentId)
  const response = await axios({
    method: 'GET',
    url: url.toString(),
    headers: { Authorization: `Bearer ${config.apiKey}` }
  })
  return Document.parse(response.data)
}

export async function getInteraction (config: z.infer<typeof Configuration>, documentId: string, revisionId: number, userKey: string): Promise<z.infer<typeof Interaction> | undefined> {
  if (documentId === '') throw new Error('documentId is missing')
  if (userKey === '') throw new Error('userKey is missing')
  const url = new URL(config.serviceUrl + '/interactions')
  url.searchParams.set('document_id', documentId)
  url.searchParams.set('revision_id', revisionId.toString())
  url.searchParams.set('user_key', userKey)
  const response = await axios({
    method: 'GET',
    url: url.toString(),
    headers: { Authorization: `Bearer ${config.apiKey}` }
  })
  if (response.data?.items?.length > 0) { return Interaction.parse(response.data?.items?.pop()) }
  return undefined
}

export async function createSession (config: z.infer<typeof Configuration>, session: SessionInfo): Promise<z.infer<typeof Session>> {
  const url = new URL(config.serviceUrl + '/sessions')
  const createSessionBody = {
    user_key: session.userId,
    custom_attributes: {},
    user_attributes: removeEmpty({
      email_address: session.email ?? null,
      family_name: session.familyName ?? null,
      given_name: session.givenName ?? null,
      phone_number: session.phoneNumber ?? null
    })
  }
  const response = await axios({
    method: 'POST',
    url: url.toString(),
    data: createSessionBody,
    headers: { Authorization: `Bearer ${config.apiKey}` }
  })
  return Session.parse(response.data)
}

export function createRedirectUrl (baseUrl: string, organizationId: string, documentId: string, sessionId: string, callbackUrl: string): string {
  const url = new URL(`${baseUrl}/organizations/${organizationId}/documents/${documentId}`)
  url.searchParams.set('sessionId', sessionId)
  url.searchParams.set('callbackUrl', callbackUrl)
  return url.toString()
}
