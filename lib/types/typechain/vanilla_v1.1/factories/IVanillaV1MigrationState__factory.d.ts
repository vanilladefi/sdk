import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVanillaV1MigrationState, IVanillaV1MigrationStateInterface } from "../IVanillaV1MigrationState";
export declare class IVanillaV1MigrationState__factory {
    static readonly abi: ({
        inputs: never[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IVanillaV1MigrationStateInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVanillaV1MigrationState;
}
