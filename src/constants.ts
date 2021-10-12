import { FeeAmount } from '@uniswap/v3-sdk'
import { providers } from 'ethers'
import { UniswapVersion, VanillaVersion } from 'types/general'

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

export const usdcWethPoolAddress = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640'

export const vnlDecimals = 12

export const epoch = 12134736

export const chainId = 1

export const network: providers.Networkish = providers.getNetwork(chainId)

export const hiddenTokens = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161']

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

export const blockDeadlineThreshold = 60000 // 600 seconds added to the latest block timestamp (10 minutes)

export const conservativeGasLimit = 800_000
export const conservativeMigrationGasLimit = 120_000
export const ethersOverrides = { gasLimit: conservativeGasLimit }

export default {
  contractAddresses,
  epoch,
  chainId,
  network,
  hiddenTokens,
  getFeeTier,
  blockDeadlineThreshold,
  conservativeGasLimit,
  conservativeMigrationGasLimit,
  ethersOverrides,
}
