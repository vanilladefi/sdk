import { Token } from '@uniswap/sdk-core'
import { convertVanillaTokenToUniswapToken, usdc, weth } from '../tokens'

test('Token constants (wETH, USDC, VNL)', () => {
  expect(usdc).toBeDefined()
  expect(weth).toBeDefined()
})

test('Token conversion', () => {
  expect(convertVanillaTokenToUniswapToken(usdc)).toBeInstanceOf(Token)
  expect(convertVanillaTokenToUniswapToken(weth)).toBeInstanceOf(Token)
})
