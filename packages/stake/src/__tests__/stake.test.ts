import { epoch } from '@vanilladefi/core-sdk'
import { formatUnits } from 'ethers/lib/utils'
import { getUserJuiceDelta } from '../stake'
import { testPolygonProvider } from '../__utils__/utils'
const hardhatTestAccount = '0x35434a35C19cabC4bD508Edf538cC1Cf33BDA688'

test('Get user JUICE delta', async () => {
  const delta = await getUserJuiceDelta(hardhatTestAccount, epoch, 'latest', {
    polygonProvider: testPolygonProvider,
    optionalAddress: process.env.JUICE_ADDRESS,
  })
  expect(formatUnits(delta, 8)).not.toBe(0)
})
