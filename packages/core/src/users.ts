import { Network } from '@ethersproject/networks'
import { getJuiceStakingContract } from '@vanilladefi/stake-sdk'
import { ERC20 } from '@vanilladefi/trade-contracts/typechain/openzeppelin/ERC20'
import { getVanillaTokenContract, juiceDecimals, vnlDecimals } from 'contracts'
import { providers } from 'ethers'
import { formatUnits, isAddress } from 'ethers/lib/utils'
import { getBalance } from 'index'
import { VanillaBalances, VanillaVersion } from 'types'

/**
 * Fetches the Vanilla-specific balances for given address
 *
 * @param vanillaVersion - Vanilla version
 * @param address - ethereum address
 * @param provider - an ethersjs provider (readonly)
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
      let [ethereumProvider, polygonProvider]: providers.Provider[] = [
        providers.getDefaultProvider('homestead'),
        providers.getDefaultProvider('matic'),
      ]
      const network: Network | false = provider
        ? await provider.getNetwork()
        : false

      switch (vanillaVersion) {
        case VanillaVersion.V1_0: {
          if (network && network.chainId !== 1) {
            throw Error(
              'Given provider is not connected to the Ethereum mainnet!',
            )
          }
          ethereumProvider =
            provider || providers.getDefaultProvider('homestead')
          break
        }
        case VanillaVersion.V1_1: {
          if (network && network.chainId !== 1) {
            throw Error(
              'Given provider is not connected to the Ethereum mainnet!',
            )
          }
          ethereumProvider =
            provider || providers.getDefaultProvider('homestead')
          break
        }
        case VanillaVersion.V2: {
          if (network && network.chainId !== 137 && network.chainId !== 80001) {
            throw Error('Given provider is not connected to Polygon!')
          }
          polygonProvider = provider || providers.getDefaultProvider('matic')
          break
        }
      }

      const vnl: ERC20 = getVanillaTokenContract(
        vanillaVersion,
        ethereumProvider,
      )
      const juice = getJuiceStakingContract(polygonProvider)

      vnlBalance = formatUnits(await vnl.balanceOf(address), vnlDecimals)
      ethBalance = formatUnits(await getBalance(address, ethereumProvider))

      if (vanillaVersion === VanillaVersion.V2) {
        juiceBalance = formatUnits(
          await juice.balanceOf(address),
          juiceDecimals,
        )
        maticBalance = formatUnits(await getBalance(address, polygonProvider))
      }
    }
  } catch (e) {
    console.error(
      `getBasicWalletDetails failed for address ${walletAddress}: ${e}`,
    )
  }
  return { vnlBalance, juiceBalance, ethBalance, maticBalance }
}
