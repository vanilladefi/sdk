import {
  Fetcher,
  JSBI,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
} from '@uniswap/sdk'
import { providers, Transaction } from 'ethers'
import { getAddress, parseUnits } from 'ethers/lib/utils'
import { chainId, contractAddresses, ethersOverrides } from '../../contracts'
import { getContract } from '../../tokens'
import vanillaRouter from '../../types/abis/vanillaRouter.json'
import { VanillaVersion } from '../../types/general'
import type { Token as UniswapToken } from '../../types/trade'
import { TransactionProps } from '../../uniswap'

/**
 * Buys tokens on Uniswap v2 using Vanilla v1.0
 *
 * @param param0 {@link @vanilladefi/sdk/lib/TransactionProps | TransactionProps object}
 * @returns an ethersjs Transaction object
 */
export const buy = async ({
  amountPaid,
  amountReceived,
  tokenReceived,
  signer,
  blockDeadline,
  gasLimit,
}: TransactionProps): Promise<Transaction> => {
  const router = getContract(
    contractAddresses.vanilla[VanillaVersion.V1_0].router,
    JSON.stringify(vanillaRouter.abi),
    signer,
  )

  const usedGasLimit =
    gasLimit !== undefined ? gasLimit : ethersOverrides.gasLimit

  const receipt = await router.depositAndBuy(
    tokenReceived?.address,
    amountReceived,
    blockDeadline,
    { value: amountPaid, gasLimit: usedGasLimit },
  )

  return receipt
}

/**
 * Sells tokens on Uniswap v2 using Vanilla v1.0
 *
 * @param param0 {@link @vanilladefi/sdk/lib/TransactionProps | TransactionProps object}
 * @returns an ethersjs Transaction object
 */
export const sell = async ({
  amountPaid,
  amountReceived,
  tokenPaid,
  signer,
  blockDeadline,
  gasLimit,
}: TransactionProps): Promise<Transaction> => {
  const router = getContract(
    contractAddresses.vanilla[VanillaVersion.V1_0].router,
    JSON.stringify(vanillaRouter.abi),
    signer,
  )

  const usedGasLimit =
    gasLimit !== undefined ? gasLimit : ethersOverrides.gasLimit

  const receipt = await router.sellAndWithdraw(
    tokenPaid?.address,
    amountPaid,
    amountReceived,
    blockDeadline,
    { gasLimit: usedGasLimit },
  )

  return receipt
}

/**
 * A pricing function for Uniswap v2 trades
 *
 * @param provider - an ethersjs provider (readonly)
 * @param amountToTrade - the unparsed token amount to trade
 * @param tokenReceived - token that is traded against
 * @param tokenPaid - the bought or sold token
 * @param tradeType - pricing method, depends if
 *                    amountToTrade represents tokenReceived or tokenPaid
 * @returns Uniswap v2 trade
 */
export async function constructTrade(
  provider: providers.Provider,
  amountToTrade: string, // Not amountPaid because of tradeType
  tokenReceived: UniswapToken,
  tokenPaid: UniswapToken,
  tradeType = TradeType.EXACT_OUTPUT,
): Promise<Trade> {
  /* eslint-disable no-useless-catch */
  try {
    const parsedAmount = tryParseAmount(
      amountToTrade,
      tradeType === TradeType.EXACT_OUTPUT ? tokenReceived : tokenPaid,
    )
    if (!parsedAmount)
      return Promise.reject(`Failed to parse input amount: ${amountToTrade}`)

  const convertedTokenReceived = new Token(
    parseInt(tokenReceived.chainId),
    getAddress(tokenReceived.address),
    parseInt(tokenReceived.decimals),
  )
  const convertedTokenPaid = new Token(
    parseInt(tokenPaid.chainId),
    getAddress(tokenPaid.address),
    parseInt(tokenPaid.decimals),
  )
  const pair = await Fetcher.fetchPairData(
    convertedTokenReceived,
    convertedTokenPaid,
    provider as providers.BaseProvider,
  )

  const route = new Route([pair], convertedTokenPaid)

  const trade = new Trade(route, parsedAmount, tradeType)

    return trade
  } catch (error) {
    throw error
  }
  /* eslint-enable no-useless-catch */
}

/**
 * Tries to parse a string value to a TokenAmount.
 * If it fails, it returns undefined.
 *
 * @param value - amount of currency as an unparsed string ("0.05" etc.)
 * @param currency - the currency, containing the decimal points used
 * @returns the TokenAmount with methods like .toSignificant() or undefined.
 */
export function tryParseAmount(
  value?: string,
  currency?: UniswapToken,
): TokenAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const convertedToken = new Token(
      chainId,
      getAddress(currency.address),
      Number(currency.decimals),
    )
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return new TokenAmount(convertedToken, JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}
