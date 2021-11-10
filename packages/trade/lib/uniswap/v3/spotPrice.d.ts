import { Fraction, Token } from '@uniswap/sdk-core';
import { providers } from 'ethers';
declare type PriceGetter = (poolAddress: string, token0: Token, token1: Token, provider?: providers.Provider) => Promise<[Fraction, Fraction]>;
/**
 * Gets the on-chain price for given token pair
 * from a Uniswap v3 liquidity pool
 *
 * @param poolAddress - the Uniswap v3 liquidity pool address
 * @param token0 - the first token of the token pair in Uniswap's Token format
 * @param token1 - the second token of the pair in Uniswap's token format
 * @param provider - an ethersjs provider (readonly)
 * @returns a list with both prices of the pair (token0/token1 & token1/token0)
 */
export declare const getSpotPrice: PriceGetter;
export {};
