import { getNetwork, Network } from '@ethersproject/networks'
import {
  contractAddresses,
  getBalance,
  isAddress,
  juiceDecimals,
  VanillaBalances,
  VanillaVersion,
  vnlDecimals,
} from '@vanilladefi/core-sdk'
import { providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { Options } from './types/general'
import { ERC20 } from './types/juicenet/ERC20'
import { ERC20__factory } from './types/juicenet/factories/ERC20__factory'
import { IJuiceStaking__factory } from './types/juicenet/factories/IJuiceStaking__factory'
import { IJuiceStaking } from './types/juicenet/IJuiceStaking'

export const networks = {
  mainnet: {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers: {
      JsonRpcProvider: new (arg0: string) => any
    }) =>
      new providers.JsonRpcProvider('https://matic-mainnet.chainstacklabs.com'),
  },
  testnet: {
    name: 'maticmum',
    chainId: 80001,
    _defaultProvider: (providers: {
      JsonRpcProvider: new (arg0: string) => any
    }) => new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com'),
  },
}

export const getJuiceStakingContract = (options?: Options): IJuiceStaking => {
  const contractAddress = isAddress(
    options?.optionalAddress ||
      contractAddresses.vanilla[VanillaVersion.V2]?.router ||
      '',
  )
  if (!contractAddress) {
    throw Error('Incorrect contract address for JUICE!')
  }
  const usedProvider =
    options?.signerOrProvider || providers.getDefaultProvider(networks.mainnet)
  return IJuiceStaking__factory.connect(contractAddress, usedProvider)
}

/**
 * Fetches the Vanilla-specific balances for given address
 *
 * @param vanillaVersion - Vanilla version
 * @param address - ethereum address
 * @param provider - an ethersjs provider (readonly). Recommended to be set at all times so that the application is in control of the used network.
 * @returns addresses $VNL and $ETH balance
 */
export const getBasicWalletDetails = async (
  vanillaVersion: VanillaVersion,
  address: string,
  options: Options,
): Promise<VanillaBalances> => {
  let [vnlBalance, juiceBalance, ethBalance, maticBalance]: string[] = [
    '0',
    '0',
    '0',
    '0',
  ]
  const walletAddress = isAddress(address)

  try {
    if (walletAddress) {
      const ethereumProvider = providers.getDefaultProvider(
        getNetwork('homestead'),
      )
      const network: Network | false = options?.provider
        ? await options?.provider.getNetwork()
        : false

      if (network && network.chainId !== 137 && network.chainId !== 80001) {
        throw Error('Given provider is not connected to Polygon!')
      }
      const polygonProvider =
        options?.provider || providers.getDefaultProvider(networks.mainnet)

      const vnl: ERC20 = ERC20__factory.connect(
        contractAddresses.vanilla[VanillaVersion.V2].vnl || '',
        ethereumProvider,
      )
      const juice: ERC20 = ERC20__factory.connect(
        options?.optionalAddress ||
          contractAddresses.vanilla[VanillaVersion.V2].router,
        polygonProvider,
      )

      vnlBalance = formatUnits(await vnl.balanceOf(walletAddress), vnlDecimals)
      ethBalance = formatUnits(
        await getBalance(walletAddress, ethereumProvider),
      )
      juiceBalance = formatUnits(
        await juice.balanceOf(walletAddress),
        juiceDecimals,
      )
      maticBalance = formatUnits(
        await getBalance(walletAddress, polygonProvider),
      )
    }
  } catch (e) {
    console.error(
      `getBasicWalletDetails failed for address ${walletAddress}: ${e}`,
    )
  }
  return { vnlBalance, juiceBalance, ethBalance, maticBalance }
}
