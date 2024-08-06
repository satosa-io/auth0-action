import { onContinuePostLogin, onExecutePostLogin } from '../src/index'

const EVENT_MOCK = {
  secrets: {
    API_KEY: process.env.SATOSA_API_KEY,
    SATOSA_HOSTED_URL: process.env.SATOSA_HOSTED_URL,
    SATOSA_SERVICE_URL: process.env.SATOSA_SERVICE_URL,
    AUTH0_CUSTOM_DOMAIN: process.env.AUTH0_CUSTOM_DOMAIN,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    CALLBACK_URL: process.env.CALLBACK_URL,
    SATOSA_ORGANIZATION_ID: process.env.SATOSA_ORGANIZATION_ID,
    SATOSA_DOCUMENT_ID: process.env.SATOSA_DOCUMENT_ID
  },
  user: {
    user_id: Math.random().toString(16),
    email: 'test@satosa.com',
    given_name: 'Satosa',
    family_name: 'Test',
    phone_number: undefined
  }
}

test('action to export onContinuePostLogin function', async () => {
  expect(typeof onContinuePostLogin).toBe('function')
})

test('action to export onExecutePostLogin function', async () => {
  expect(typeof onExecutePostLogin).toBe('function')
})

test('onContinuePostLogin result to be undefined', async () => {
  // eslint-disable-next-line
  expect(await onContinuePostLogin(undefined, undefined)).toBe(undefined)
})

test('onExecutePostLogin to redirect to hosted document page with session', async () => {
  await onExecutePostLogin(EVENT_MOCK, {
    redirect: {
      sendUserTo (redirectUrl: string) {
        const redirect = new URL(redirectUrl)
        expect(redirect.searchParams.get('sessionId')).toBeDefined()
      }
    }
  })
})
