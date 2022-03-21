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
  polygonProvider?: providers.Provider
  ethereumProvider?: providers.Provider
  optionalAddress?: string
  vanillaVersion?: VanillaVersion
}

export type StakePerformance = {
  user: string
  delta: BigNumber
  relativeDelta?: number
}

export type LeaderBoard = Array<StakePerformance>
