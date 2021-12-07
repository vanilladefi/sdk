import { FeeAmount } from '@uniswap/v3-sdk'
import { Contract, providers, Signer } from 'ethers'
import { ERC20 } from './contracts/typechain/vanilla_v1.1/ERC20'
import { ERC20__factory } from './contracts/typechain/vanilla_v1.1/factories/ERC20__factory'
import { VanillaV1Router02__factory } from './contracts/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory'
import { VanillaV1Router02 } from './contracts/typechain/vanilla_v1.1/VanillaV1Router02'
import VanillaV1Router01 from './types/abis/VanillaV1Router01.json'
import { UniswapVersion, VanillaVersion } from './types/general'
import { JuiceStaking, JuiceStaking__factory } from 'vanilla-juicenet/typechain/juicenet'

/**
 * Returns an instance of a $VNL ERC-20 token contract
 * based on the Vanilla version.
 *
 * @param version Version of Vanilla, so that interfacing with legacy tokens is possible.
 * @param signerOrProvider ethersjs signer(read/write) or provider(readonly).
 * @returns ERC-20 token contract instance with transactional capability
 */
export function getVanillaTokenContract(
  version: VanillaVersion,
  signerOrProvider?: Signer | providers.Provider,
): ERC20 {
  const address = contractAddresses.vanilla[version].vnl
  return ERC20__factory.connect(
    address,
    (signerOrProvider || providers.getDefaultProvider()) as any,
  )
}

/**
 * Returns an instance of a Vanilla trade router contract based on the Vanilla
 * version.
 *
 * @param version Version of Vanilla, so that interfacing with legacy tokens is possible.
 * @param signerOrProvider ethersjs signer(read/write) or provider(readonly).
 * @returns Vanilla router contract instance with transactional capability
 */
export function getVanillaRouter(
  version: VanillaVersion,
  signerOrProvider?: Signer | providers.Provider,
): Contract | VanillaV1Router02 {
  const routerAddress = contractAddresses.vanilla[version].router
  const v1abi = VanillaV1Router01.abi
  return version === VanillaVersion.V1_1
    ? VanillaV1Router02__factory.connect(
        routerAddress,
        (signerOrProvider || providers.getDefaultProvider()) as any,
      )
    : new Contract(
        routerAddress,
        v1abi,
        signerOrProvider || providers.getDefaultProvider(),
      )
}

// Example function for now to demonstrate usage of v2 contracts
export function getJuiceSkating(
  address: string,
  signerOrProvider?: Signer | providers.Provider
): JuiceStaking {
  return JuiceStaking__factory.connect(
    address,
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
 * Addresses of deployed Vanilla contracts
 */
export const contractAddresses: {
  vanilla: { [version in VanillaVersion]: { router: string; vnl: string } }
  uniswap: { [version in UniswapVersion]: { router: string; quoter?: string } }
} = {
  vanilla: {
    v1_0: {
      router: '0xE13E9010e818D48df1A0415021d9526ef845e2Cd',
      vnl: '0x1017b147b05942ead495e2ad6d606ef3c94b8fd0',
    },
    v1_1: {
      router: '0x72C8B3aA6eD2fF68022691ecD21AEb1517CfAEa6',
      vnl: '0xbf900809f4C73e5a3476eb183d8b06a27e61F8E5',
    },
  },
  uniswap: {
    v2: {
      router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    },
    v3: {
      router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    },
  },
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
