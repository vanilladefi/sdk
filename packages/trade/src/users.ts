import { Result } from '@ethersproject/abi'
import { formatUnits } from '@ethersproject/units'
import { ADDRESS_ZERO } from '@uniswap/v3-sdk'
import { ethers, providers } from 'ethers'
import {
  contractAddresses,
  epoch,
  getVanillaRouter,
  getVanillaTokenContract,
  vnlDecimals,
} from './contracts'
import { getBalance, isAddress } from './tokens'
import { PrerenderProps } from './types/content'
import { VanillaVersion } from './types/general'

interface VanillaPurchase {
  args?: Result
}

/**
 * Gets all addresses that have purchased tokens via Vanilla
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that have interacted with Vanilla
 */
export const getUsers = async (
  provider?: providers.Provider,
): Promise<string[]> => {
  const users: string[] = []

  const vnlRouter = getVanillaRouter(
    VanillaVersion.V1_1,
    provider || providers.getDefaultProvider(),
  )
  const vnlLegacyRouter = getVanillaRouter(
    VanillaVersion.V1_0,
    provider || providers.getDefaultProvider(),
  )

  // Fetch Vanilla v1.1 users
  const purchaseFilter: ethers.EventFilter = vnlRouter.filters.TokensPurchased()
  const events: ethers.Event[] | TypedEvent<any[]>[] =
    await vnlRouter.queryFilter(purchaseFilter, epoch)
  events.forEach((event: VanillaPurchase) => {
    const walletAddress = isAddress(event?.args?.buyer)
    if (walletAddress && !users.includes(walletAddress)) {
      users.push(walletAddress)
    }
  })

  // Fetch Vanilla v1.0 users
  const legacyFilter: ethers.EventFilter =
    vnlLegacyRouter.filters.TokensPurchased()
  const legacyEvents: ethers.Event[] | TypedEvent<any[]>[] =
    await vnlLegacyRouter.queryFilter(legacyFilter, epoch)
  legacyEvents.forEach((event) => {
    const walletAddress = isAddress(event?.args?.buyer)
    if (walletAddress && !users.includes(walletAddress)) {
      users.push(walletAddress)
    }
  })

  return users
}

/**
 * Fetches the $VNL and $ETH balances for given address
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
): Promise<PrerenderProps> => {
  let [vnlBalance, ethBalance]: string[] = ['0', '0']
  const walletAddress = isAddress(address)
  try {
    if (walletAddress) {
      const vnl: ERC20 = getVanillaTokenContract(
        vanillaVersion,
        provider || providers.getDefaultProvider(),
      )
      vnlBalance = formatUnits(await vnl.balanceOf(walletAddress), vnlDecimals)
      ethBalance = formatUnits(
        await getBalance(
          walletAddress,
          provider || providers.getDefaultProvider(),
        ),
      )
    }
  } catch (e) {
    console.error(
      `getBasicWalletDetails failed for address ${walletAddress}: ${e}`,
    )
  }
  return { vnlBalance, ethBalance }
}

/**
 * Gets a list of $VNL holders
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that hold $VNL
 */
export const getVnlHolders = async (
  provider?: providers.Provider,
): Promise<string[]> => {
  const vnlToken = ERC20__factory.connect(
    contractAddresses.vanilla[VanillaVersion.V1_1].vnl,
    provider || providers.getDefaultProvider(),
  )
  const vnlRouter = getVanillaRouter(
    VanillaVersion.V1_1,
    provider || providers.getDefaultProvider(),
  )
  const epoch = await vnlRouter.epoch()

  const transferFilter: ethers.EventFilter = vnlToken.filters.Transfer()
  const events: ethers.Event[] = await vnlToken.queryFilter(
    transferFilter,
    epoch.toNumber(),
  )

  const vnlHolders = new Set<string>()

  events.forEach((event) => {
    event?.args?.from !== ADDRESS_ZERO && vnlHolders.add(event?.args?.from)
    event?.args?.to !== ADDRESS_ZERO && vnlHolders.add(event?.args?.to)
  })

  vnlHolders.forEach(async (holder) => {
    const balance = await vnlToken.balanceOf(holder)
    if (balance.isZero()) {
      vnlHolders.delete(holder)
    }
  })

  return Array.from(vnlHolders)
}
