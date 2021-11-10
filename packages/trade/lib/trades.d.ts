import { Percent as V2Percent, Trade as TradeV2 } from '@uniswap/sdk';
import { Percent } from '@uniswap/sdk-core';
import { BigNumber, providers, Signer } from 'ethers';
import { VanillaVersion, Token } from '@vanilladefi/core-sdk';
import { Operation, RewardResponse, TokenPriceResponse, V3Trade } from './types/trade';
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
export declare const estimateReward: (version: VanillaVersion, owner: string, signerOrProvider: Signer | providers.Provider, tokenSold: Token, tokenReceived: Token, amountSold: string, amountReceived: string) => Promise<RewardResponse | null>;
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
export declare const getPriceData: (version: VanillaVersion, owner: string, signerOrProvider: Signer | providers.Provider, tokenAddress: string) => Promise<TokenPriceResponse | null>;
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
export declare const estimateGas: (version: VanillaVersion, trade: TradeV2 | V3Trade, signerOrProvider: Signer | providers.Provider, operation: Operation, token0: Token, slippageTolerance: Percent | V2Percent) => Promise<BigNumber>;
/**
 * Adds a reasonable threshold on top of
 * estimated gas limits to guarantee execution
 *
 * @param value - estimated gas limit
 * @returns gas limit with added threshold in wei
 */
export declare function calculateGasMargin(value: BigNumber): BigNumber;
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
export declare function getUserPositions(version: VanillaVersion, address: string, tokens?: Token[], provider?: providers.Provider): Promise<Token[]>;
