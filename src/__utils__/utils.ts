import { providers } from 'ethers'
import { network } from 'src/constants'

jest.setTimeout(240000)

global.testProvider =
  process.env.RPC_URL && process.env.RPC_URL !== ''
    ? new providers.JsonRpcProvider(process.env.RPC_URL, network)
    : providers.getDefaultProvider()
