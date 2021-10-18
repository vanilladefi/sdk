import { TokenAmount, Trade, TradeType } from '@uniswap/sdk';
import { providers, Transaction } from 'ethers';
import type { Token as UniswapToken } from 'types/trade';
import { TransactionProps } from 'uniswap';
export declare const buy: ({ amountPaid, amountReceived, tokenReceived, signer, blockDeadline, gasLimit, }: TransactionProps) => Promise<Transaction>;
export declare const sell: ({ amountPaid, amountReceived, tokenPaid, signer, blockDeadline, gasLimit, }: TransactionProps) => Promise<Transaction>;
export declare function constructTrade(provider: providers.Provider, amountToTrade: string, // Not amountPaid because of tradeType
tokenReceived: UniswapToken, tokenPaid: UniswapToken, tradeType?: TradeType): Promise<Trade>;
export declare function tryParseAmount(value?: string, currency?: UniswapToken): TokenAmount | undefined;
