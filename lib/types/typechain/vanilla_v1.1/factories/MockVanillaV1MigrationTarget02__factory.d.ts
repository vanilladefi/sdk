import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockVanillaV1MigrationTarget02, MockVanillaV1MigrationTarget02Interface } from "../MockVanillaV1MigrationTarget02";
export declare class MockVanillaV1MigrationTarget02__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockVanillaV1MigrationTarget02>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockVanillaV1MigrationTarget02;
    connect(signer: Signer): MockVanillaV1MigrationTarget02__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610153806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80637616f4f314610030575b600080fd5b61004361003e3660046100c9565b610045565b005b604080516001600160a01b03808916825287166020820152908101859052606081018490526080810183905260a081018290527f9210241898c0a0aaf9556f5cc7340586c62f8525a91d2dd4f630dd3b3d133b4b9060c00160405180910390a1505050505050565b80356001600160a01b03811681146100c457600080fd5b919050565b60008060008060008060c087890312156100e1578182fd5b6100ea876100ad565b95506100f8602088016100ad565b95989597505050506040840135936060810135936080820135935060a090910135915056fea2646970667358221220e796314e84b3130b132c85c04c07ebdb6ef35426744a329a4b505e650b8a98f164736f6c63430008040033";
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
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): MockVanillaV1MigrationTarget02Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockVanillaV1MigrationTarget02;
}
