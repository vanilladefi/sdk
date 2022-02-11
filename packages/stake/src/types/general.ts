import { VanillaVersion } from '@vanilladefi/core-sdk'
import { BigNumber, BigNumberish, providers, Signer } from 'ethers'

export enum availableNetworks {
  'matic',
  'maticmum',
}

export interface Stake {
  token: string
  amount: BigNumberish
  sentiment: boolean
}

export interface StakeInfo {
  juiceStake: BigNumber
  juiceValue: BigNumber
  currentPrice: BigNumber
  sentiment: boolean
}

export interface Options {
  signerOrProvider?: Signer | providers.Provider
  provider?: providers.Provider
  optionalAddress?: string
  vanillaVersion?: VanillaVersion
}
