import { providers } from 'ethers'
import { network } from '../contracts'

jest.setTimeout(240000)

type TestProvider =
  | providers.BaseProvider
  | providers.JsonRpcProvider
  | providers.WebSocketProvider

export const testProvider: TestProvider =
  process?.env?.RPC_URL &&
  process?.env?.RPC_URL?.length > 0 &&
  process?.env?.RPC_URL[0] === 'w'
    ? new providers.WebSocketProvider(process?.env?.RPC_URL || '', network)
    : process?.env?.RPC_URL &&
      process?.env?.RPC_URL?.length > 0 &&
      process?.env?.RPC_URL[0] === 'h'
    ? new providers.JsonRpcProvider(process?.env?.RPC_URL || '', network)
    : providers.getDefaultProvider()
