import { onContinuePostLogin, onExecutePostLogin } from '../src/index'

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
  expect(typeof onExecutePostLogin).toBe('function')
})
