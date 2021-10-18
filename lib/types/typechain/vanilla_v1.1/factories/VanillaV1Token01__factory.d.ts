import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { VanillaV1Token01, VanillaV1Token01Interface } from "../VanillaV1Token01";
export declare class VanillaV1Token01__factory {
    static readonly abi: ({
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
    static createInterface(): VanillaV1Token01Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): VanillaV1Token01;
}
