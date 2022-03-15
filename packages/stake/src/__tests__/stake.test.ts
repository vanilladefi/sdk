import { epoch } from '@vanilladefi/core-sdk'
import { formatUnits } from 'ethers/lib/utils'
import { getLeaderboard, getUserJuiceDelta } from '../stake'
import { testPolygonProvider } from '../__utils__/utils'

const hardhatTestAccount = '0x35434a35C19cabC4bD508Edf538cC1Cf33BDA688'
const testOptions = {
  polygonProvider: testPolygonProvider,
  optionalAddress: process.env.JUICE_ADDRESS,
}

test('Get user JUICE delta', async () => {
  const delta = await getUserJuiceDelta(
    hardhatTestAccount,
    epoch,
    'latest',
    testOptions,
  )
  expect(formatUnits(delta, 8)).not.toBe(0)
})

test('Get leaderboard', async () => {
  const limit = 5
  const defaultLimit = 10

  // Test that limiting the leaderboard to 5 users works
  const leaderboard = await getLeaderboard(epoch, 'latest', limit, testOptions)
  expect(leaderboard.length).toBe(limit)

  // Test that the by default the leaderboard's size is 10
  const leaderboard2 = await getLeaderboard(
    epoch,
    'latest',
    undefined,
    testOptions,
  )
  expect(leaderboard2.length).toBe(defaultLimit)

  // Test that leaderboard is in descending order
  let previous = leaderboard2[0]
  leaderboard2.slice(1).forEach((user) => {
    expect(previous.delta).toBeGtBN(user.delta)
    previous = user
  })
})
