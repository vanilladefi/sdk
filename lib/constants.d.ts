import { FeeAmount } from '@uniswap/v3-sdk';
import { providers } from 'ethers';
import { UniswapVersion, VanillaVersion } from 'types/general';
export declare const contractAddresses: {
    vanilla: {
        [version in VanillaVersion]: {
            router: string;
            vnl: string;
        };
    };
    uniswap: {
        [version in UniswapVersion]: {
            router: string;
            quoter?: string;
        };
    };
};
export declare const usdcWethPoolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
export declare const vnlDecimals = 12;
export declare const epoch = 12134736;
export declare const chainId = 1;
export declare const network: providers.Networkish;
export declare const hiddenTokens: string[];
export declare function getFeeTier(input: string | number | null | undefined): FeeAmount | undefined;
export declare const blockDeadlineThreshold = 60000;
export declare const conservativeGasLimit = 800000;
export declare const conservativeMigrationGasLimit = 120000;
export declare const ethersOverrides: {
    gasLimit: number;
};
