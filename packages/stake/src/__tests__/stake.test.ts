import { formatUnits } from 'ethers/lib/utils'
import { getLeaderboard, getUserJuiceDelta } from '../stake'
import { testPolygonProvider } from '../__utils__/utils'

const hardhatTestAccount = '0x35434a35C19cabC4bD508Edf538cC1Cf33BDA688'
const testEpoch = 25346977
const contestEnd = 25454917
const testOptions = {
  polygonProvider: testPolygonProvider,
  optionalAddress: process.env.JUICE_ADDRESS,
}

test('Get user JUICE delta', async () => {
  const delta = await getUserJuiceDelta(
    hardhatTestAccount,
    testEpoch,
    contestEnd,
    true,
    testOptions,
  )
  expect(formatUnits(delta, 8)).not.toBe(0)

  const delta2 = await getUserJuiceDelta(
    hardhatTestAccount,
    testEpoch,
    contestEnd,
    false,
    testOptions,
  )
  console.log(delta.toString(), delta2.toString())
  expect(delta).toBeGtBN(delta2)
})

test('Get leaderboard', async () => {
  const limit = 5

  // Test that limiting the leaderboard to 5 users works
  const leaderboard = await getLeaderboard(
    contestEnd - 50000,
    contestEnd,
    limit,
    true,
    testOptions,
  )
  expect(leaderboard.length).toBe(limit)

  // Test that leaderboard is in descending order
  let previous = leaderboard[0]
  leaderboard.slice(1).forEach((user) => {
    expect(previous.delta).toBeGtBN(user.delta)
    previous = user
  })
})
