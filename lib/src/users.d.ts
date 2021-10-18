import { providers } from 'ethers';
import { PrerenderProps } from 'types/content';
export declare const getUsers: (provider?: providers.Provider) => Promise<string[]>;
export declare const getBasicWalletDetails: (vanillaVersion: any, walletAddress: string, provider?: providers.Provider) => Promise<PrerenderProps>;
export declare const getVnlHolders: (provider?: providers.Provider) => Promise<string[]>;
