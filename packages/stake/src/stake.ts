import { BigNumber, ContractTransaction, providers, Signer } from 'ethers'
import { Token } from '@vanilladefi/core-sdk'
import { getJuiceStakingContract } from './contracts'
import { Stake } from './types/general'

export const getCurrentStake = async (
  userAddress: string,
  tokenAddress: string,
  signerOrProvider: Signer | providers.Provider,
): Promise<{ amount: BigNumber; sentiment: boolean }> => {
  const contract = getJuiceStakingContract(signerOrProvider)
  const currentStake = await contract.currentStake(userAddress, tokenAddress)
  return currentStake
}

export const getAllStakes = async (
  userAddress: string,
  tokens: Token[],
  signerOrProvider: Signer | providers.Provider,
): Promise<{ amount: BigNumber; sentiment: boolean }[]> => {
  const contract = getJuiceStakingContract(signerOrProvider)
  const stakes = Promise.all(
    tokens.map((token) => contract.currentStake(userAddress, token.address)),
  )
  return stakes
}

export const modifyStakes = async (
  stakes: Stake[],
  signer: Signer,
): Promise<ContractTransaction> => {
  const contract = getJuiceStakingContract(signer)
  return contract.modifyStakes(stakes)
}

export const modifyStake = async (stake: Stake, signer: Signer) => {
  return modifyStakes([stake], signer)
}
