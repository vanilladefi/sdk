import { Token } from '@vanilladefi/core-sdk'
import { BigNumber, ContractTransaction, ethers } from 'ethers'
import { getJuiceStakingContract } from './contracts'
import { LeaderBoard, Options, Stake, StakeInfo } from './types/general'
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
): Promise<BigNumber> => {
  const contract = getJuiceStakingContract(options)
  const deltaByToken: Record<string, BigNumber> = {}
  const latestUnstakeByToken: { [token: string]: number } = {}
  let delta = BigNumber.from(0)

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
        !latestUnstakeByToken[token] ||
        latestUnstakeByToken[token] < blockNumber
      ) {
        latestUnstakeByToken[token] = blockNumber
      }
    }
  })

  // TODO: Currently the function might result in an edge case where it might be unfair for users that have staked right after 'from' block height against users that haven't. How to tackle this?

  // Then, remove the original stakes from the delta
  if (Object.keys(deltaByToken).length > 0) {
    const stakes: ethers.Event[] | TypedEvent<any[]>[] =
      await contract.queryFilter(stakeFilter, from, to)

    stakes.forEach((event) => {
      if (event?.args && event?.blockNumber) {
        const { args, blockNumber } = event
        const { unstakedDiff, token } = args
        // Don't include restakes after last unstake in delta
        if (
          Object.keys(deltaByToken).includes(token) &&
          latestUnstakeByToken[token] > blockNumber
        ) {
          deltaByToken[token] = deltaByToken[token].add(unstakedDiff)
        }
      }
    })

    delta = Object.values(deltaByToken).reduce((_previous, _current) =>
      _previous.add(_current),
    )
  }

  return delta
}

export const getLeaderboard = async (
  from?: string | number,
  to?: string | number,
  limit = 10,
  options?: Options,
): Promise<LeaderBoard> => {
  const users = await getUsers(from, to, options)
  let juiceDeltas: LeaderBoard = await Promise.all(
    Array.from(users).map(async (user) => [
      user,
      await getUserJuiceDelta(user, from, to, options),
    ]),
  )
  juiceDeltas = juiceDeltas.sort((a, b) => {
    if (a[1].gt(b[1])) {
      return -1
    } else if (a[1].eq(b[1])) {
      return 0
    } else {
      return 1
    }
  })
  return juiceDeltas.slice(0, limit)
}
