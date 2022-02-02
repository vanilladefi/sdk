import { BigNumber, constants, Contract, providers, Signer } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

/**
 * Returns a checksummed version of the given address if it exists,
 * false if the given address is not correct.
 *
 * @param value - an Ethereum address
 * @returns a checksummed address or false
 */
export function isAddress(value: string): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

/**
 * Returns the ETH balance of given Ethereum address as a BigNumber (wei)
 *
 * @param address - Ethereum address
 * @param provider - an ethersjs provider with readonly access
 * @returns the ETH balance of given Ethereum address in wei as BigNumber
 */
export async function getBalance(
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> {
  const balance = await provider.getBalance(address)
  return balance
}

/**
 * Helper function for constructing arbitrary ethersjs contract instances
 *
 * @param address - contract address
 * @param ABI - The application binary interface of the contract
 * @param signerOrProvider - an ethersjs signer(read/write) or provider(readonly)
 * @returns a Contract instance with transactional capabilities
 */
export function getContract(
  address: string,
  ABI: any,
  signerOrProvider?: providers.Provider | Signer | undefined,
): Contract {
  if (!isAddress(address) || address === constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signerOrProvider)
}

export * from './contracts'
export * from './types'
