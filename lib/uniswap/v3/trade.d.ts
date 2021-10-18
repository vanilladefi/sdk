import { CurrencyAmount, Percent, Price, TokenAmount, TradeType } from '@uniswap/sdk-core';
import { BigNumber, providers, Signer, Transaction } from 'ethers';
import { Token, UniSwapToken } from '../../types/trade';
import { Quoter } from '../../types/typechain/uniswap_v3_periphery';
import { TransactionProps } from '../../uniswap';
export declare const UniswapOracle: (oracle: Quoter) => {
    swap(tokenIn: string, tokenOut: string): {
        swapParamsIn(amountIn: TokenAmount, fee: number): {
            tokenIn: string;
            tokenOut: string;
            fee: number;
            sqrtPriceLimitX96: number;
            amountIn: string;
        };
        swapParamsOut(amountOut: TokenAmount, fee: number): {
            tokenIn: string;
            tokenOut: string;
            fee: number;
            sqrtPriceLimitX96: number;
            amountOut: string;
        };
        estimateAmountOut(amountIn: TokenAmount, fee: number): Promise<BigNumber | undefined>;
        estimateAmountIn(amountOut: TokenAmount, fee: number): Promise<BigNumber | undefined>;
    };
};
export declare const buy: ({ amountPaid, amountReceived, tokenReceived, signer, blockDeadline, feeTier, gasLimit, }: TransactionProps) => Promise<Transaction>;
export declare const sell: ({ amountPaid, amountReceived, tokenPaid, signer, blockDeadline, feeTier, gasLimit, }: TransactionProps) => Promise<Transaction>;
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
export declare function constructTrade(signerOrProvider: Signer | providers.Provider, amountToTrade: string, // Not amountPaid because of tradeType
tokenReceived: Token, tokenPaid: Token, tradeType: TradeType): Promise<V3Trade | null>;
export declare function tryParseAmount(value?: string, currency?: UniSwapToken): TokenAmount | undefined;
export {};
