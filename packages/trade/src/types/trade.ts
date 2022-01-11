import { CurrencyAmount, Percent, Price, TradeType } from '@uniswap/sdk-core'
import { BigNumber, ethers } from 'ethers'
import { Token } from '@vanilladefi/core-sdk'

export enum Operation {
  Buy = 'buy',
  Sell = 'sell',
}

export interface TokenInfoQueryResponse {
  token: {
    id: string
  }
  price: string
  pairId?: string
  id?: string
  reserveETH?: string
  reserveToken?: string
  reserveUSD?: string
  liquidity?: string
  inRangeLiquidity?: string | null
  sqrtPrice?: string | null
  totalValueLockedETH?: string | null
}

export interface Call {
  address: string
  callData: string
}

export enum Action {
  PURCHASE = 'purchase',
  SALE = 'sale',
  APPROVAL = 'approval',
  CONVERSION = 'conversion',
}

export interface TransactionDetails {
  hash: string
  action: Action
  approval?: { tokenAddress: string; spender: string }
  receipt?: ethers.providers.TransactionReceipt
  from: string
  blockNumber?: number
  paid?: Token
  received?: Token
  amountConverted?: string
  amountApproved?: string
  amountPaid?: string
  amountReceived?: string
  addedTime?: number
  reward?: string
  pairId?: string
}

export enum Liquidity {
  LOW = 500,
  MEDIUM = 1000,
  HIGH = 2000,
}

export declare class V3Trade {
  get executionPrice(): Price
  minimumAmountOut(slippageTolerance: Percent): CurrencyAmount
  maximumAmountIn(slippageTolerance: Percent): CurrencyAmount
  inputAmount: CurrencyAmount
  outputAmount: CurrencyAmount
  route: null
  price: Price
  tradeType: TradeType
  worstExecutionPrice: () => Price
}

export interface TokenPriceResponse {
  ethSum: BigNumber
  latestBlock: BigNumber
  tokenSum: BigNumber
  weightedBlockSum: BigNumber
}

export interface TradeResult {
  price: BigNumber
  twapPeriodInSeconds: BigNumber
  profitablePrice: BigNumber
  maxProfitablePrice: BigNumber
  rewardableProfit: BigNumber
  reward: BigNumber
}

export interface RewardEstimate {
  low: TradeResult
  medium: TradeResult
  high: TradeResult
}

export interface RewardResponse {
  avgBlock: BigNumber
  htrs: BigNumber
  profitablePrice?: BigNumber
  vpc?: BigNumber
  reward?: BigNumber
  estimate?: RewardEstimate
}
