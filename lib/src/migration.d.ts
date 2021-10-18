import { BigNumber } from 'ethers';
import { MerkleTree } from 'merkletreejs';
export declare type SnapshotState = {
    blockNumber: number;
    timeStamp: number;
    conversionDeadline: number;
    accounts: {
        [address: string]: BigNumber;
    };
};
export declare type AddressBalance = {
    address: string;
    amount: BigNumber;
};
export declare const toKeccak256Leaf: (balance: AddressBalance) => string;
export declare const snapshot: (token01: any, token02: any) => Promise<{
    snapshotState: SnapshotState;
    getProof: (balance: AddressBalance) => string[];
    verify: (balance: AddressBalance, root: string) => boolean;
    root: string;
    merkleTree: MerkleTree;
}>;
