import {
  CurrencyAmount,
  Fraction,
  Percent,
  Price,
  Token as UniswapToken,
  TokenAmount,
  TradeType
} from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { BigNumber, providers, Signer, Transaction } from 'ethers'
import { formatUnits, getAddress, parseUnits } from 'ethers/lib/utils'
import {
  chainId,
  conservativeGasLimit,
  contractAddresses,
  ethersOverrides,
  getFeeTier
} from '../../contracts'
import { QuoterV2__factory } from '../../contracts/typechain/uniswap_v3_periphery/factories/QuoterV2__factory'
import { QuoterV2 } from '../../contracts/typechain/uniswap_v3_periphery/QuoterV2'
import { VanillaV1Router02__factory } from '../../contracts/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory'
import { isAddress } from '../../tokens'
import { VanillaVersion } from '../../types/general'
import { Token, UniSwapToken } from '../../types/trade'
import { TransactionProps } from '../../uniswap'

/**
 * A curried function that returns helpers for
 * interacting with a Uniswap Quoter
 *
 * @param oracle - Uniswap Quoter instance
 * @returns function swap()
 */
export const UniswapOracle = (oracle: QuoterV2) => ({
  swap(tokenIn: string, tokenOut: string) {
    return {
      swapParamsIn(amountIn: TokenAmount, fee: number) {
        return {
          tokenIn,
          tokenOut,
          fee: fee,
          sqrtPriceLimitX96: 0,
          amountIn: amountIn.raw.toString(),
        }
      },
      swapParamsOut(amountOut: TokenAmount, fee: number) {
        return {
          tokenIn,
          tokenOut,
          fee: fee,
          sqrtPriceLimitX96: 0,
          amountOut: amountOut.raw.toString(),
        }
      },
      async estimateAmountOut(amountIn: TokenAmount, fee: number) {
        try {
          const swapParams = this.swapParamsIn(amountIn, fee)

          return await oracle.callStatic.quoteExactInputSingle(
            swapParams.tokenIn,
            swapParams.tokenOut,
            fee,
            swapParams.amountIn,
            swapParams.sqrtPriceLimitX96,
            {
              gasLimit: conservativeGasLimit,
            },
          )
        } catch (e) {
          console.error(e)
          return undefined
        }
      },
      async estimateAmountIn(amountOut: TokenAmount, fee: number) {
        try {
          const swapParams = this.swapParamsOut(amountOut, fee)

          return await oracle.callStatic.quoteExactOutputSingle(
            swapParams.tokenIn,
            swapParams.tokenOut,
            fee,
            swapParams.amountOut,
            swapParams.sqrtPriceLimitX96,
            {
              gasLimit: conservativeGasLimit,
            },
          )
        } catch (e) {
          console.error(e)
          return undefined
        }
      },
    }
  },
})

/**
 * Buys tokens on Uniswap v3 using Vanilla v1.1
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
  feeTier,
  gasLimit,
}: TransactionProps): Promise<Transaction> => {
  const vnl1_1Addr = isAddress(
    contractAddresses.vanilla[VanillaVersion.V1_1].router,
  )
  if (vnl1_1Addr && tokenReceived?.address && signer && feeTier) {
    const router = VanillaV1Router02__factory.connect(vnl1_1Addr, signer)
    const usedGasLimit = gasLimit ? gasLimit : ethersOverrides.gasLimit
    const orderData = {
      token: tokenReceived.address,
      useWETH: false,
      numEth: amountPaid,
      numToken: amountReceived,
      blockTimeDeadline: blockDeadline,
      fee: feeTier,
    }
    const receipt = await router.executePayable(
      [router.interface.encodeFunctionData('buy', [orderData])],
      { value: amountPaid, gasLimit: usedGasLimit },
    )
    return receipt
  } else {
    return Promise.reject('No Vanilla v1.1 router on used chain!')
  }
}

/**
 * Sells tokens on Uniswap v3 using Vanilla v1.1
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
  feeTier,
  gasLimit,
}: TransactionProps): Promise<Transaction> => {
  const vnl1_1Addr = isAddress(
    contractAddresses.vanilla[VanillaVersion.V1_1].router,
  )
  if (vnl1_1Addr && tokenPaid?.address && signer && feeTier) {
    const router = VanillaV1Router02__factory.connect(vnl1_1Addr, signer)
    const usedGasLimit = gasLimit ? gasLimit : ethersOverrides.gasLimit
    const orderData = {
      token: tokenPaid.address,
      useWETH: false,
      numEth: amountReceived,
      numToken: amountPaid,
      blockTimeDeadline: blockDeadline,
      fee: feeTier,
    }
    const receipt = await router.executePayable(
      [router.interface.encodeFunctionData('sell', [orderData])],
      { gasLimit: usedGasLimit },
    )
    return receipt
  } else {
    return Promise.reject('No Vanilla v1.1 router on used chain!')
  }
}

/**
 * Vanilla's own Uniswap v3 Trade object that's
 * compatible with Uniswap v2 Trade objects
 */
class V3Trade {
  public inputAmount: TokenAmount
  public outputAmount: TokenAmount
  public tradeType: TradeType
  public price: Price

  public route = null

  constructor(
    inputAmount: TokenAmount,
    outputAmount: TokenAmount,
    tradeType: TradeType,
  ) {
    this.inputAmount = inputAmount
    this.outputAmount = outputAmount
    this.tradeType = tradeType
    this.price = new Price(
      inputAmount.token,
      outputAmount.token,
      inputAmount.raw.toString(),
      outputAmount.raw.toString(),
    )
    this.route = null
  }

  worstExecutionPrice() {
    return this.price
  }

  get executionPrice() {
    return this.price
  }

  minimumAmountOut(slippageTolerance: Percent) {
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return this.outputAmount
    } else {
      const slippageAdjustedAmountOut = new Fraction(1)
        .add(slippageTolerance)
        .invert()
        .multiply(this.outputAmount.raw).quotient
      return this.outputAmount instanceof TokenAmount
        ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut)
        : CurrencyAmount.ether(slippageAdjustedAmountOut)
    }
  }

  maximumAmountIn(slippageTolerance: Percent) {
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return this.inputAmount
    } else {
      const slippageAdjustedAmountIn = new Fraction(1)
        .add(slippageTolerance)
        .multiply(this.inputAmount.raw).quotient
      return this.inputAmount instanceof TokenAmount
        ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn)
        : CurrencyAmount.ether(slippageAdjustedAmountIn)
    }
  }
}

/**
 * A pricing function for Uniswap v3 trades
 *
 * @param signerOrProvider - an ethersjs provider (readonly) or signer (read/write)
 * @param amountToTrade - the unparsed token amount to trade
 * @param tokenReceived - token that is traded against
 * @param tokenPaid - the bought or sold token
 * @param tradeType - pricing method, depends if
 *                    amountToTrade represents tokenReceived or tokenPaid
 * @returns Uniswap v3 trade
 */
export async function constructTrade(
  signerOrProvider: Signer | providers.Provider,
  amountToTrade: string, // Not amountPaid because of tradeType
  tokenReceived: Token,
  tokenPaid: Token,
  tradeType: TradeType,
): Promise<V3Trade | null> {
  const defaultFeeTier = FeeAmount.MEDIUM
  try {
    const tokenToTrade =
      tradeType === TradeType.EXACT_OUTPUT ? tokenReceived : tokenPaid
    const quotedToken =
      tradeType === TradeType.EXACT_OUTPUT ? tokenPaid : tokenReceived

    // Convert the decimal amount to a UniSwap TokenAmount
    const parsedAmountTraded = tryParseAmount(amountToTrade, tokenToTrade)
    if (!parsedAmountTraded)
      return Promise.reject(`Failed to parse input amount: ${amountToTrade}`)

    const feeTier =
      getFeeTier(tokenReceived.fee) ||
      getFeeTier(tokenPaid.fee) ||
      defaultFeeTier

    const uniV3Oracle = QuoterV2__factory.connect(
      contractAddresses.uniswap.v3.quoter || '',
      signerOrProvider,
    )

    const swapOperation = UniswapOracle(uniV3Oracle).swap(
      isAddress(tokenPaid.address) || tokenPaid.address,
      isAddress(tokenReceived.address) || tokenReceived.address,
    )

    let quote: BigNumber = BigNumber.from(0)
    if (tradeType === TradeType.EXACT_INPUT) {
      const amountOut = await swapOperation.estimateAmountOut(
        parsedAmountTraded,
        feeTier.valueOf(),
      )
      if (amountOut) {
        quote = amountOut
      }
    } else {
      const amountIn = await swapOperation.estimateAmountIn(
        parsedAmountTraded,
        feeTier.valueOf(),
      )
      if (amountIn) {
        quote = amountIn
      }
    }

    const formattedQuote = formatUnits(quote, quotedToken.decimals)
    const parsedQuote = tryParseAmount(formattedQuote, quotedToken)

    if (parsedQuote && parsedAmountTraded) {
      return new V3Trade(
        tradeType === TradeType.EXACT_INPUT ? parsedAmountTraded : parsedQuote,
        tradeType === TradeType.EXACT_INPUT ? parsedQuote : parsedAmountTraded,
        tradeType,
      )
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    throw error
  }
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
  currency?: UniSwapToken,
): TokenAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const convertedToken = new UniswapToken(
      chainId,
      getAddress(currency.address),
      Number(currency.decimals),
    )
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return new TokenAmount(convertedToken, typedValueParsed)
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}
