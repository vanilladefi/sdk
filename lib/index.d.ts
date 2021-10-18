import * as migration from './migration';
declare const _default: {
    getUsers: (provider?: import("@ethersproject/abstract-provider").Provider | undefined) => Promise<string[]>;
    getBasicWalletDetails: (vanillaVersion: import("./types/general").VanillaVersion, walletAddress: string, provider?: import("@ethersproject/abstract-provider").Provider | undefined) => Promise<import("./types/content").PrerenderProps>;
    getVnlHolders: (provider?: import("@ethersproject/abstract-provider").Provider | undefined) => Promise<string[]>;
    calculateGasMargin(value: import("ethers").BigNumber): import("ethers").BigNumber;
    getUserPositions(version: import("./types/general").VanillaVersion, address: string, tokens?: import("./types/trade").Token[] | undefined, provider?: import("@ethersproject/abstract-provider").Provider | undefined): Promise<import("./types/trade").Token[]>;
    estimateReward: (version: import("./types/general").VanillaVersion, owner: string, signerOrProvider: import("@ethersproject/abstract-provider").Provider | import("ethers").Signer, tokenSold: import("./types/trade").Token, tokenReceived: import("./types/trade").Token, amountSold: string, amountReceived: string) => Promise<import("./types/trade").RewardResponse | null>;
    getPriceData: (version: import("./types/general").VanillaVersion, owner: string, signerOrProvider: import("@ethersproject/abstract-provider").Provider | import("ethers").Signer, tokenAddress: string) => Promise<import("./types/trade").TokenPriceResponse | null>;
    estimateGas: (version: import("./types/general").VanillaVersion, trade: import("./types/trade").V3Trade | import("@uniswap/sdk").Trade, signer: import("ethers").Signer, provider: import("@ethersproject/abstract-provider").Provider, operation: import("./types/trade").Operation, token0: import("./types/trade").Token, slippageTolerance: import("@uniswap/sdk-core").Percent | import("@uniswap/sdk").Percent) => Promise<import("ethers").BigNumber>;
    getAllTokens(version?: import("./types/general").VanillaVersion | undefined): import("./types/trade").Token[];
    getBalance(address: string, provider: import("@ethersproject/abstract-provider").Provider): Promise<import("ethers").BigNumber>;
    isAddress(value: string): string | false;
    getContract(address: string, ABI: any, signerOrProvider?: import("@ethersproject/abstract-provider").Provider | import("ethers").Signer | undefined): import("ethers").Contract;
    padUniswapTokenToToken(input: import("./types/trade").UniSwapToken): import("./types/trade").Token;
    convertVanillaTokenToUniswapToken(input: import("./types/trade").Token): import("@uniswap/sdk-core").Token;
    weth: import("./types/trade").Token;
    usdc: import("./types/trade").Token;
    vnl: import("./types/trade").Token;
    toKeccak256Leaf: (balance: migration.AddressBalance) => string;
    snapshot: (token01: import("./types/typechain/vanilla_v1.1").VanillaV1Token01, token02: import("./types/typechain/vanilla_v1.1").VanillaV1Token02) => Promise<{
        snapshotState: migration.SnapshotState;
        getProof: (balance: migration.AddressBalance) => string[];
        verify: (balance: migration.AddressBalance, root: string) => boolean;
        root: string;
        merkleTree: import("merkletreejs").MerkleTree;
    }>;
    ipfsToHttp(src: string | null | undefined, gateway?: string): string;
    getVanillaTokenContract(version: import("./types/general").VanillaVersion, signerOrProvider?: import("@ethersproject/abstract-provider").Provider | import("ethers").Signer | undefined): import("./types/typechain/vanilla_v1.1/ERC20").ERC20;
    getVanillaRouter(version: import("./types/general").VanillaVersion, signerOrProvider?: import("@ethersproject/abstract-provider").Provider | import("ethers").Signer | undefined): import("ethers").Contract | import("./types/typechain/vanilla_v1.1").VanillaV1Router02;
    getFeeTier(input: string | number | null | undefined): import("@uniswap/v3-sdk").FeeAmount | undefined;
    vnlPools: {
        ETH: string;
        USDC: string;
    };
    contractAddresses: {
        vanilla: {
            v1_0: {
                router: string;
                vnl: string;
            };
            v1_1: {
                router: string;
                vnl: string;
            };
        };
        uniswap: {
            v2: {
                router: string;
                quoter?: string | undefined;
            };
            v3: {
                router: string;
                quoter?: string | undefined;
            };
        };
    };
    usdcWethPoolAddress: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
    vnlDecimals: 12;
    epoch: 12134736;
    chainId: 1;
    network: import("@ethersproject/networks").Networkish;
    hiddenTokens: string[];
    blockDeadlineThreshold: 60000;
    conservativeGasLimit: 800000;
    conservativeMigrationGasLimit: 120000;
    ethersOverrides: {
        gasLimit: number;
    };
};
export default _default;
