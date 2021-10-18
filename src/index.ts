import * as contracts from './contracts'
import * as ipfs from './ipfs'
import * as migration from './migration'
import * as tokens from './tokens'
import * as trades from './trades'
import * as users from './users'

export default {
  ...contracts,
  ...ipfs,
  ...migration,
  ...tokens,
  ...trades,
  ...users,
}
