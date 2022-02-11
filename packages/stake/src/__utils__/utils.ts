import { providers } from 'ethers'
import { networks } from '../contracts'

jest.setTimeout(240000)

type TestProvider =
  | providers.BaseProvider
  | providers.JsonRpcProvider
  | providers.WebSocketProvider

export const testPolygonProvider: TestProvider =
  process?.env?.POLYGON_RPC_URL &&
      process?.env?.POLYGON_RPC_URL?.length > 0 &&
      process?.env?.POLYGON_RPC_URL[0] === 'h'
    ? new providers.JsonRpcProvider(
        process?.env?.POLYGON_RPC_URL || '',
      )
    : providers.getDefaultProvider(networks.mainnet)

export const testEthereumProvider: TestProvider =
  process?.env?.RPC_URL &&
      process?.env?.RPC_URL?.length > 0 &&
      process?.env?.RPC_URL[0] === 'h'
    ? new providers.JsonRpcProvider(
        process?.env?.RPC_URL || '',
      )
    : providers.getDefaultProvider('homestead')
