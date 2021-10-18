import { ethers } from 'ethers';
import { PrerenderProps } from './types/content';
import { VanillaVersion } from './types/general';
export declare const getUsers: (provider?: ethers.providers.Provider | undefined) => Promise<string[]>;
export declare const getBasicWalletDetails: (vanillaVersion: VanillaVersion, walletAddress: string, provider?: ethers.providers.Provider | undefined) => Promise<PrerenderProps>;
export declare const getVnlHolders: (provider?: ethers.providers.Provider | undefined) => Promise<string[]>;
