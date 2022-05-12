import { epoch, Token } from '@vanilladefi/core-sdk'
import { BigNumber, ContractTransaction, ethers } from 'ethers'
import { getJuiceStakingContract } from './contracts'
import { LeaderBoard, Options, Stake, StakeInfo } from './types/general'
import { TypedEvent } from './types/juicenet/common'
import { getUsers } from './users'
import { parseBlockTagToBlockNumber } from './utils'

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

/**
 * Fetches an individual user's JUICE delta in given block interval.
 *
 * @param userAddress
 * @param from
 * @param to
 * @param options
 * @returns User's JUICE delta as a BigNumber.
 */
export const getUserJuiceDelta = async (
  userAddress: string,
  from?: string | number,
  to?: string | number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trimPreviousStake = true,
  options?: Options,
): Promise<BigNumber> => {
  const parsedFrom = await parseBlockTagToBlockNumber(from || epoch, options)
  const parsedTo = await parseBlockTagToBlockNumber(to || 'latest', options)
  const blockThreshold = options?.blockThreshold || 1000

  const contract = getJuiceStakingContract(options)
  const deltaByToken: Record<string, BigNumber> = {}
  let delta = BigNumber.from(0)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stakeFilter: ethers.EventFilter =
    contract.filters.StakeAdded(userAddress)
  const unStakeFilter: ethers.EventFilter =
    contract.filters.StakeRemoved(userAddress)

  // Split requests to ranges because of RPCs having block depth limits
  const ranges: Array<{ startBlock: number; endBlock: number }> = []
  let startBlock = parsedFrom
  let endBlock =
    parsedTo > startBlock + blockThreshold
      ? startBlock + blockThreshold
      : parsedTo
  let oldEndBlock = endBlock
  while (endBlock < parsedTo - blockThreshold) {
    ranges.push({ startBlock, endBlock })
    oldEndBlock = endBlock
    endBlock =
      endBlock + blockThreshold > parsedTo
        ? parsedTo
        : endBlock + blockThreshold
    startBlock = oldEndBlock + 1
  }
  ranges.push({ startBlock, endBlock })

  const unStakes: ethers.Event[] | TypedEvent<any[]>[] = (
    await Promise.all(
      ranges.map((range) =>
        contract.queryFilter(unStakeFilter, range.startBlock, range.endBlock),
      ),
    )
  ).flat()

  // First, filter every realized JUICE profit
  unStakes.forEach((event) => {
    if (event?.args && event?.blockNumber) {
      const { args } = event
      const { unstakedDiff, token } = args

      if (deltaByToken[token]) {
        deltaByToken[token] = deltaByToken[token].add(unstakedDiff)
      } else {
        deltaByToken[token] = unstakedDiff
      }
    }
  })

  if (Object.keys(deltaByToken).length > 0) {
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
  trimPreviousStake = true,
  options?: Options,
): Promise<LeaderBoard> => {
  const users = await getUsers(from, to, options)
  let juiceDeltas: LeaderBoard = await Promise.all(
    Array.from(users).map(async (user) => ({
      user: user,
      delta: await getUserJuiceDelta(
        user,
        from,
        to,
        trimPreviousStake,
        options,
      ),
    })),
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
