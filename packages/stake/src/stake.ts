import { Token } from '@vanilladefi/core-sdk'
import { ContractTransaction } from 'ethers'
import { getJuiceStakingContract } from './contracts'
import { Options, Stake, StakeInfo } from './types/general'

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
