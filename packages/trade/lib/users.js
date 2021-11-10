import { formatUnits } from '@ethersproject/units';
import { ADDRESS_ZERO } from '@uniswap/v3-sdk';
import { ERC20__factory } from '@vanilladefi/trade-contracts/typechain/openzeppelin/factories/ERC20__factory';
import { providers } from 'ethers';
import { tradeContractAddresses, epoch, getVanillaTradeRouter, getVanillaTokenContract, vnlDecimals, } from './contracts';
import { getBalance, isAddress } from './tokens';
import { VanillaVersion } from '@vanilladefi/core-sdk';
/**
 * Gets all addresses that have purchased tokens via Vanilla
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that have interacted with Vanilla
 */
export const getUsers = async (provider) => {
    const users = [];
    const vnlRouter = getVanillaTradeRouter(VanillaVersion.V1_1, provider || providers.getDefaultProvider());
    const vnlLegacyRouter = getVanillaTradeRouter(VanillaVersion.V1_0, provider || providers.getDefaultProvider());
    // Fetch Vanilla v1.1 users
    const purchaseFilter = vnlRouter.filters.TokensPurchased();
    const events = await vnlRouter.queryFilter(purchaseFilter, epoch);
    events.forEach((event) => {
        const walletAddress = isAddress(event?.args?.buyer);
        if (walletAddress && !users.includes(walletAddress)) {
            users.push(walletAddress);
        }
    });
    // Fetch Vanilla v1.0 users
    const legacyFilter = vnlLegacyRouter.filters.TokensPurchased();
    const legacyEvents = await vnlLegacyRouter.queryFilter(legacyFilter, epoch);
    legacyEvents.forEach((event) => {
        const walletAddress = isAddress(event?.args?.buyer);
        if (walletAddress && !users.includes(walletAddress)) {
            users.push(walletAddress);
        }
    });
    return users;
};
/**
 * Fetches the $VNL and $ETH balances for given address
 *
 * @param vanillaVersion - Vanilla version
 * @param address - ethereum address
 * @param provider - an ethersjs provider (readonly)
 * @returns addresses $VNL and $ETH balance
 */
export const getBasicWalletDetails = async (vanillaVersion, address, provider) => {
    let [vnlBalance, ethBalance] = ['0', '0'];
    const walletAddress = isAddress(address);
    try {
        if (walletAddress) {
            const vnl = getVanillaTokenContract(vanillaVersion, provider || providers.getDefaultProvider());
            vnlBalance = formatUnits(await vnl.balanceOf(walletAddress), vnlDecimals);
            ethBalance = formatUnits(await getBalance(walletAddress, provider || providers.getDefaultProvider()));
        }
    }
    catch (e) {
        console.error(`getBasicWalletDetails failed for address ${walletAddress}: ${e}`);
    }
    return { vnlBalance, ethBalance };
};
/**
 * Gets a list of $VNL holders
 *
 * @param provider - an ethersjs provider (readonly)
 * @returns list of addresses that hold $VNL
 */
export const getVnlHolders = async (provider) => {
    const vnlToken = ERC20__factory.connect(tradeContractAddresses.vanilla[VanillaVersion.V1_1]?.vnl || '', provider || providers.getDefaultProvider());
    const vnlRouter = getVanillaTradeRouter(VanillaVersion.V1_1, provider || providers.getDefaultProvider());
    const epoch = await vnlRouter.epoch();
    const transferFilter = vnlToken.filters.Transfer();
    const events = await vnlToken.queryFilter(transferFilter, epoch.toNumber());
    const vnlHolders = new Set();
    events.forEach((event) => {
        event?.args?.from !== ADDRESS_ZERO && vnlHolders.add(event?.args?.from);
        event?.args?.to !== ADDRESS_ZERO && vnlHolders.add(event?.args?.to);
    });
    vnlHolders.forEach(async (holder) => {
        const balance = await vnlToken.balanceOf(holder);
        if (balance.isZero()) {
            vnlHolders.delete(holder);
        }
    });
    return Array.from(vnlHolders);
};
