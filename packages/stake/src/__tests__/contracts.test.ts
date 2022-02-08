import { VanillaVersion } from '@vanilladefi/core-sdk'
import { getBasicWalletDetails } from '../contracts'
import { testPolygonProvider } from '../__utils__/utils'
const hardhatTestAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

test('Get JUICE, MATIC, ETH and VNL balances', async () => {
  const { maticBalance, juiceBalance } = await getBasicWalletDetails(
    VanillaVersion.V2,
    hardhatTestAccount,
    { provider: testPolygonProvider },
  )
  expect(Number(maticBalance)).toBeGreaterThan(0)
  expect(Number(juiceBalance)).toBeGreaterThan(0)
})
