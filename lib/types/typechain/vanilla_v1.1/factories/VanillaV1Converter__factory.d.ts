import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { VanillaV1Converter, VanillaV1ConverterInterface } from "../VanillaV1Converter";
export declare class VanillaV1Converter__factory {
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
    static createInterface(): VanillaV1ConverterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): VanillaV1Converter;
}
