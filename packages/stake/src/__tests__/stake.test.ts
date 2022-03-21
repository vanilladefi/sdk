import { getLeaderboard, getUserJuiceDelta } from '../stake'
import { testPolygonProvider } from '../__utils__/utils'

const hardhatTestAccount = '0x35434a35C19cabC4bD508Edf538cC1Cf33BDA688'
const testEpoch = 24926408
const testOptions = {
  polygonProvider: testPolygonProvider,
  optionalAddress: process.env.JUICE_ADDRESS,
}

test('Get user JUICE delta', async () => {
  const delta = await getUserJuiceDelta(
    hardhatTestAccount,
    testEpoch,
    'latest',
    testOptions,
  )
  expect(delta.delta).toBeGtBN(0)
  expect(delta.relativeDelta).not.toBe(0)
})

test('Get leaderboard', async () => {
  const limit = 5
  const defaultLimit = 10

  // Test that limiting the leaderboard to 5 users works
  const leaderboard = await getLeaderboard(
    testEpoch,
    'latest',
    limit,
    testOptions,
  )
  expect(leaderboard.length).toBe(limit)

  // Test that the by default the leaderboard's size is 10
  const leaderboard2 = await getLeaderboard(
    testEpoch,
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
