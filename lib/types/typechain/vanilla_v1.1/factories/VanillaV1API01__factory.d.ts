import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { VanillaV1API01, VanillaV1API01Interface } from "../VanillaV1API01";
export declare class VanillaV1API01__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): VanillaV1API01Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): VanillaV1API01;
}
