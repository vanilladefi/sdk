import { Result } from '@ethersproject/abi'
import { ADDRESS_ZERO } from '@uniswap/v3-sdk'
import {
  contractAddresses,
  epoch,
  getBalance,
  getVanillaTokenContract,
  isAddress,
  Token,
  VanillaVersion,
  vnlDecimals,
} from '@vanilladefi/core-sdk'
import { TypedEvent } from '@vanilladefi/trade-contracts/typechain/openzeppelin/common'
import { ERC20 } from '@vanilladefi/trade-contracts/typechain/openzeppelin/ERC20'
import { ERC20__factory } from '@vanilladefi/trade-contracts/typechain/openzeppelin/factories/ERC20__factory'
import { ethers, providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { getVanillaTradeRouter } from './contracts'

interface VanillaPurchase {
  args?: Result
}

export type PrerenderProps = {
  walletAddress?: string | false
  vnlBalance?: string | null
  ethBalance?: string | null
  juiceBalance?: string | null
  initialTokens?: {
    v2?: Token[]
    v3?: Token[]
    userPositionsV3: Token[] | null
    userPositionsV2: Token[] | null
  }
  ethPrice?: number
  currentBlockNumber?: number
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
 * Gets all addresses that have purchased tokens via Vanilla
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that have interacted with Vanilla
 */
export const getUsers = async (
  provider?: providers.Provider,
): Promise<string[]> => {
  const users: string[] = []

  const vnlRouter = getVanillaTradeRouter(
    VanillaVersion.V1_1,
    provider || providers.getDefaultProvider(),
  )
  const vnlLegacyRouter = getVanillaTradeRouter(
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
 * Gets a list of $VNL holders
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that hold $VNL
 */
export const getVnlHolders = async (
  provider?: providers.Provider,
): Promise<string[]> => {
  const vnlToken = ERC20__factory.connect(
    contractAddresses.vanilla[VanillaVersion.V1_1]?.vnl || '',
    provider || providers.getDefaultProvider(),
  )
  const vnlRouter = getVanillaTradeRouter(
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
