import { providers, Signer } from "ethers";
import { IJuiceStaking } from "./types/juicenet/IJuiceStaking";
export declare const getJuiceStakingContract: (signerOrProvider?: providers.Provider | Signer | undefined) => IJuiceStaking;
export declare const contractAddress = "";
export declare const networks: {
    mainnet: providers.Network;
    testnet: providers.Network;
};
