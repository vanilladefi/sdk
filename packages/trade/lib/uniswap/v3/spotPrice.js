import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { Pool } from '@uniswap/v3-sdk';
import { ethers, providers } from 'ethers';
/**
 * Fetches the Uniswap v3 pool state for given pool contract
 *
 * @param poolContract - A Uniswap v3 liquidity pool instance
 * @returns pool state with lots of info about pricing and the oracle
 */
const getPoolState = async (poolContract) => {
    const slot = await poolContract.slot0();
    const PoolState = {
        liquidity: await poolContract.liquidity(),
        sqrtPriceX96: slot[0],
        tick: slot[1],
        observationIndex: slot[2],
        observationCardinality: slot[3],
        observationCardinalityNext: slot[4],
        feeProtocol: slot[5],
        unlocked: slot[6],
    };
    return PoolState;
};
/**
 * Gets the on-chain price for given token pair
 * from a Uniswap v3 liquidity pool
 *
 * @param poolAddress - the Uniswap v3 liquidity pool address
 * @param token0 - the first token of the token pair in Uniswap's Token format
 * @param token1 - the second token of the pair in Uniswap's token format
 * @param provider - an ethersjs provider (readonly)
 * @returns a list with both prices of the pair (token0/token1 & token1/token0)
 */
export const getSpotPrice = async (poolAddress, token0, token1, provider) => {
    const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider || providers.getDefaultProvider());
    const state = await getPoolState(poolContract);
    const fee = await poolContract.fee();
    const pool = new Pool(token0, token1, fee, state.sqrtPriceX96.toString(), state.liquidity.toString(), state.tick);
    return [pool.token0Price, pool.token1Price];
};
