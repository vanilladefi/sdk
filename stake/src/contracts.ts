import { providers, Signer } from "ethers"
import { IJuiceStaking__factory } from "./types/juicenet/factories/IJuiceStaking__factory"
import { IJuiceStaking } from "./types/juicenet/IJuiceStaking"

export function getJuiceStakingContract(
    address: string,
    signerOrProvider?: Signer | providers.Provider
  ): IJuiceStaking {
    return IJuiceStaking__factory.connect(
        address,
        signerOrProvider || providers.getDefaultProvider(),
    )
}