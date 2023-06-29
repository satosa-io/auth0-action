import { z } from 'zod'
import axios from 'axios'

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
    ip_address: z.string(),
    user_agent: z.string()
  }).partial(),
  user_attributes: z.object({
    email_address: z.string().email(),
    family_name: z.string(),
    given_name: z.string(),
    phone_number: z.string()
  }).partial()
})

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
