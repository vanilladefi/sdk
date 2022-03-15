import { epoch } from '@vanilladefi/core-sdk'
import { ethers } from 'ethers'
import { getJuiceStakingContract } from './contracts'
import { Options } from './types/general'
import { TypedEvent } from './types/juicenet/common'

export const getUsers = async (
  from: string | number = epoch,
  to?: string | number,
  options?: Options,
): Promise<Set<string>> => {
  const contract = getJuiceStakingContract(options)
  const users: Set<string> = new Set()

  const stakeFilter: ethers.EventFilter = contract.filters.StakeAdded()
  const stakes: ethers.Event[] | TypedEvent<any[]>[] =
    await contract.queryFilter(stakeFilter, from, to)

  stakes.forEach((event) => {
    users.add(event?.args?.user)
  })

  return users
}
