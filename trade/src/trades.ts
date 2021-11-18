import { Percent as V2Percent, Trade as TradeV2 } from '@uniswap/sdk'
import {
  Percent,
  Token as UniswapToken,
  TokenAmount,
  TradeType,
} from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { VanillaV1Router02__factory } from '@vanilladefi/trade-contracts/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory'
import { BigNumber, ethers, providers, Signer } from 'ethers'
import { formatUnits, getAddress } from 'ethers/lib/utils'
import {
  blockDeadlineThreshold,
  chainId,
  contractAddresses,
  epoch,
  usdcWethPoolAddress,
  vnlDecimals,
} from './contracts'
import { VanillaV1Router02__factory } from './contracts/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory'
import {
  convertVanillaTokenToUniswapToken,
  getAllTokens,
  isAddress,
  usdc,
  weth,
} from './tokens'
import vanillaRouter from './types/abis/vanillaRouter.json'
import { VanillaVersion } from './types/general'
import {
  Operation,
  RewardEstimate,
  RewardResponse,
  Token,
  TokenPriceResponse,
  V3Trade,
} from './types/trade'
import {
  constructTrade as constructV2Trade,
  tryParseAmount,
} from './uniswap/v2/trade'
import { getSpotPrice } from './uniswap/v3/spotPrice'
import { constructTrade as constructV3Trade } from './uniswap/v3/trade'

/**
 * Queries the Vanilla router for eligible rewards if given token was
 * sold now and with given price
 *
 * @param version - Vanilla version
 * @param owner - token owner address
 * @param signerOrProvider - an ethersjs signer(read/write) or provider(readonly)
 * @param tokenSold - The sold token in Vanilla's token format
 * @param tokenReceived - The received token in Vanilla's token format
 * @param amountSold - Unparsed amount sold as a decimal string
 * @param amountReceived - Unparsed amount received as a decimal string
 * @returns the amount of rewards ($VNL) the trade would result in
 */
export const estimateReward = async (
  version: VanillaVersion,
  owner: string,
  signerOrProvider: Signer | providers.Provider,
  tokenSold: Token,
  tokenReceived: Token,
  amountSold: string,
  amountReceived: string,
): Promise<RewardResponse | null> => {
  const [parsedAmountSold, parsedAmountReceived] = [
    tryParseAmount(amountSold, tokenSold),
    tryParseAmount(amountReceived, tokenReceived),
  ]
  let reward: RewardResponse | null = null
  if (
    parsedAmountReceived &&
    parsedAmountSold &&
    parsedAmountReceived.greaterThan('0') &&
    parsedAmountSold.greaterThan('0') &&
    isAddress(owner)
  ) {
    const router =
      version === VanillaVersion.V1_0
        ? new ethers.Contract(
            contractAddresses.vanilla[VanillaVersion.V1_0].router,
            JSON.stringify(vanillaRouter.abi),
            signerOrProvider,
          )
        : VanillaV1Router02__factory.connect(
            contractAddresses.vanilla[VanillaVersion.V1_1].router,
            signerOrProvider,
          )

    try {
      reward = await router.estimateReward(
        owner,
        tokenSold.address,
        parsedAmountReceived?.raw.toString(),
        parsedAmountSold?.raw.toString(),
      )
    } catch (e) {
      console.error('estimateReward', e)
      reward = null
    }
  }
  return reward
}

/**
 * Get the pricedata struct that contains the average price and block number of
 * a token, together with the owned amount.
 *
 * @param version - Vanilla version
 * @param owner - token owner address
 * @param signerOrProvider - an ethersjs signer(read/write) or provider(readonly)
 * @param tokenAddress - token contract address
 * @returns Vanilla token data for given owner
 */
export const getPriceData = async (
  version: VanillaVersion,
  owner: string,
  signerOrProvider: Signer | providers.Provider,
  tokenAddress: string,
): Promise<TokenPriceResponse | null> => {
  const router =
    version === VanillaVersion.V1_0
      ? new ethers.Contract(
          contractAddresses.vanilla[VanillaVersion.V1_0].router,
          JSON.stringify(vanillaRouter.abi),
          signerOrProvider,
        )
      : VanillaV1Router02__factory.connect(
          contractAddresses.vanilla[VanillaVersion.V1_1].router,
          signerOrProvider,
        )
  let priceData: TokenPriceResponse | null

  try {
    priceData = await router.tokenPriceData(owner, tokenAddress)
  } catch (e) {
    priceData = null
  }

  return priceData
}

/**
 * Estimates gas for given trade
 *
 * @param version - Vanilla version
 * @param trade - A Vanilla trade object
 * @param signerOrProvider - an ethersjs signer(read/write) or provider(readonly)
 * @param operation - Buy/Sell
 * @param token0 - The bought token (Buy) or the sold token (Sell)
 * @param slippageTolerance - Allowed slippage for the trade
 * @returns Estimated gas limit in wei
 */
export const estimateGas = async (
  version: VanillaVersion,
  trade: TradeV2 | V3Trade,
  signerOrProvider: Signer | providers.Provider,
  operation: Operation,
  token0: Token,
  slippageTolerance: Percent | V2Percent,
): Promise<BigNumber> => {
  const routerV1_0 = new ethers.Contract(
    contractAddresses.vanilla[VanillaVersion.V1_0].router,
    JSON.stringify(vanillaRouter.abi),
    signerOrProvider,
  )
  const routerV1_1 = VanillaV1Router02__factory.connect(
    contractAddresses.vanilla[VanillaVersion.V1_1].router,
    signerOrProvider,
  )

  let gasEstimate: BigNumber = BigNumber.from('0')
  try {
    if (signerOrProvider && trade) {
      let block: providers.Block
      const signer = signerOrProvider as Signer
      if (signer && signer.provider) {
        block = await signer.provider.getBlock('latest')
      } else {
        const provider = signerOrProvider as providers.Provider
        block = await provider.getBlock('latest')
      }
      const blockDeadline = block.timestamp + blockDeadlineThreshold
      const gasPrice = await signerOrProvider.getGasPrice()

      if (version === VanillaVersion.V1_0 && routerV1_0) {
        const normalizedSlippageTolerance = new V2Percent(
          slippageTolerance.numerator,
          slippageTolerance.denominator,
        )
        const normalizedTrade = trade as TradeV2
        if (operation === Operation.Buy) {
          gasEstimate = await routerV1_0.estimateGas.depositAndBuy(
            token0.address,
            normalizedTrade
              ?.minimumAmountOut(normalizedSlippageTolerance)
              .raw.toString(),
            blockDeadline,
            {
              value: normalizedTrade?.inputAmount.raw.toString(),
              gasPrice: gasPrice,
            },
          )
        } else {
          gasEstimate = await routerV1_0.estimateGas.sellAndWithdraw(
            token0.address,
            normalizedTrade?.inputAmount.raw.toString(),
            normalizedTrade
              ?.minimumAmountOut(normalizedSlippageTolerance)
              .raw.toString(),
            blockDeadline,
            {
              gasPrice: gasPrice,
            },
          )
        }
      } else if (version === VanillaVersion.V1_1 && routerV1_1) {
        const normalizedTrade = trade as V3Trade
        const normalizedSlippageTolerance = slippageTolerance as Percent
        if (operation === Operation.Buy) {
          const buyOrder = {
            token: token0.address,
            useWETH: false,
            numEth: normalizedTrade.inputAmount.raw.toString(),
            numToken: normalizedTrade
              .minimumAmountOut(normalizedSlippageTolerance)
              .raw.toString(),
            blockTimeDeadline: blockDeadline,
            fee: 3000,
          }
          gasEstimate = await routerV1_1.estimateGas.executePayable(
            [routerV1_1.interface.encodeFunctionData('buy', [buyOrder])],
            {
              value: normalizedTrade.inputAmount.raw.toString(),
              gasPrice: gasPrice,
            },
          )
        } else {
          const sellOrder = {
            token: token0.address,
            useWETH: false,
            numEth: normalizedTrade
              .minimumAmountOut(normalizedSlippageTolerance)
              .raw.toString(),
            numToken: normalizedTrade.inputAmount.raw.toString(),
            blockTimeDeadline: blockDeadline,
            fee: 3000,
          }
          gasEstimate = await routerV1_1.estimateGas.executePayable(
            [routerV1_1.interface.encodeFunctionData('sell', [sellOrder])],
            { gasPrice: gasPrice },
          )
        }
      }
    }
  } catch (e) {
    console.error('estimateGas', e)
  }
  return gasEstimate
}

/**
 * Adds a reasonable threshold on top of
 * estimated gas limits to guarantee execution
 *
 * @param value - estimated gas limit
 * @returns gas limit with added threshold in wei
 */
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 2500)).div(BigNumber.from(10000))
}

/**
 * Gets user positions with embedded
 * price data in Vanilla's token format
 *
 * @param version - Vanilla version
 * @param address - user address
 * @param tokens - list of tokens to query in Vanilla's token format
 * @param provider - an ethersjs provider (readonly)
 * @returns tokens with price data
 */
export async function getUserPositions(
  version: VanillaVersion,
  address: string,
  tokens?: Token[],
  provider?: providers.Provider,
): Promise<Token[]> {
  const checkSummedAddress = isAddress(address)
  const million = 1000000
  const allTokens = tokens || getAllTokens(version)
  const [ETHPrice] = await getSpotPrice(
    usdcWethPoolAddress,
    convertVanillaTokenToUniswapToken(usdc),
    convertVanillaTokenToUniswapToken(weth),
  )

  let positions: Token[] = []
  if (checkSummedAddress && vanillaRouter) {
    positions = await Promise.all(
      allTokens.map(async (token) => {
        // Fetch price data from Vanilla router
        let tokenSum: BigNumber = BigNumber.from(0)
        const priceResponse: TokenPriceResponse | null = await getPriceData(
          version,
          checkSummedAddress,
          provider || providers.getDefaultProvider(),
          token.address,
        )

        if (priceResponse) {
          tokenSum = priceResponse.tokenSum

          if (!tokenSum.isZero()) {
            // VNL governance token
            const vnlToken = new UniswapToken(
              chainId,
              getAddress(contractAddresses.vanilla[version].vnl),
              vnlDecimals,
            )

            // Construct helpers for upcoming calculations
            const parsedUniToken = new UniswapToken(
              Number(token.chainId),
              getAddress(token.address),
              Number(token.decimals),
            )

            // Construct token amount from Vanilla router reported amounts
            const tokenAmount = new TokenAmount(
              parsedUniToken,
              tokenSum.toString(),
            )

            // Owned amount. By default, use the total owned amount.
            // If zero, exclude from user's owned tokens
            const parsedOwnedAmount = tokenAmount.greaterThan('0')
              ? tokenAmount.toSignificant()
              : undefined

            // Parse value of owned token in USD
            const parsedValue =
              tokenAmount.greaterThan('0') && token.price
                ? parseFloat(tokenAmount.toSignificant()) *
                  token.price *
                  Number(ETHPrice.toSignificant(3))
                : 0

            // Get current best trade from Uniswap to calculate available rewards
            let trade: TradeV2 | V3Trade | null = null
            try {
              if (version === VanillaVersion.V1_0) {
                trade = await constructV2Trade(
                  provider || providers.getDefaultProvider(),
                  tokenAmount.toSignificant(),
                  weth,
                  token,
                  TradeType.EXACT_INPUT,
                )
              } else if (version === VanillaVersion.V1_1) {
                trade = await constructV3Trade(
                  provider || providers.getDefaultProvider(),
                  tokenAmount.toSignificant(),
                  weth,
                  token,
                  TradeType.EXACT_INPUT,
                )
              }
            } catch (e) {
              console.error('Could not construct trade: ', e)
            }

            // Amount out from the trade as a Bignumber gwei string and an ether float
            const amountOut = trade?.outputAmount.raw ?? undefined
            const parsedAmountOut =
              amountOut && formatUnits(amountOut.toString(), weth.decimals)

            let reward: RewardResponse | null = null
            // Get reward estimate from Vanilla router
            reward = parsedAmountOut
              ? await estimateReward(
                  version,
                  address,
                  provider || providers.getDefaultProvider(),
                  token,
                  weth,
                  tokenAmount.toSignificant(),
                  parsedAmountOut,
                )
              : null

            let vpc: string | null = null
            if (reward?.vpc) {
              // Parse VPC
              const vpcNum = reward?.vpc.toNumber() ?? 0
              vpc = (vpcNum / million).toString()
            }

            // Calculate HTRS
            const priceData = await getPriceData(
              version,
              address,
              provider || providers.getDefaultProvider(),
              token.address,
            )
            const blockNumber = await (
              provider || providers.getDefaultProvider()
            ).getBlockNumber()
            const avgBlock =
              priceData?.weightedBlockSum.div(priceData?.tokenSum) ??
              BigNumber.from('0')
            const bhold = BigNumber.from(blockNumber.toString()).sub(avgBlock)
            const btrade = epoch
              ? BigNumber.from(blockNumber.toString()).sub(epoch)
              : BigNumber.from('0')

            let htrs = '0'
            try {
              htrs = (
                bhold
                  .mul(bhold)
                  .mul(million)
                  .div(btrade.mul(btrade))
                  .toNumber() / million
              ).toString()
            } catch (e) {
              console.error('Could not calculate HTRS: ', e)
            }

            // Parse the minimum profitable price from the reward estimate
            let profitablePrice: string | undefined
            let usedEstimate: keyof RewardEstimate = 'medium'
            if (version === VanillaVersion.V1_0 && reward?.profitablePrice) {
              profitablePrice = formatUnits(reward.profitablePrice)
            } else if (version === VanillaVersion.V1_1 && reward?.estimate) {
              switch (Number(token.fee)) {
                case FeeAmount.LOW:
                  usedEstimate = 'low'
                  break
                case FeeAmount.MEDIUM:
                  usedEstimate = 'medium'
                  break
                case FeeAmount.HIGH:
                  usedEstimate = 'high'
                  break
                default:
                  usedEstimate = 'medium'
              }
              profitablePrice = formatUnits(
                reward?.estimate[usedEstimate].profitablePrice,
              )
            }

            // Calculate profit percentage
            let profitPercentage = 0
            try {
              profitPercentage =
                reward && profitablePrice && parsedAmountOut
                  ? -(
                      parseFloat(profitablePrice) - parseFloat(parsedAmountOut)
                    ) / parseFloat(profitablePrice)
                  : 0
            } catch (e) {
              console.error(
                'Could not calculate profit percentage. Falling back to 0: ',
                e,
              )
            }

            // Parse the available VNL reward
            let parsedVnl = 0
            if (version === VanillaVersion.V1_0 && reward?.reward) {
              parsedVnl = parseFloat(
                new TokenAmount(
                  vnlToken,
                  reward.reward.toString(),
                ).toSignificant(),
              )
            } else if (version === VanillaVersion.V1_1 && reward?.estimate) {
              parsedVnl = parseFloat(
                new TokenAmount(
                  vnlToken,
                  reward.estimate[usedEstimate].reward.toString(),
                ).toSignificant(),
              )
            }

            return {
              ...token,
              owned: parsedOwnedAmount,
              ownedRaw: tokenAmount.raw.toString(),
              value: parsedValue,
              htrs: htrs,
              vpc: vpc,
              profit: profitPercentage,
              vnl: parsedVnl,
            }
          } else {
            return token
          }
        } else {
          return token
        }
      }),
    )
    positions = positions.filter((token) => token.owned)
  }
  return positions
}
