import uniswapTokens from '@uniswap/default-token-list'
import { Token as UniswapToken } from '@uniswap/sdk-core'
import { Token, UniSwapToken, VanillaVersion } from '@vanilladefi/core-sdk'
import { chainId } from './contracts'
import { ipfsToHttp } from './ipfs'
import v1_0Tokens from './tokenLists/tokens_v1_0.json'
import v1_1Tokens from './tokenLists/tokens_v1_1.json'

/**
 * wETH9 in Vanilla's token format
 */
const defaultWeth = {
  chainId: String(chainId),
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  decimals: String(18),
  symbol: 'WETH',
  name: 'Wrapped Ether',
  logoColor: null,
  pairId: null,
}

/**
 * USDC in Vanilla's token format
 */
const defaultUsdc = {
  chainId: String(chainId),
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  decimals: String(6),
  symbol: 'USDC',
  name: 'USD Coin',
  logoColor: null,
  pairId: null,
}

/**
 * Equals wETH from getAllTokens if found, defaultWeth if not
 */
export const weth: Token =
  getAllTokens(VanillaVersion.V1_0)?.find(
    (token) =>
      token.chainId === String(chainId) && token.symbol === defaultWeth.symbol,
  ) || defaultWeth

/**
 * Equals USDC from getAllTokens if found, defaultUsdc if not
 */
export const usdc: Token =
  getAllTokens(VanillaVersion.V1_0)?.find(
    (token) => token.chainId === String(chainId) && token.symbol === 'USDC',
  ) || defaultUsdc

/**
 * Returns the list of tokens available in Vanilla's trade UI
 * based on given Vanilla version.
 *
 * @param version - Vanilla version
 * @returns A list of tokens in Vanilla's token format.
 */
export function getAllTokens(version?: VanillaVersion): Token[] {
  // Convert TokenList format to our own format
  const defaultTokens: Token[] = uniswapTokens?.tokens
    .map((t) => JSON.parse(JSON.stringify(t))) // Needed for casting to Token[] format
    .map((t) => ({
      ...t,
      chainId: String(t.chainId),
      decimals: String(t.decimals),
    }))

  let additionalTokens
  switch (version) {
    case VanillaVersion.V1_0:
      additionalTokens = v1_0Tokens
      break
    case VanillaVersion.V1_1:
      additionalTokens = v1_1Tokens
      break
    default:
      additionalTokens = v1_1Tokens
  }

  const vanillaTokens: Token[] = additionalTokens
    .map((t) => JSON.parse(JSON.stringify(t))) // Needed for casting to Token[] format
    .map((t) => ({
      ...t,
      chainId: String(t.chainId),
      decimals: String(t.decimals),
    }))

  let allTokens
  switch (version) {
    case VanillaVersion.V1_0:
      allTokens = [...defaultTokens, ...vanillaTokens]
      break
    case VanillaVersion.V1_1:
      allTokens = [...vanillaTokens]
      break
    default:
      allTokens = [...vanillaTokens]
  }

  // include only tokens with specified 'chainId' and exclude WETH
  return allTokens
    .filter(
      (token) =>
        token.chainId === String(chainId) &&
        token.symbol !== defaultWeth.symbol,
    )
    .map((t) => ({
      ...t,
      logoURI: ipfsToHttp(t.logoURI),
      logoColor: null,
      pairId: null,
      price: null,
      priceHistorical: null,
      liquidity: null,
      priceChange: null,
    }))
}

/**
 * Pads Uniswap SDK token format into Vanilla token format
 *
 * @param input - a UniSwapToken instance with less info than Vanilla's Token format
 * @returns a padded token with all required fields of Vanilla token format
 */
export function padUniswapTokenToToken(input: UniSwapToken): Token {
  const token = {
    pairId: null,
    logoColor: null,
    ...input,
  }
  return token
}

/**
 * Converts a token from Vanilla token format into Uniswap token format
 *
 * @param input - a Vanilla token
 * @returns a Uniswap SDK compatible token
 */
export function convertVanillaTokenToUniswapToken(input: Token): UniswapToken {
  const token = new UniswapToken(
    Number(input.chainId),
    input.address,
    Number(input.decimals),
    input.symbol,
    input.name,
  )
  return token
}
