import { getNetwork } from '@ethersproject/networks'
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
import { ERC20Upgradeable } from './types/juicenet/ERC20Upgradeable'
import { ERC20Upgradeable__factory } from './types/juicenet/factories/ERC20Upgradeable__factory'
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
  local: {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers: {
      JsonRpcProvider: new (arg0: string) => any
    }) => new providers.JsonRpcProvider('https://localhost:8545'),
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
    options?.signerOrProvider ||
    options?.polygonProvider ||
    providers.getDefaultProvider(networks.mainnet)
  return IJuiceStaking__factory.connect(contractAddress, usedProvider)
}

/**
 * Fetches the Vanilla-specific balances for given address
 *
 * @param address - An Ethereum address
 * @param options - A Vanilla Juicenet options object, enables specifying custom RPCs etc.
 * @returns addresses $VNL and $ETH balance
 */
export const getBasicWalletDetails = async (
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
      const ethereumProvider =
        options?.ethereumProvider ||
        providers.getDefaultProvider(getNetwork('homestead'))
      const polygonProvider =
        options?.polygonProvider ||
        providers.getDefaultProvider(networks.mainnet)

      const vnl: ERC20Upgradeable = ERC20Upgradeable__factory.connect(
        contractAddresses.vanilla[VanillaVersion.V2].vnl || '',
        ethereumProvider,
      )
      const juice: ERC20Upgradeable = ERC20Upgradeable__factory.connect(
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
