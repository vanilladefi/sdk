import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { VanillaV1Constants02, VanillaV1Constants02Interface } from "../VanillaV1Constants02";
export declare class VanillaV1Constants02__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): VanillaV1Constants02Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): VanillaV1Constants02;
}
