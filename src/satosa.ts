import { z } from 'zod'

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
  const response = await fetch(config.serviceUrl + '/documents/' + documentId, {
    method: 'GET'
  })
  const body = await response.json()
  return Document.parse(body)
}
