import { onContinuePostLogin } from '../src/index'

test('onContinuePostLogin to be undefined', async () => {
  // eslint-disable-next-line
  expect(await onContinuePostLogin(undefined, undefined)).toBe(undefined)
})

// test('onExecutePostLogin to redirect to hosted document page with session', async () => {
//
// })
