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

export function createConfiguration (serviceUrl: string, apiKey: string): z.infer<typeof Configuration> {
  return Configuration.parse({ serviceUrl, apiKey })
}

export async function getDocument (config: z.infer<typeof Configuration>, documentId: string): Promise<z.infer<typeof Document>> {
  if (documentId === '') throw new Error('documentId is missing')
  const response = await axios({
    method: 'GET',
    url: config.serviceUrl + '/documents/' + documentId,
    headers: { Authorization: `Bearer ${config.apiKey}` }
  })
  return Document.parse(response.data)
}
