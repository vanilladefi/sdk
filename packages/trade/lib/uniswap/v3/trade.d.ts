import { CurrencyAmount, Percent, Price, TokenAmount, TradeType } from '@uniswap/sdk-core';
import { Quoter } from '@vanilladefi/trade-contracts/typechain/uniswap_v3_periphery/Quoter';
import { BigNumber, BigNumberish, providers, Signer, Transaction } from 'ethers';
import { Token, UniSwapToken } from '@vanilladefi/core-sdk';
import { TransactionProps } from '../../uniswap';
declare type SwapParams = {
    tokenIn: string;
    tokenOut: string;
    fee: number;
    sqrtPriceLimitX96: number;
};
declare type SwapParamsIn = SwapParams & {
    amountIn: BigNumberish;
};
declare type SwapParamsOut = SwapParams & {
    amountOut: BigNumberish;
};
/**
 * A curried function that returns helpers for
 * interacting with a Uniswap Quoter
 *
 * @param oracle - Uniswap Quoter instance
 * @returns function swap()
 */
export declare const UniswapOracle: (oracle: Quoter) => {
    swap: (tokenIn: string, tokenOut: string) => {
        swapParamsIn(amountIn: TokenAmount, fee: number): SwapParamsIn;
        swapParamsOut(amountOut: TokenAmount, fee: number): SwapParamsOut;
        estimateAmountOut(amountIn: TokenAmount, fee: number): Promise<BigNumber>;
        estimateAmountIn(amountOut: TokenAmount, fee: number): Promise<BigNumber>;
    };
};
/**
 * Buys tokens on Uniswap v3 using Vanilla v1.1
 *
 * @param param0 {@link @vanilladefi/sdk/lib/TransactionProps | TransactionProps object}
 * @returns an ethersjs Transaction object
 */
export declare const buy: ({ amountPaid, amountReceived, tokenReceived, signer, blockDeadline, feeTier, gasLimit, }: TransactionProps) => Promise<Transaction>;
/**
 * Sells tokens on Uniswap v3 using Vanilla v1.1
 *
 * @param param0 {@link @vanilladefi/sdk/lib/TransactionProps | TransactionProps object}
 * @returns an ethersjs Transaction object
 */
export declare const sell: ({ amountPaid, amountReceived, tokenPaid, signer, blockDeadline, feeTier, gasLimit, }: TransactionProps) => Promise<Transaction>;
/**
 * Vanilla's own Uniswap v3 Trade object that's
 * compatible with Uniswap  Trade objects
 */
declare class V3Trade {
    inputAmount: TokenAmount;
    outputAmount: TokenAmount;
    tradeType: TradeType;
    price: Price;
    route: null;
    constructor(inputAmount: TokenAmount, outputAmount: TokenAmount, tradeType: TradeType);
    worstExecutionPrice(): Price;
    get executionPrice(): Price;
    minimumAmountOut(slippageTolerance: Percent): CurrencyAmount;
    maximumAmountIn(slippageTolerance: Percent): CurrencyAmount;
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
export declare function constructTrade(signerOrProvider: Signer | providers.Provider, amountToTrade: string, // Not amountPaid because of tradeType
tokenReceived: Token, tokenPaid: Token, tradeType: TradeType): Promise<V3Trade | null>;
/**
 * Tries to parse a string value to a TokenAmount.
 * If it fails, it returns undefined.
 *
 * @param value - amount of currency as an unparsed string ("0.05" etc.)
 * @param currency - the currency, containing the decimal points used
 * @returns the TokenAmount with methods like .toSignificant() or undefined.
 */
export declare function tryParseAmount(value?: string, currency?: UniSwapToken): TokenAmount | undefined;
export {};
