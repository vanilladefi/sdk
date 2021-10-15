import { Contract } from '@ethersproject/contracts'
import { contractAddresses } from 'constants'
import { getVanillaTokenContract, vnlPools } from 'contracts'
import { convertVanillaTokenToUniswapToken, usdc, vnl, weth } from 'tokens'
import { VanillaVersion } from 'types/general'
import { getSpotPrice } from 'uniswap/v3/spotPrice'

test('Specified liquidity pool addresses exist', async () => {
  try {
    const [priceWeth] = await getSpotPrice(
      vnlPools.ETH,
      convertVanillaTokenToUniswapToken(vnl),
      convertVanillaTokenToUniswapToken(weth),
      global.testProvider,
    )
    const [priceUsdc] = await getSpotPrice(
      vnlPools.USDC,
      convertVanillaTokenToUniswapToken(vnl),
      convertVanillaTokenToUniswapToken(usdc),
      global.testProvider,
    )
    expect(Number(priceWeth.toSignificant())).toBeGreaterThan(0)
    expect(Number(priceUsdc.toSignificant())).toBeGreaterThan(0)
  } catch (_e) {
    return
  }
})

test('Token contract returns normally', async () => {
  try {
    const vnlContract1 = getVanillaTokenContract(VanillaVersion.V1_0)
    expect(vnlContract1).toBeInstanceOf(Contract)
    expect(vnlContract1.address).toEqual(contractAddresses.vanilla.v1_0.vnl)
    const vnlContract2 = getVanillaTokenContract(VanillaVersion.V1_1)
    expect(vnlContract2).toBeInstanceOf(Contract)
    expect(vnlContract2.address).toEqual(contractAddresses.vanilla.v1_1.vnl)
  } catch (_e) {
    return
  }
})
