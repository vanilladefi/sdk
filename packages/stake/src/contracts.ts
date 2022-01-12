import { getNetwork } from '@ethersproject/networks'
import { providers, Signer } from 'ethers'
import { IJuiceStaking__factory } from './types/juicenet/factories/IJuiceStaking__factory'
import { IJuiceStaking } from './types/juicenet/IJuiceStaking'

export const getJuiceStakingContract = (
  signerOrProvider?: Signer | providers.Provider,
): IJuiceStaking => {
  return IJuiceStaking__factory.connect(
    contractAddress,
    signerOrProvider || providers.getDefaultProvider(networks.mainnet),
  )
}

export const contractAddress = ''

export const networks = {
  mainnet: getNetwork('matic'),
  testnet: getNetwork('maticmum'),
}
