import { BigNumber } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import { VanillaV1Token01 } from 'types/typechain/vanilla_v1.1/VanillaV1Token01';
import { VanillaV1Token02 } from 'types/typechain/vanilla_v1.1/VanillaV1Token02';
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
export declare const snapshot: (token01: VanillaV1Token01, token02: VanillaV1Token02) => Promise<{
    snapshotState: SnapshotState;
    getProof: (balance: AddressBalance) => string[];
    verify: (balance: AddressBalance, root: string) => boolean;
    root: string;
    merkleTree: MerkleTree;
}>;
