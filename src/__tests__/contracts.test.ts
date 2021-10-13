import { vnlPools } from 'src/contracts'
import { convertVanillaTokenToUniswapToken, usdc, vnl, weth } from 'src/tokens'
import { getSpotPrice } from 'src/uniswap/v3/spotPrice'

test('Specified liquidity pool addresses exist', async () => {
  const [priceWeth] = await getSpotPrice(
    vnlPools.ETH,
    convertVanillaTokenToUniswapToken(vnl),
    convertVanillaTokenToUniswapToken(weth),
  )
  const [priceUsdc] = await getSpotPrice(
    vnlPools.USDC,
    convertVanillaTokenToUniswapToken(vnl),
    convertVanillaTokenToUniswapToken(usdc),
  )
  expect(Number(priceWeth.toSignificant())).toBeGreaterThan(0)
  expect(Number(priceUsdc.toSignificant())).toBeGreaterThan(0)
})
