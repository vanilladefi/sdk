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
  /** Set this address as the address Vanilla Juicenet's contract is at */
  optionalAddress?: string
  vanillaVersion?: VanillaVersion
  /** Most RPC providers have block depth limits for calls. Set this to match the used RPC's block limit or Infinity to have no depth limit at all. */
  blockThreshold?: number
}

export type StakePerformance = { user: string; delta: BigNumber }

export type LeaderBoard = Array<StakePerformance>
