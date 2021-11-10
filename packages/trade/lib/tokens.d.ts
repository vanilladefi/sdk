import { Token as UniswapToken } from '@uniswap/sdk-core';
import { BigNumber, Contract, providers, Signer } from 'ethers';
import { Token, UniSwapToken, VanillaVersion } from '@vanilladefi/core-sdk';
/**
 * Equals wETH from getAllTokens if found, defaultWeth if not
 */
export declare const weth: Token;
/**
 * Equals USDC from getAllTokens if found, defaultUsdc if not
 */
export declare const usdc: Token;
/**
 * Latest $VNL token in Vanilla's token format
 */
export declare const vnl: Token;
/**
 * Returns the list of tokens available in Vanilla's trade UI
 * based on given Vanilla version.
 *
 * @param version - Vanilla version
 * @returns A list of tokens in Vanilla's token format.
 */
export declare function getAllTokens(version?: VanillaVersion): Token[];
/**
 * Returns the ETH balance of given Ethereum address as a BigNumber (wei)
 *
 * @param address - Ethereum address
 * @param provider - an ethersjs provider with readonly access
 * @returns the ETH balance of given Ethereum address in wei as BigNumber
 */
export declare function getBalance(address: string, provider: providers.Provider): Promise<BigNumber>;
/**
 * Returns a checksummed version of the given address if it exists,
 * false if the given address is not correct.
 *
 * @param value - an Ethereum address
 * @returns a checksummed address or false
 */
export declare function isAddress(value: string): string | false;
/**
 * Helper function for constructing arbitrary ethersjs contract instances
 *
 * @param address - contract address
 * @param ABI - The application binary interface of the contract
 * @param signerOrProvider - an ethersjs signer(read/write) or provider(readonly)
 * @returns a Contract instance with transactional capabilities
 */
export declare function getContract(address: string, ABI: any, signerOrProvider?: providers.Provider | Signer | undefined): Contract;
/**
 * Pads Uniswap SDK token format into Vanilla token format
 *
 * @param input - a UniSwapToken instance with less info than Vanilla's Token format
 * @returns a padded token with all required fields of Vanilla token format
 */
export declare function padUniswapTokenToToken(input: UniSwapToken): Token;
/**
 * Converts a token from Vanilla token format into Uniswap token format
 *
 * @param input - a Vanilla token
 * @returns a Uniswap SDK compatible token
 */
export declare function convertVanillaTokenToUniswapToken(input: Token): UniswapToken;
