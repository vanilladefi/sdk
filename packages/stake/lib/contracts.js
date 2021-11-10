import { getNetwork } from "@ethersproject/networks";
import { providers } from "ethers";
import { IJuiceStaking__factory } from "./types/juicenet/factories/IJuiceStaking__factory";
export const getJuiceStakingContract = (signerOrProvider) => {
    return IJuiceStaking__factory.connect(contractAddress, signerOrProvider || providers.getDefaultProvider(networks.mainnet));
};
export const contractAddress = "";
export const networks = {
    mainnet: getNetwork("matic"),
    testnet: getNetwork("maticmum"),
};
