import { ethers } from 'ethers';
import { Token, VanillaVersion } from '@vanilladefi/core-sdk';
export declare type PrerenderProps = {
    walletAddress?: string | false;
    vnlBalance?: string | null;
    ethBalance?: string | null;
    initialTokens?: {
        v2?: Token[];
        v3?: Token[];
        userPositionsV3: Token[] | null;
        userPositionsV2: Token[] | null;
    };
    ethPrice?: number;
    currentBlockNumber?: number;
};
/**
 * Gets all addresses that have purchased tokens via Vanilla
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that have interacted with Vanilla
 */
export declare const getUsers: (provider?: ethers.providers.Provider | undefined) => Promise<string[]>;
/**
 * Fetches the $VNL and $ETH balances for given address
 *
 * @param vanillaVersion - Vanilla version
 * @param address - ethereum address
 * @param provider - an ethersjs provider (readonly)
 * @returns addresses $VNL and $ETH balance
 */
export declare const getBasicWalletDetails: (vanillaVersion: VanillaVersion, address: string, provider?: ethers.providers.Provider | undefined) => Promise<PrerenderProps>;
/**
 * Gets a list of $VNL holders
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that hold $VNL
 */
export declare const getVnlHolders: (provider?: ethers.providers.Provider | undefined) => Promise<string[]>;
