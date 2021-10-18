"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseAmount = exports.constructTrade = exports.sell = exports.buy = void 0;
var sdk_1 = require("@uniswap/sdk");
var contracts_1 = require("contracts");
var utils_1 = require("ethers/lib/utils");
var tokens_1 = require("tokens");
var vanillaRouter_json_1 = __importDefault(require("types/abis/vanillaRouter.json"));
var general_1 = require("types/general");
var buy = function (_a) {
    var amountPaid = _a.amountPaid, amountReceived = _a.amountReceived, tokenReceived = _a.tokenReceived, signer = _a.signer, blockDeadline = _a.blockDeadline, gasLimit = _a.gasLimit;
    return __awaiter(void 0, void 0, void 0, function () {
        var router, usedGasLimit, receipt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    router = (0, tokens_1.getContract)(contracts_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_0].router, JSON.stringify(vanillaRouter_json_1.default.abi), signer);
                    usedGasLimit = gasLimit !== undefined ? gasLimit : contracts_1.ethersOverrides.gasLimit;
                    return [4 /*yield*/, router.depositAndBuy(tokenReceived === null || tokenReceived === void 0 ? void 0 : tokenReceived.address, amountReceived, blockDeadline, { value: amountPaid, gasLimit: usedGasLimit })];
                case 1:
                    receipt = _b.sent();
                    return [2 /*return*/, receipt];
            }
        });
    });
};
exports.buy = buy;
var sell = function (_a) {
    var amountPaid = _a.amountPaid, amountReceived = _a.amountReceived, tokenPaid = _a.tokenPaid, signer = _a.signer, blockDeadline = _a.blockDeadline, gasLimit = _a.gasLimit;
    return __awaiter(void 0, void 0, void 0, function () {
        var router, usedGasLimit, receipt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    router = (0, tokens_1.getContract)(contracts_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_0].router, JSON.stringify(vanillaRouter_json_1.default.abi), signer);
                    usedGasLimit = gasLimit !== undefined ? gasLimit : contracts_1.ethersOverrides.gasLimit;
                    return [4 /*yield*/, router.sellAndWithdraw(tokenPaid === null || tokenPaid === void 0 ? void 0 : tokenPaid.address, amountPaid, amountReceived, blockDeadline, { gasLimit: usedGasLimit })];
                case 1:
                    receipt = _b.sent();
                    return [2 /*return*/, receipt];
            }
        });
    });
};
exports.sell = sell;
// Pricing function for UniSwap v2 trades
function constructTrade(provider, amountToTrade, // Not amountPaid because of tradeType
tokenReceived, tokenPaid, tradeType) {
    if (tradeType === void 0) { tradeType = sdk_1.TradeType.EXACT_OUTPUT; }
    return __awaiter(this, void 0, void 0, function () {
        var parsedAmount, convertedTokenReceived, convertedTokenPaid, pair, route, trade, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    parsedAmount = tryParseAmount(amountToTrade, tradeType === sdk_1.TradeType.EXACT_OUTPUT ? tokenReceived : tokenPaid);
                    if (!parsedAmount)
                        return [2 /*return*/, Promise.reject("Failed to parse input amount: " + amountToTrade)];
                    convertedTokenReceived = new sdk_1.Token(parseInt(tokenReceived.chainId), (0, utils_1.getAddress)(tokenReceived.address), parseInt(tokenReceived.decimals));
                    convertedTokenPaid = new sdk_1.Token(parseInt(tokenPaid.chainId), (0, utils_1.getAddress)(tokenPaid.address), parseInt(tokenPaid.decimals));
                    return [4 /*yield*/, sdk_1.Fetcher.fetchPairData(convertedTokenReceived, convertedTokenPaid, provider)];
                case 1:
                    pair = _a.sent();
                    route = new sdk_1.Route([pair], convertedTokenPaid);
                    trade = new sdk_1.Trade(route, parsedAmount, tradeType);
                    return [2 /*return*/, trade];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.constructTrade = constructTrade;
function tryParseAmount(value, currency) {
    if (!value || !currency) {
        return undefined;
    }
    try {
        var convertedToken = new sdk_1.Token(contracts_1.chainId, (0, utils_1.getAddress)(currency.address), Number(currency.decimals));
        var typedValueParsed = (0, utils_1.parseUnits)(value, currency.decimals).toString();
        if (typedValueParsed !== '0') {
            return new sdk_1.TokenAmount(convertedToken, sdk_1.JSBI.BigInt(typedValueParsed));
        }
    }
    catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.debug("Failed to parse input amount: \"" + value + "\"", error);
    }
    // necessary for all paths to return a value
    return undefined;
}
exports.tryParseAmount = tryParseAmount;
