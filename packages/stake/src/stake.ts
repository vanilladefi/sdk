import { contractAddresses, Token, VanillaVersion } from '@vanilladefi/core-sdk'
import { BigNumber, ContractTransaction, ethers, providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { getJuiceStakingContract, networks } from './contracts'
import {
  LeaderBoard,
  Options,
  Stake,
  StakeInfo,
  StakePerformance,
} from './types/general'
import { ERC20Upgradeable, ERC20Upgradeable__factory } from './types/juicenet'
import { TypedEvent } from './types/juicenet/common'
import { getUsers } from './users'

export const getCurrentStake = async (
  userAddress: string,
  tokenAddress: string,
  options: Options,
): Promise<StakeInfo> => {
  const contract = getJuiceStakingContract(options)
  const currentStake = await contract.currentStake(userAddress, tokenAddress)
  return currentStake
}

export const getAllStakes = async (
  userAddress: string,
  tokens: Token[],
  options: Options,
): Promise<StakeInfo[]> => {
  const contract = getJuiceStakingContract(options)
  const stakes = Promise.all(
    tokens.map((token) => contract.currentStake(userAddress, token.address)),
  )
  return stakes
}

export const modifyStakes = async (
  stakes: Stake[],
  options: Options,
): Promise<ContractTransaction> => {
  const contract = getJuiceStakingContract(options)
  return contract.modifyStakes(stakes)
}

export const modifyStake = async (stake: Stake, options: Options) => {
  return modifyStakes([stake], options)
}

export const getUserJuiceDelta = async (
  userAddress: string,
  from?: string | number,
  to?: string | number,
  options?: Options,
): Promise<StakePerformance> => {
  const contract = getJuiceStakingContract(options)
  const juice: ERC20Upgradeable = ERC20Upgradeable__factory.connect(
    options?.optionalAddress ||
      contractAddresses.vanilla[VanillaVersion.V2].router,
    options?.polygonProvider || providers.getDefaultProvider(networks.mainnet),
  )

  const deltaByToken: Record<string, BigNumber> = {}
  const latestUnstakeByToken: Record<string, number> = {}
  const firstUnstakeByToken: Record<string, number> = {}

  let delta = BigNumber.from(0)
  let relativeDelta = 0.0

  const stakeFilter: ethers.EventFilter =
    contract.filters.StakeAdded(userAddress)
  const unStakeFilter: ethers.EventFilter =
    contract.filters.StakeRemoved(userAddress)

  const unStakes: ethers.Event[] | TypedEvent<any[]>[] =
    await contract.queryFilter(unStakeFilter, from, to)

  // First, filter every realized JUICE profit
  unStakes.forEach((event) => {
    if (event?.args && event?.blockNumber) {
      const { args, blockNumber } = event
      const { unstakedDiff, token } = args

      if (deltaByToken[token]) {
        deltaByToken[token] = deltaByToken[token].add(unstakedDiff)
      } else {
        deltaByToken[token] = unstakedDiff
      }

      if (
        !firstUnstakeByToken[token] ||
        firstUnstakeByToken[token] > blockNumber
      ) {
        firstUnstakeByToken[token] = blockNumber
      }

      if (
        !latestUnstakeByToken[token] ||
        latestUnstakeByToken[token] < blockNumber
      ) {
        latestUnstakeByToken[token] = blockNumber
      }
    }
  })

  // Then, remove the original stakes from the delta
  if (Object.keys(deltaByToken).length > 0) {
    const stakes: ethers.Event[] | TypedEvent<any[]>[] =
      await contract.queryFilter(stakeFilter, from, to)

    stakes.forEach((event) => {
      if (event?.args && event?.blockNumber) {
        const { args, blockNumber } = event
        const { unstakedDiff, token } = args
        // Don't include stakes before the first unstake or restakes after last unstake in delta
        if (
          Object.keys(deltaByToken).includes(token) &&
          firstUnstakeByToken[token] < blockNumber &&
          latestUnstakeByToken[token] > blockNumber
        ) {
          deltaByToken[token] = deltaByToken[token].add(unstakedDiff)
        }
      }
    })

    delta = Object.values(deltaByToken).reduce((_previous, _current) =>
      _previous.add(_current),
    )

    const firstUnstake = Math.min(...Object.values(firstUnstakeByToken))
    const unstakedBalance = await contract.unstakedBalanceOf(userAddress, {
      blockTag: firstUnstake - 1,
    })
    const userBalance = await juice.balanceOf(userAddress, {
      blockTag: firstUnstake - 1,
    })
    const startingBalance = unstakedBalance.add(userBalance)

    relativeDelta =
      !delta.isZero() && !startingBalance.isZero()
        ? Number(formatUnits(delta.mul(1000).div(startingBalance), 3))
        : 0

    console.log(
      'startingBalance: ',
      startingBalance.toString(),
      ' delta: ',
      delta.toString(),
      ' relativeDelta: ',
      relativeDelta,
    )
  }

  return { user: userAddress, delta, relativeDelta }
}

export const getLeaderboard = async (
  from?: string | number,
  to?: string | number,
  limit = 10,
  options?: Options,
): Promise<LeaderBoard> => {
  const users = await getUsers(from, to, options)
  let juiceDeltas: LeaderBoard = await Promise.all(
    Array.from(users).map(
      async (user) => await getUserJuiceDelta(user, from, to, options),
    ),
  )
  juiceDeltas = juiceDeltas.sort((a, b) => {
    if (a.delta.gt(b.delta)) {
      return -1
    } else if (a.delta.eq(b.delta)) {
      return 0
    } else {
      return 1
    }
  })
  return juiceDeltas.slice(0, limit)
}
