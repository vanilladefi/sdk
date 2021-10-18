import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVanillaV1MigrationTarget02, IVanillaV1MigrationTarget02Interface } from "../IVanillaV1MigrationTarget02";
export declare class IVanillaV1MigrationTarget02__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IVanillaV1MigrationTarget02Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVanillaV1MigrationTarget02;
}
