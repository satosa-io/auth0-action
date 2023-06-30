import { z } from 'zod'

const User = z.object({
  user_id: z.string(),
  email: z.nullable(z.string().email()),
  given_name: z.nullable(z.string()),
  family_name: z.nullable(z.string()),
  phone_number: z.nullable(z.string())
}).partial({
  email: true,
  given_name: true,
  family_name: true,
  phone_number: true
})

export function parseUser (user: any): z.infer<typeof User> {
  return User.parse(user)
}
