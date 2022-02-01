import { getNetwork } from '@ethersproject/networks'
import { contractAddresses, VanillaVersion } from '@vanilladefi/core-sdk'
import { providers, Signer } from 'ethers'
import { IJuiceStaking__factory } from './types/juicenet/factories/IJuiceStaking__factory'
import { IJuiceStaking } from './types/juicenet/IJuiceStaking'

export const networks = {
  mainnet: getNetwork('matic'),
  testnet: getNetwork('maticmum'),
}

export const getJuiceStakingContract = (
  signerOrProvider?: Signer | providers.Provider,
): IJuiceStaking => {
  const contractAddress =
    contractAddresses.vanilla[VanillaVersion.V2]?.router || ''
  const usedProvider =
    signerOrProvider || providers.getDefaultProvider(networks.mainnet)
  return IJuiceStaking__factory.connect(contractAddress, usedProvider)
}
