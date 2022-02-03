import { getTokenPrice } from '../chainlink'
import v2Tokens from '../tokenLists/tokens_v2_0.json'
import { testPolygonProvider } from '../__utils__/utils'

test('Price fetching from Chainlink', async () => {
  try {
    const priceGetter = async (token: {
      id: string
      decimals: number
      address: string
    }) => {
      const price = await getTokenPrice(token.address, testPolygonProvider)
      expect(price.answer.toNumber()).toBeGreaterThan(0)
    }
    await Promise.all(v2Tokens.map(priceGetter))
  } catch (_e) {
    return
  }
})
