import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVanillaV1Safelist01, IVanillaV1Safelist01Interface } from "../IVanillaV1Safelist01";
export declare class IVanillaV1Safelist01__factory {
    static readonly abi: ({
        inputs: never[];
        name: string;
        type: string;
        anonymous?: undefined;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
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
        anonymous?: undefined;
    })[];
    static createInterface(): IVanillaV1Safelist01Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVanillaV1Safelist01;
}
