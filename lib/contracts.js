"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethersOverrides = exports.conservativeMigrationGasLimit = exports.conservativeGasLimit = exports.blockDeadlineThreshold = exports.getFeeTier = exports.hiddenTokens = exports.network = exports.chainId = exports.epoch = exports.vnlDecimals = exports.usdcWethPoolAddress = exports.contractAddresses = exports.vnlPools = exports.getVanillaRouter = exports.getVanillaTokenContract = void 0;
var v3_sdk_1 = require("@uniswap/v3-sdk");
var ethers_1 = require("ethers");
var VanillaV1Router01_json_1 = __importDefault(require("./types/abis/VanillaV1Router01.json"));
var general_1 = require("./types/general");
var ERC20__factory_1 = require("./types/typechain/vanilla_v1.1/factories/ERC20__factory");
var VanillaV1Router02__factory_1 = require("./types/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory");
function getVanillaTokenContract(version, signerOrProvider) {
    var address = exports.contractAddresses.vanilla[version].vnl;
    return ERC20__factory_1.ERC20__factory.connect(address, signerOrProvider || ethers_1.providers.getDefaultProvider());
}
exports.getVanillaTokenContract = getVanillaTokenContract;
function getVanillaRouter(version, signerOrProvider) {
    var routerAddress = exports.contractAddresses.vanilla[version].router;
    var v1abi = VanillaV1Router01_json_1.default.abi;
    return version === general_1.VanillaVersion.V1_1
        ? VanillaV1Router02__factory_1.VanillaV1Router02__factory.connect(routerAddress, signerOrProvider || ethers_1.providers.getDefaultProvider())
        : new ethers_1.Contract(routerAddress, v1abi, signerOrProvider || ethers_1.providers.getDefaultProvider());
}
exports.getVanillaRouter = getVanillaRouter;
exports.vnlPools = {
    ETH: '0xff6949065aebb4be59d30c970694a7495da0c0ff',
    USDC: '0x0aa719a08957bdf43d9c9f0b755edd1ca2b386f3',
};
exports.contractAddresses = {
    vanilla: {
        v1_0: {
            router: '0xE13E9010e818D48df1A0415021d9526ef845e2Cd',
            vnl: '0x1017b147b05942ead495e2ad6d606ef3c94b8fd0',
        },
        v1_1: {
            router: '0x72C8B3aA6eD2fF68022691ecD21AEb1517CfAEa6',
            vnl: '0xbf900809f4C73e5a3476eb183d8b06a27e61F8E5',
        },
    },
    uniswap: {
        v2: {
            router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        },
        v3: {
            router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
            quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
        },
    },
};
exports.usdcWethPoolAddress = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640';
exports.vnlDecimals = 12;
exports.epoch = 12134736;
exports.chainId = 1;
exports.network = ethers_1.providers.getNetwork(exports.chainId);
exports.hiddenTokens = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161'];
function getFeeTier(input) {
    var feeTierString = input === null || input === void 0 ? void 0 : input.toString();
    var feeTier;
    switch (feeTierString) {
        case '500':
            feeTier = v3_sdk_1.FeeAmount.LOW;
            break;
        case '3000':
            feeTier = v3_sdk_1.FeeAmount.MEDIUM;
            break;
        case '10000':
            feeTier = v3_sdk_1.FeeAmount.HIGH;
            break;
        default:
            feeTier = undefined;
    }
    return feeTier;
}
exports.getFeeTier = getFeeTier;
exports.blockDeadlineThreshold = 60000; // 600 seconds added to the latest block timestamp (10 minutes)
exports.conservativeGasLimit = 800000;
exports.conservativeMigrationGasLimit = 120000;
exports.ethersOverrides = { gasLimit: exports.conservativeGasLimit };
