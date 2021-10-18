import { Contract, providers, Signer } from 'ethers';
import { VanillaVersion } from 'types/general';
import { ERC20 } from 'types/typechain/vanilla_v1.1/ERC20';
import { VanillaV1Router02 } from 'types/typechain/vanilla_v1.1/VanillaV1Router02';
export declare function getVanillaTokenContract(version: VanillaVersion, signerOrProvider?: Signer | providers.Provider): ERC20;
export declare function getVanillaRouter(version: VanillaVersion, signerOrProvider?: Signer | providers.Provider): Contract | VanillaV1Router02;
export declare const vnlPools: {
    ETH: string;
    USDC: string;
};
