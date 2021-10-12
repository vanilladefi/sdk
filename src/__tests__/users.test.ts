import { parseUnits } from 'ethers/lib/utils'
import { vnlDecimals } from 'src/constants'
import { getBasicWalletDetails, getUsers, getVnlHolders } from 'src/users'
import { VanillaVersion } from 'types/general'

test('Fetch users', async () => {
  const users = await getUsers()
  expect(users.length).toBeGreaterThan(0)
}, 30000)

test('Fetch VNL holders', async () => {
  const users = await getVnlHolders()
  expect(users.length).toBeGreaterThan(0)
  const randomIndex = Math.floor(Math.random() * users.length)
  const walletDetails = await getBasicWalletDetails(
    VanillaVersion.V1_1,
    users[randomIndex],
  )
  expect(
    parseUnits(walletDetails.vnlBalance, vnlDecimals).toBigInt(),
  ).toBeGreaterThan(0)
}, 30000)
