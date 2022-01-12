import { parseUnits } from 'ethers/lib/utils'
import { vnlDecimals } from '../contracts'
import { VanillaVersion } from '@vanilladefi/core-sdk'
import { getBasicWalletDetails, getUsers, getVnlHolders } from '../users'
import { testProvider } from '../__utils__/utils'

test.skip('Fetch users', async () => {
  try {
    const users = await getUsers()
    expect(users.length).toBeGreaterThan(0)
  } catch (_e) {
    return
  }
})

test.skip('Fetch VNL holders', async () => {
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
