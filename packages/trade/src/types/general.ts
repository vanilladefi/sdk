import { ChainId } from '@vanilladefi/core-sdk'
import { TransactionDetails } from './trade'

export type ChainIdToTransactionMapping = {
  [chainId in ChainId]: {
    [transactionKey: string]: TransactionDetails
  }
}

export type TokenQueryVariables = {
  blockNumber?: number | null
  weth: string
  tokenAddresses: string[]
  poolAddresses?: string[] | null
}
