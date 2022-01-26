import { BigNumberish } from 'ethers'

export enum availableNetworks {
  'matic',
  'maticmum',
}

export interface Stake {
  token: string
  amount: BigNumberish
  sentiment: boolean
}
