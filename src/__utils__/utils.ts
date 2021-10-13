import { providers } from 'ethers'
import { network } from 'src/constants'

jest.setTimeout(240000)

global.testProvider =
  process.env.RPC_URL &&
  process.env.RPC_URL.length > 0 &&
  process.env.RPC_URL[0] === 'w'
    ? new providers.WebSocketProvider(process.env.RPC_URL, network)
    : process.env.RPC_URL.length > 0 && process.env.RPC_URL[0] === 'h'
    ? new providers.JsonRpcProvider(process.env.RPC_URL, network)
    : providers.getDefaultProvider()
