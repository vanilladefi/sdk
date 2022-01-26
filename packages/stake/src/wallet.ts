import { Signer } from 'ethers'
import { getJuiceStakingContract } from './contracts'

export const deposit = async (amount: string, signer: Signer) => {
  const contract = getJuiceStakingContract(signer)
  await contract.deposit(amount)
}

export const withdraw = async (amount: string, signer: Signer) => {
  const contract = getJuiceStakingContract(signer)
  await contract.withdraw(amount)
}
