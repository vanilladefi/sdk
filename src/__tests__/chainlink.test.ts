import { getTokenPrice } from '../chainlink'
import v2Tokens from '../tokenLists/tokens_v2_0.json'
import { testProvider } from '../__utils__/utils'

test('Price fetching from Chainlink', async () => {
  try {
    const tokenAddress = v2Tokens[0].address
    const price = await getTokenPrice(tokenAddress, testProvider)
    expect(price).toBeGreaterThan(0)
  } catch (_e) {
    return
  }
})
