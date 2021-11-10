import { TokenAmount, Trade, TradeType } from '@uniswap/sdk';
import { providers, Transaction } from 'ethers';
import type { Token as UniswapToken } from '@vanilladefi/core-sdk';
import { TransactionProps } from '../../uniswap';
/**
 * Buys tokens on Uniswap v2 using Vanilla v1.0
 *
 * @param param0 {@link @vanilladefi/sdk/lib/TransactionProps | TransactionProps object}
 * @returns an ethersjs Transaction object
 */
export declare const buy: ({ amountPaid, amountReceived, tokenReceived, signer, blockDeadline, gasLimit, }: TransactionProps) => Promise<Transaction>;
/**
 * Sells tokens on Uniswap v2 using Vanilla v1.0
 *
 * @param param0 {@link @vanilladefi/sdk/lib/TransactionProps | TransactionProps object}
 * @returns an ethersjs Transaction object
 */
export declare const sell: ({ amountPaid, amountReceived, tokenPaid, signer, blockDeadline, gasLimit, }: TransactionProps) => Promise<Transaction>;
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
export declare function constructTrade(provider: providers.Provider, amountToTrade: string, // Not amountPaid because of tradeType
tokenReceived: UniswapToken, tokenPaid: UniswapToken, tradeType?: TradeType): Promise<Trade>;
/**
 * Tries to parse a string value to a TokenAmount.
 * If it fails, it returns undefined.
 *
 * @param value - amount of currency as an unparsed string ("0.05" etc.)
 * @param currency - the currency, containing the decimal points used
 * @returns the TokenAmount with methods like .toSignificant() or undefined.
 */
export declare function tryParseAmount(value?: string, currency?: UniswapToken): TokenAmount | undefined;
