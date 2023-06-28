import { z } from 'zod'

const User = z.object({
  user_id: z.string()
})

export function parseUser (user: any): z.infer<typeof User> {
  return User.parse(user)
}
