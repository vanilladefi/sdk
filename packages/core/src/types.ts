export enum Eligibility {
    NotEligible,
    Eligible,
  }

export interface PairInfo {
    pairId: string | null
    feeTier?: string | number | null
}

export interface UniSwapToken {
    [index: string]: string | number | null | undefined
    name?: string
    address: string
    symbol: string
    decimals: string
    chainId: string
    logoURI?: string
}

export interface Token extends UniSwapToken {
    pairId: string | null
    price?: number | null
    priceUSD?: number | null
    priceHistorical?: number | null
    priceChange?: number | null
    liquidity?: number | null
    logoColor: string | null
    owned?: string | null
    ownedRaw?: string | null
    value?: number | null
    profit?: number | string | null
    vnl?: number | null
    eligible?: Eligibility
    vpc?: string | null
    htrs?: string | null
    reserveETH?: string | null
    reserveToken?: string | null
    inRangeLiquidity?: string | null
    sqrtPrice?: string | null
    pool?: string | null
    fee?: string | number | null
    observationCardinality?: number | null
}

export type ChainId = '1' | '2' | '3' | '4' | '42' | '137' | '1337'

export enum VanillaVersion {
  V1_0 = 'v1_0',
  V1_1 = 'v1_1',
  V2   = 'v2',
}

export enum UniswapVersion {
  v2 = 'v2',
  v3 = 'v3',
}