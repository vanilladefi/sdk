import uniswapTokens from '@uniswap/default-token-list'
import { Token as UniswapToken } from '@uniswap/sdk-core'
import { BigNumber, constants, Contract, providers, Signer } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { VanillaVersion } from 'types/general'
import { Token, UniSwapToken } from 'types/trade'
import { chainId, contractAddresses, vnlDecimals } from './constants'
import { ipfsToHttp } from './ipfs'
import v1_0Tokens from './tokenLists/tokens_v1_0.json'
import v1_1Tokens from './tokenLists/tokens_v1_1.json'

// WETH stuff
const defaultWeth = {
  chainId: String(chainId),
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  decimals: String(18),
  symbol: 'WETH',
  name: 'Wrapped Ether',
  logoColor: null,
  pairId: null,
}

export const weth: Token =
  getAllTokens(VanillaVersion.V1_0)?.find(
    (token) =>
      token.chainId === String(chainId) && token.symbol === defaultWeth.symbol,
  ) || defaultWeth

export const usdc: Token = getAllTokens(VanillaVersion.V1_0)?.find(
  (token) => token.chainId === String(chainId) && token.symbol === 'USDC',
)

export const vnl: Token = {
  chainId: String(chainId),
  address: contractAddresses.vanilla.v1_1.vnl,
  decimals: String(vnlDecimals),
  symbol: 'VNL',
  name: 'Vanilla',
  logoColor: null,
  pairId: null,
}

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

export async function getBalance(
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> {
  const balance = await provider.getBalance(address)
  return balance
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  signerOrProvider?: providers.Provider | Signer | undefined,
): Contract {
  if (!isAddress(address) || address === constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signerOrProvider)
}

export function padUniswapTokenToToken(input: UniSwapToken): Token {
  const token = {
    pairId: null,
    logoColor: null,
    ...input,
  }
  return token
}

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
