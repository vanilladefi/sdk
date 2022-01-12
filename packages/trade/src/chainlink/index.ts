import { ethers, providers, Signer } from 'ethers'
import AggregatorABI from '../types/abis/ChainlinkAggregator.json'

export const getTokenPrice = async (
  address: string,
  signerOrProvider: Signer | providers.Provider,
) => {
  const priceFeed = new ethers.Contract(
    address,
    AggregatorABI,
    signerOrProvider,
  )
  const roundData = await priceFeed.latestRoundData()
  return roundData
}
