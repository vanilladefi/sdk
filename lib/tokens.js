"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertVanillaTokenToUniswapToken = exports.padUniswapTokenToToken = exports.getContract = exports.isAddress = exports.getBalance = exports.getAllTokens = exports.vnl = exports.usdc = exports.weth = void 0;
var default_token_list_1 = __importDefault(require("@uniswap/default-token-list"));
var sdk_core_1 = require("@uniswap/sdk-core");
var contracts_1 = require("contracts");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var ipfs_1 = require("ipfs");
var tokens_v1_0_json_1 = __importDefault(require("tokenLists/tokens_v1_0.json"));
var tokens_v1_1_json_1 = __importDefault(require("tokenLists/tokens_v1_1.json"));
var general_1 = require("types/general");
// WETH stuff
var defaultWeth = {
    chainId: String(contracts_1.chainId),
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: String(18),
    symbol: 'WETH',
    name: 'Wrapped Ether',
    logoColor: null,
    pairId: null,
};
var defaultUsdc = {
    chainId: String(contracts_1.chainId),
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: String(6),
    symbol: 'USDC',
    name: 'USD Coin',
    logoColor: null,
    pairId: null,
};
exports.weth = ((_a = getAllTokens(general_1.VanillaVersion.V1_0)) === null || _a === void 0 ? void 0 : _a.find(function (token) {
    return token.chainId === String(contracts_1.chainId) && token.symbol === defaultWeth.symbol;
})) || defaultWeth;
exports.usdc = ((_b = getAllTokens(general_1.VanillaVersion.V1_0)) === null || _b === void 0 ? void 0 : _b.find(function (token) { return token.chainId === String(contracts_1.chainId) && token.symbol === 'USDC'; })) || defaultUsdc;
exports.vnl = {
    chainId: String(contracts_1.chainId),
    address: contracts_1.contractAddresses.vanilla.v1_1.vnl,
    decimals: String(contracts_1.vnlDecimals),
    symbol: 'VNL',
    name: 'Vanilla',
    logoColor: null,
    pairId: null,
};
function getAllTokens(version) {
    // Convert TokenList format to our own format
    var defaultTokens = default_token_list_1.default === null || default_token_list_1.default === void 0 ? void 0 : default_token_list_1.default.tokens.map(function (t) { return JSON.parse(JSON.stringify(t)); }).map(function (t) { return (__assign(__assign({}, t), { chainId: String(t.chainId), decimals: String(t.decimals) })); });
    var additionalTokens;
    switch (version) {
        case general_1.VanillaVersion.V1_0:
            additionalTokens = tokens_v1_0_json_1.default;
            break;
        case general_1.VanillaVersion.V1_1:
            additionalTokens = tokens_v1_1_json_1.default;
            break;
        default:
            additionalTokens = tokens_v1_1_json_1.default;
    }
    var vanillaTokens = additionalTokens
        .map(function (t) { return JSON.parse(JSON.stringify(t)); }) // Needed for casting to Token[] format
        .map(function (t) { return (__assign(__assign({}, t), { chainId: String(t.chainId), decimals: String(t.decimals) })); });
    var allTokens;
    switch (version) {
        case general_1.VanillaVersion.V1_0:
            allTokens = __spreadArray(__spreadArray([], defaultTokens, true), vanillaTokens, true);
            break;
        case general_1.VanillaVersion.V1_1:
            allTokens = __spreadArray([], vanillaTokens, true);
            break;
        default:
            allTokens = __spreadArray([], vanillaTokens, true);
    }
    // include only tokens with specified 'chainId' and exclude WETH
    return allTokens
        .filter(function (token) {
        return token.chainId === String(contracts_1.chainId) &&
            token.symbol !== defaultWeth.symbol;
    })
        .map(function (t) { return (__assign(__assign({}, t), { logoURI: (0, ipfs_1.ipfsToHttp)(t.logoURI), logoColor: null, pairId: null, price: null, priceHistorical: null, liquidity: null, priceChange: null })); });
}
exports.getAllTokens = getAllTokens;
function getBalance(address, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.getBalance(address)];
                case 1:
                    balance = _a.sent();
                    return [2 /*return*/, balance];
            }
        });
    });
}
exports.getBalance = getBalance;
// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
    try {
        return (0, utils_1.getAddress)(value);
    }
    catch (_a) {
        return false;
    }
}
exports.isAddress = isAddress;
// account is optional
function getContract(address, ABI, signerOrProvider) {
    if (!isAddress(address) || address === ethers_1.constants.AddressZero) {
        throw Error("Invalid 'address' parameter '" + address + "'.");
    }
    return new ethers_1.Contract(address, ABI, signerOrProvider);
}
exports.getContract = getContract;
function padUniswapTokenToToken(input) {
    var token = __assign({ pairId: null, logoColor: null }, input);
    return token;
}
exports.padUniswapTokenToToken = padUniswapTokenToToken;
function convertVanillaTokenToUniswapToken(input) {
    var token = new sdk_core_1.Token(Number(input.chainId), input.address, Number(input.decimals), input.symbol, input.name);
    return token;
}
exports.convertVanillaTokenToUniswapToken = convertVanillaTokenToUniswapToken;
