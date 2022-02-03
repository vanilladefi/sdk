import { getNetwork, Network } from '@ethersproject/networks'
import {
  contractAddresses,
  getBalance,
  getVanillaTokenContract,
  isAddress,
  juiceDecimals,
  VanillaBalances,
  VanillaVersion,
  vnlDecimals,
} from '@vanilladefi/core-sdk'
import { ERC20 } from '@vanilladefi/trade-contracts/typechain/openzeppelin/ERC20'
import { providers, Signer } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
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

export const getJuiceStakingContract = (
  signerOrProvider?: Signer | providers.Provider,
): IJuiceStaking => {
  const contractAddress = isAddress(
    contractAddresses.vanilla[VanillaVersion.V2]?.router || '',
  )
  if (!contractAddress) {
    throw Error('Incorrect contract address for JUICE!')
  }
  const usedProvider =
    signerOrProvider || providers.getDefaultProvider(networks.mainnet)
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
  provider?: providers.Provider,
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
      const network: Network | false = provider
        ? await provider.getNetwork()
        : false

      if (network && network.chainId !== 137 && network.chainId !== 80001) {
        throw Error('Given provider is not connected to Polygon!')
      }
      const polygonProvider =
        provider || providers.getDefaultProvider(networks.mainnet)

      const vnl: ERC20 = getVanillaTokenContract(
        vanillaVersion,
        ethereumProvider,
      )
      const juice = getJuiceStakingContract(polygonProvider)

      vnlBalance = formatUnits(await vnl.balanceOf(walletAddress), vnlDecimals)
      ethBalance = formatUnits(
        await getBalance(walletAddress, ethereumProvider),
      )
      juiceBalance = formatUnits(
        await juice.unstakedBalanceOf(walletAddress),
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
