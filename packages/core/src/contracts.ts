/**
 * $VNL pools on Uniswap with the most liquidity
 */
export const vnlPools = {
    ETH: '0xff6949065aebb4be59d30c970694a7495da0c0ff',
    USDC: '0x0aa719a08957bdf43d9c9f0b755edd1ca2b386f3',
}

/**
 * The Uniswap v3 pool address for checking WETH/USDC price
 */
export const usdcWethPoolAddress = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640'

/**
 * Decimal points used in $VNL
 */
export const vnlDecimals = 12

/**
 * The block number of the first Vanilla v1.0 deployment. Used for calculating HTRS
 */
export const epoch = 12134736