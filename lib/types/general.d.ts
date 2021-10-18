import { TransactionDetails } from './trade';
export declare type ChainId = '1' | '2' | '3' | '4' | '42' | '1337';
export declare type ChainIdToTransactionMapping = {
    [chainId in ChainId]: {
        [transactionKey: string]: TransactionDetails;
    };
};
export declare enum VanillaVersion {
    V1_0 = "v1_0",
    V1_1 = "v1_1"
}
export declare enum UniswapVersion {
    v2 = "v2",
    v3 = "v3"
}
export declare type TokenQueryVariables = {
    blockNumber?: number | null;
    weth: string;
    tokenAddresses: string[];
    poolAddresses?: string[] | null;
};
