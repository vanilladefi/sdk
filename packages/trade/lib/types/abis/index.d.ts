declare type ABIInput = {
    indexed?: boolean;
    internalType: string;
    name: string;
    type: string;
};
declare type ABI = {
    type: string;
    inputs?: ABIInput[];
    anonymous?: boolean;
    stateMutability?: string;
    name?: string;
}[];
export default ABI;
