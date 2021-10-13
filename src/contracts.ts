import { Contract, providers, Signer } from 'ethers'
import VanillaV1Router01 from 'types/abis/VanillaV1Router01.json'
import { VanillaVersion } from 'types/general'
import { ERC20 } from 'types/typechain/vanilla_v1.1/ERC20'
import { ERC20__factory } from 'types/typechain/vanilla_v1.1/factories/ERC20__factory'
import { VanillaV1Router02__factory } from 'types/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory'
import { VanillaV1Router02 } from 'types/typechain/vanilla_v1.1/VanillaV1Router02'
import constants from './constants'

export function getVanillaTokenContract(
  version: VanillaVersion,
  signerOrProvider?: Signer | providers.Provider,
): ERC20 {
  const address = constants.contractAddresses.vanilla[version].vnl
  return ERC20__factory.connect(
    address,
    signerOrProvider || providers.getDefaultProvider(),
  )
}

export function getVanillaRouter(
  version: VanillaVersion,
  signerOrProvider?: Signer | providers.Provider,
): Contract | VanillaV1Router02 {
  const routerAddress = constants.contractAddresses.vanilla[version].router
  const v1abi = VanillaV1Router01.abi
  return version === VanillaVersion.V1_1
    ? VanillaV1Router02__factory.connect(
        routerAddress,
        signerOrProvider || providers.getDefaultProvider(),
      )
    : new Contract(
        routerAddress,
        v1abi,
        signerOrProvider || providers.getDefaultProvider(),
      )
}

export const vnlPools = {
  ETH: '0xff6949065aebb4be59d30c970694a7495da0c0ff',
  USDC: '0x0aa719a08957bdf43d9c9f0b755edd1ca2b386f3',
}
