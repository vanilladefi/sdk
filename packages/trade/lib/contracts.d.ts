import { FeeAmount } from '@uniswap/v3-sdk';
import { ERC20 } from '@vanilladefi/trade-contracts/typechain/openzeppelin/ERC20';
import { VanillaV1Router02 } from '@vanilladefi/trade-contracts/typechain/vanilla_v1.1/VanillaV1Router02';
import { Contract, providers, Signer } from 'ethers';
import { UniswapVersion, VanillaVersion } from '@vanilladefi/core-sdk';
/**
 * Returns an instance of a $VNL ERC-20 token contract
 * based on the Vanilla version.
 *
 * @param version Version of Vanilla, so that interfacing with legacy tokens is possible.
 * @param signerOrProvider ethersjs signer(read/write) or provider(readonly).
 * @returns ERC-20 token contract instance with transactional capability
 */
export declare function getVanillaTokenContract(version: VanillaVersion, signerOrProvider?: Signer | providers.Provider): ERC20;
/**
 * Returns an instance of a Vanilla trade router contract based on the Vanilla
 * version.
 *
 * @param version Version of Vanilla, so that interfacing with legacy tokens is possible.
 * @param signerOrProvider ethersjs signer(read/write) or provider(readonly).
 * @returns Vanilla router contract instance with transactional capability
 */
export declare function getVanillaTradeRouter(version: VanillaVersion, signerOrProvider?: Signer | providers.Provider): Contract | VanillaV1Router02;
/**
 * $VNL pools on Uniswap with the most liquidity
 */
export declare const vnlPools: {
    ETH: string;
    USDC: string;
};
/**
 * Addresses of deployed Vanilla contracts
 */
export declare const tradeContractAddresses: {
    vanilla: {
        [version in VanillaVersion]?: {
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
/**
 * The Uniswap v3 pool address for checking WETH/USDC price
 */
export declare const usdcWethPoolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
/**
 * Decimal points used in $VNL
 */
export declare const vnlDecimals = 12;
/**
 * The block number of the first Vanilla v1.0 deployment. Used for calculating HTRS
 */
export declare const epoch = 12134736;
/**
 * Chain ID where Vanilla resides
 */
export declare const chainId = 1;
/**
 * A network definition used in ethersjs
 */
export declare const network: providers.Networkish;
/**
 * Vanilla v1.0 hidden tokens. Currently: Ampleforth
 */
export declare const hiddenTokens: string[];
/**
 * Matches a given Uniswap v3 pool fee tier with an enum and returns it
 *
 * @param input ['500', '3000', '10000'], the default fee tiers of Uniswap v3 pools.
 * @returns enum FeeAmount.[LOW, MEDIUM, HIGH] | undefined
 */
export declare function getFeeTier(input: string | number | null | undefined): FeeAmount | undefined;
/**
 * A trade deadline for submitted trades. 10 minutes by default.
 */
export declare const blockDeadlineThreshold = 60000;
/**
 * Conservative gas limit to use for Uniswap v2/v3 trades.
 */
export declare const conservativeGasLimit = 800000;
/**
 * Conservative gas limit to use for $VNL token migration
 */
export declare const conservativeMigrationGasLimit = 120000;
/**
 * Ethersjs overrides if estimates fail
 */
export declare const ethersOverrides: {
    gasLimit: number;
};
