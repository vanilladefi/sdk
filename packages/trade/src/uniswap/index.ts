import { BigNumber, providers } from 'ethers'
import { UniSwapToken } from '@vanilladefi/core-sdk'

export interface TransactionProps {
  amountReceived: string
  amountPaid: string
  tokenPaid: UniSwapToken
  tokenReceived: UniSwapToken
  signer?: providers.JsonRpcSigner
  blockDeadline: number
  feeTier?: number
  gasLimit: BigNumber | null
}
