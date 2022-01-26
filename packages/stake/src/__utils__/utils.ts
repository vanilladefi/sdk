import { providers } from 'ethers'
import { networks } from '../contracts'

jest.setTimeout(240000)

type TestProvider =
  | providers.BaseProvider
  | providers.JsonRpcProvider
  | providers.WebSocketProvider

export const testProvider: TestProvider =
  process?.env?.POLYGON_RPC_URL &&
  process?.env?.POLYGON_RPC_URL?.length > 0 &&
  process?.env?.POLYGON_RPC_URL[0] === 'w'
    ? new providers.WebSocketProvider(
        process?.env?.POLYGON_RPC_URL || '',
        networks.mainnet,
      )
    : process?.env?.POLYGON_RPC_URL &&
      process?.env?.POLYGON_RPC_URL?.length > 0 &&
      process?.env?.POLYGON_RPC_URL[0] === 'h'
    ? new providers.JsonRpcProvider(
        process?.env?.POLYGON_RPC_URL || '',
        networks.mainnet,
      )
    : providers.getDefaultProvider()
