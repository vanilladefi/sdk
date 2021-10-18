import { Fraction, Token } from '@uniswap/sdk-core';
import { providers } from 'ethers';
declare type PriceGetter = (poolAddress: string, token0: Token, token1: Token, provider?: providers.Provider) => Promise<[Fraction, Fraction]>;
export declare const getSpotPrice: PriceGetter;
export {};
