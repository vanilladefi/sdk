import { getBasicWalletDetails } from '../contracts'
import { testEthereumProvider, testPolygonProvider } from '../__utils__/utils'

test('Get JUICE, MATIC, ETH and VNL balances', async () => {
  const { juiceBalance } = await getBasicWalletDetails(
    process.env.JUICE_ADDRESS || '',
    {
      polygonProvider: testPolygonProvider,
      ethereumProvider: testEthereumProvider,
      optionalAddress: process.env.JUICE_ADDRESS,
    },
  )
  expect(juiceBalance).toBeGtBN(0)
})
