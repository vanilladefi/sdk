import { ERC20 } from '@vanilladefi/trade-contracts/typechain/openzeppelin/ERC20'
import { ERC20__factory } from '@vanilladefi/trade-contracts/typechain/openzeppelin/factories/ERC20__factory'
import { providers, Signer } from 'ethers'
import { Token, UniswapVersion, VanillaVersion } from './types'

/**
 * Decimal points used in $VNL
 */
export const vnlDecimals = 12

/**
 * Decimal points used in $JUICE
 */
export const juiceDecimals = 8

/**
 * Addresses of deployed Vanilla contracts
 */
export const contractAddresses: {
  vanilla: { [version in VanillaVersion]: { router: string; vnl?: string } }
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
    v2: {
      router: '0xa7480B62a657555f6727bCdb96953bCC211FFbaC',
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
 * Latest $VNL token in Vanilla's token format
 */
export const vnl: Token = {
  chainId: '1', // VNL resides on the Ethereum mainnet, might change if bridged
  address: contractAddresses.vanilla.v1_1?.vnl || '',
  decimals: String(vnlDecimals),
  symbol: 'VNL',
  name: 'Vanilla',
  logoColor: null,
  pairId: null,
}

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
  const address = contractAddresses.vanilla[version]?.vnl
  return ERC20__factory.connect(
    address || '',
    (signerOrProvider || providers.getDefaultProvider()) as any,
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
 * The block number of the first Vanilla v1.0 deployment. Used for calculating HTRS
 */
export const epoch = 12134736
