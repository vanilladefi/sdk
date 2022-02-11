import {getBasicWalletDetails} from '../contracts'
import {testEthereumProvider, testPolygonProvider} from '../__utils__/utils'
const hardhatTestAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

test('Get JUICE, MATIC, ETH and VNL balances', async () => {
  const {maticBalance, juiceBalance} = await getBasicWalletDetails(
    hardhatTestAccount,
    {
      polygonProvider: testPolygonProvider,
      ethereumProvider: testEthereumProvider,
      optionalAddress: process.env.JUICE_ADDRESS
    },
  )
  expect(Number(maticBalance)).toBeGreaterThan(0)
  expect(Number(juiceBalance)).toBeGreaterThan(0)
}
);

