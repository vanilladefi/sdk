import { Token } from '@uniswap/sdk-core'
import { convertVanillaTokenToUniswapToken, usdc, vnl, weth } from 'tokens'

test('Token constants (wETH, USDC, VNL)', () => {
  expect(usdc).toBeDefined()
  expect(weth).toBeDefined()
  expect(vnl).toBeDefined()
})

test('Token conversion', () => {
  expect(convertVanillaTokenToUniswapToken(usdc)).toBeInstanceOf(Token)
  expect(convertVanillaTokenToUniswapToken(weth)).toBeInstanceOf(Token)
  expect(convertVanillaTokenToUniswapToken(vnl)).toBeInstanceOf(Token)
})
