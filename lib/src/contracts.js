"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vnlPools = exports.getVanillaRouter = exports.getVanillaTokenContract = void 0;
var ethers_1 = require("ethers");
var VanillaV1Router01_json_1 = require("types/abis/VanillaV1Router01.json");
var general_1 = require("types/general");
var ERC20__factory_1 = require("types/typechain/vanilla_v1.1/factories/ERC20__factory");
var VanillaV1Router02__factory_1 = require("types/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory");
var constants_1 = require("./constants");
function getVanillaTokenContract(version, signerOrProvider) {
    var address = constants_1.default.contractAddresses.vanilla[version].vnl;
    return ERC20__factory_1.ERC20__factory.connect(address, signerOrProvider || ethers_1.providers.getDefaultProvider());
}
exports.getVanillaTokenContract = getVanillaTokenContract;
function getVanillaRouter(version, signerOrProvider) {
    var routerAddress = constants_1.default.contractAddresses.vanilla[version].router;
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
