"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethersOverrides = exports.conservativeMigrationGasLimit = exports.conservativeGasLimit = exports.blockDeadlineThreshold = exports.getFeeTier = exports.hiddenTokens = exports.network = exports.chainId = exports.epoch = exports.vnlDecimals = exports.usdcWethPoolAddress = exports.contractAddresses = void 0;
var v3_sdk_1 = require("@uniswap/v3-sdk");
var ethers_1 = require("ethers");
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
