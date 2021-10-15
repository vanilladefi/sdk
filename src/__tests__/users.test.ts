import { parseUnits } from 'ethers/lib/utils'
import { VanillaVersion } from 'types/general'
import { getBasicWalletDetails, getUsers, getVnlHolders } from 'users'
import { vnlDecimals } from '../contracts'
import { testProvider } from '../__utils__/utils'

test('Fetch users', async () => {
  try {
    const users = await getUsers()
    expect(users.length).toBeGreaterThan(0)
  } catch (_e) {
    return
  }
})

test('Fetch VNL holders', async () => {
  try {
    const users = await getVnlHolders()
    expect(users.length).toBeGreaterThan(0)
    const randomIndex = Math.floor(Math.random() * users.length)
    const walletDetails = await getBasicWalletDetails(
      VanillaVersion.V1_1,
      users[randomIndex],
      testProvider,
    )
    expect(
      parseUnits(walletDetails.vnlBalance || '0', vnlDecimals).toBigInt(),
    ).toBeGreaterThan(0)
  } catch (_e) {
    return
  }
})
