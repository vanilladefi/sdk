import { providers } from 'ethers'
import { isHexString } from 'ethers/lib/utils'
import { networks } from './contracts'
import { Options } from './types/general'

export const parseBlockTagToBlockNumber = async (
  blockTag: string | number,
  options?: Options,
): Promise<number> => {
  let blockNumber = 0
  let latestBlockNumber = 0
  const polygonProvider =
    options?.polygonProvider || providers.getDefaultProvider(networks.mainnet)

  if (blockTag === 'latest' || blockTag < 0) {
    latestBlockNumber = await polygonProvider.getBlockNumber()
  }

  if (isHexString(blockTag)) {
    blockNumber = parseInt(String(blockTag), 16)
  } else if (blockTag === 'latest') {
    blockNumber = latestBlockNumber
  } else if (typeof blockTag === 'number') {
    if (blockTag < 0) {
      blockNumber = blockTag + latestBlockNumber
    } else {
      blockNumber = blockTag
    }
  }

  return blockNumber
}
