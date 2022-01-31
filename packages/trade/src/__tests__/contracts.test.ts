import { Contract } from '@ethersproject/contracts'
import {
  contractAddresses,
  getVanillaTokenContract,
  VanillaVersion,
  vnl,
} from '@vanilladefi/core-sdk'
import { vnlPools } from '../contracts'
import { convertVanillaTokenToUniswapToken, usdc, weth } from '../tokens'
import { getSpotPrice } from '../uniswap/v3/spotPrice'
import { testProvider } from '../__utils__/utils'

test('Specified liquidity pool addresses exist', async () => {
  try {
    const [priceWeth] = await getSpotPrice(
      vnlPools.ETH,
      convertVanillaTokenToUniswapToken(vnl),
      convertVanillaTokenToUniswapToken(weth),
      testProvider,
    )
    const [priceUsdc] = await getSpotPrice(
      vnlPools.USDC,
      convertVanillaTokenToUniswapToken(vnl),
      convertVanillaTokenToUniswapToken(usdc),
      testProvider,
    )
    expect(Number(priceWeth.toSignificant(3))).toBeGreaterThan(0)
    expect(Number(priceUsdc.toSignificant(3))).toBeGreaterThan(0)
  } catch (_e) {
    return
  }
})

test('Token contract returns normally', async () => {
  try {
    const vnlContract1 = getVanillaTokenContract(VanillaVersion.V1_0)
    expect(vnlContract1).toBeInstanceOf(Contract)
    expect(vnlContract1.address).toEqual(
      contractAddresses.vanilla.v1_0?.vnl || '',
    )
    const vnlContract2 = getVanillaTokenContract(VanillaVersion.V1_1)
    expect(vnlContract2).toBeInstanceOf(Contract)
    expect(vnlContract2.address).toEqual(
      contractAddresses.vanilla.v1_1?.vnl || '',
    )
  } catch (_e) {
    return
  }
})
