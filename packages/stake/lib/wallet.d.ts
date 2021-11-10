import { Signer } from "ethers";
export declare const deposit: (amount: string, signer: Signer) => Promise<void>;
export declare const withdraw: (amount: string, signer: Signer) => Promise<void>;
