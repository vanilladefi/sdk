import { epoch } from '@vanilladefi/core-sdk'
import { getUsers } from '../users'
import { testPolygonProvider } from '../__utils__/utils'

test('Get users', async () => {
  const users = await getUsers(epoch, 'latest', {
    polygonProvider: testPolygonProvider,
    optionalAddress: process.env.JUICE_ADDRESS,
  })
  expect(users.size).not.toBe(0)
})
