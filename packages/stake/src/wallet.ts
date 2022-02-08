import { Signer } from 'ethers'
import { getJuiceStakingContract } from './contracts'

export const deposit = async (amount: string, signer: Signer) => {
  const contract = getJuiceStakingContract({ signerOrProvider: signer })
  await contract.deposit(amount)
}

export const withdraw = async (amount: string, signer: Signer) => {
  const contract = getJuiceStakingContract({ signerOrProvider: signer })
  await contract.withdraw(amount)
}
