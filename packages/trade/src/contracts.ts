import { FeeAmount } from '@uniswap/v3-sdk'
import { contractAddresses, VanillaVersion } from '@vanilladefi/core-sdk'
import { VanillaV1Router02__factory } from '@vanilladefi/trade-contracts/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory'
import { VanillaV1Router02 } from '@vanilladefi/trade-contracts/typechain/vanilla_v1.1/VanillaV1Router02'
import { Contract, providers, Signer } from 'ethers'
import VanillaV1Router01 from './types/abis/VanillaV1Router01.json'

/**
 * Returns an instance of a Vanilla trade router contract based on the Vanilla
 * version.
 *
 * @param version Version of Vanilla, so that interfacing with legacy tokens is possible.
 * @param signerOrProvider ethersjs signer(read/write) or provider(readonly).
 * @returns Vanilla router contract instance with transactional capability
 */
export function getVanillaTradeRouter(
  version: VanillaVersion,
  signerOrProvider?: Signer | providers.Provider,
): Contract | VanillaV1Router02 {
  const routerAddress = contractAddresses.vanilla[version]?.router
  const v1abi = VanillaV1Router01.abi
  return version !== VanillaVersion.V1_0
    ? VanillaV1Router02__factory.connect(
        routerAddress || '',
        (signerOrProvider || providers.getDefaultProvider()) as any,
      )
    : new Contract(
        contractAddresses.vanilla.v1_0?.router || '',
        v1abi,
        signerOrProvider || providers.getDefaultProvider(),
      )
}

/**
 * $VNL pools on Uniswap with the most liquidity
 */
export const vnlPools = {
  ETH: '0xff6949065aebb4be59d30c970694a7495da0c0ff',
  USDC: '0x0aa719a08957bdf43d9c9f0b755edd1ca2b386f3',
}

/**
 * The Uniswap v3 pool address for checking WETH/USDC price
 */
export const usdcWethPoolAddress = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640'

/**
 * Decimal points used in $VNL
 */
export const vnlDecimals = 12

/**
 * The block number of the first Vanilla v1.0 deployment. Used for calculating HTRS
 */
export const epoch = 12134736

/**
 * Chain ID where Vanilla resides
 */
export const chainId = 1

/**
 * A network definition used in ethersjs
 */
export const network: providers.Networkish = providers.getNetwork(chainId)

/**
 * Vanilla v1.0 hidden tokens. Currently: Ampleforth
 */
export const hiddenTokens = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161']

/**
 * Matches a given Uniswap v3 pool fee tier with an enum and returns it
 *
 * @param input ['500', '3000', '10000'], the default fee tiers of Uniswap v3 pools.
 * @returns enum FeeAmount.[LOW, MEDIUM, HIGH] | undefined
 */
export function getFeeTier(
  input: string | number | null | undefined,
): FeeAmount | undefined {
  const feeTierString = input?.toString()

  let feeTier: FeeAmount | undefined
  switch (feeTierString) {
    case '500':
      feeTier = FeeAmount.LOW
      break
    case '3000':
      feeTier = FeeAmount.MEDIUM
      break
    case '10000':
      feeTier = FeeAmount.HIGH
      break
    default:
      feeTier = undefined
  }

  return feeTier
}

/**
 * A trade deadline for submitted trades. 10 minutes by default.
 */
export const blockDeadlineThreshold = 60000 // 600 seconds added to the latest block timestamp (10 minutes)

/**
 * Conservative gas limit to use for Uniswap v2/v3 trades.
 */
export const conservativeGasLimit = 800_000

/**
 * Conservative gas limit to use for $VNL token migration
 */
export const conservativeMigrationGasLimit = 120_000

/**
 * Ethersjs overrides if estimates fail
 */
export const ethersOverrides = { gasLimit: conservativeGasLimit }
