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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseAmount = exports.constructTrade = exports.sell = exports.buy = exports.UniswapOracle = void 0;
var sdk_core_1 = require("@uniswap/sdk-core");
var v3_sdk_1 = require("@uniswap/v3-sdk");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var contracts_1 = require("../../contracts");
var tokens_1 = require("../../tokens");
var general_1 = require("../../types/general");
var uniswap_v3_periphery_1 = require("../../types/typechain/uniswap_v3_periphery");
var VanillaV1Router02__factory_1 = require("../../types/typechain/vanilla_v1.1/factories/VanillaV1Router02__factory");
var UniswapOracle = function (oracle) { return ({
    swap: function (tokenIn, tokenOut) {
        return {
            swapParamsIn: function (amountIn, fee) {
                return {
                    tokenIn: tokenIn,
                    tokenOut: tokenOut,
                    fee: fee,
                    sqrtPriceLimitX96: 0,
                    amountIn: amountIn.raw.toString(),
                };
            },
            swapParamsOut: function (amountOut, fee) {
                return {
                    tokenIn: tokenIn,
                    tokenOut: tokenOut,
                    fee: fee,
                    sqrtPriceLimitX96: 0,
                    amountOut: amountOut.raw.toString(),
                };
            },
            estimateAmountOut: function (amountIn, fee) {
                return __awaiter(this, void 0, void 0, function () {
                    var swapParams, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                swapParams = this.swapParamsIn(amountIn, fee);
                                return [4 /*yield*/, oracle.callStatic.quoteExactInputSingle(swapParams.tokenIn, swapParams.tokenOut, fee, swapParams.amountIn, swapParams.sqrtPriceLimitX96, {
                                        gasLimit: contracts_1.conservativeGasLimit,
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_1 = _a.sent();
                                console.error(e_1);
                                return [2 /*return*/, undefined];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            estimateAmountIn: function (amountOut, fee) {
                return __awaiter(this, void 0, void 0, function () {
                    var swapParams, e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                swapParams = this.swapParamsOut(amountOut, fee);
                                return [4 /*yield*/, oracle.callStatic.quoteExactOutputSingle(swapParams.tokenIn, swapParams.tokenOut, fee, swapParams.amountOut, swapParams.sqrtPriceLimitX96, {
                                        gasLimit: contracts_1.conservativeGasLimit,
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_2 = _a.sent();
                                console.error(e_2);
                                return [2 /*return*/, undefined];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        };
    },
}); };
exports.UniswapOracle = UniswapOracle;
var buy = function (_a) {
    var amountPaid = _a.amountPaid, amountReceived = _a.amountReceived, tokenReceived = _a.tokenReceived, signer = _a.signer, blockDeadline = _a.blockDeadline, feeTier = _a.feeTier, gasLimit = _a.gasLimit;
    return __awaiter(void 0, void 0, void 0, function () {
        var vnl1_1Addr, router, usedGasLimit, orderData, receipt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    vnl1_1Addr = (0, tokens_1.isAddress)(contracts_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_1].router);
                    if (!(vnl1_1Addr && (tokenReceived === null || tokenReceived === void 0 ? void 0 : tokenReceived.address) && signer && feeTier)) return [3 /*break*/, 2];
                    router = VanillaV1Router02__factory_1.VanillaV1Router02__factory.connect(vnl1_1Addr, signer);
                    usedGasLimit = gasLimit ? gasLimit : contracts_1.ethersOverrides.gasLimit;
                    orderData = {
                        token: tokenReceived.address,
                        useWETH: false,
                        numEth: amountPaid,
                        numToken: amountReceived,
                        blockTimeDeadline: blockDeadline,
                        fee: feeTier,
                    };
                    return [4 /*yield*/, router.executePayable([router.interface.encodeFunctionData('buy', [orderData])], { value: amountPaid, gasLimit: usedGasLimit })];
                case 1:
                    receipt = _b.sent();
                    return [2 /*return*/, receipt];
                case 2: return [2 /*return*/, Promise.reject('No Vanilla v1.1 router on used chain!')];
            }
        });
    });
};
exports.buy = buy;
var sell = function (_a) {
    var amountPaid = _a.amountPaid, amountReceived = _a.amountReceived, tokenPaid = _a.tokenPaid, signer = _a.signer, blockDeadline = _a.blockDeadline, feeTier = _a.feeTier, gasLimit = _a.gasLimit;
    return __awaiter(void 0, void 0, void 0, function () {
        var vnl1_1Addr, router, usedGasLimit, orderData, receipt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    vnl1_1Addr = (0, tokens_1.isAddress)(contracts_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_1].router);
                    if (!(vnl1_1Addr && (tokenPaid === null || tokenPaid === void 0 ? void 0 : tokenPaid.address) && signer && feeTier)) return [3 /*break*/, 2];
                    router = VanillaV1Router02__factory_1.VanillaV1Router02__factory.connect(vnl1_1Addr, signer);
                    usedGasLimit = gasLimit ? gasLimit : contracts_1.ethersOverrides.gasLimit;
                    orderData = {
                        token: tokenPaid.address,
                        useWETH: false,
                        numEth: amountReceived,
                        numToken: amountPaid,
                        blockTimeDeadline: blockDeadline,
                        fee: feeTier,
                    };
                    return [4 /*yield*/, router.executePayable([router.interface.encodeFunctionData('sell', [orderData])], { gasLimit: usedGasLimit })];
                case 1:
                    receipt = _b.sent();
                    return [2 /*return*/, receipt];
                case 2: return [2 /*return*/, Promise.reject('No Vanilla v1.1 router on used chain!')];
            }
        });
    });
};
exports.sell = sell;
var V3Trade = /** @class */ (function () {
    function V3Trade(inputAmount, outputAmount, tradeType) {
        this.route = null;
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.tradeType = tradeType;
        this.price = new sdk_core_1.Price(inputAmount.token, outputAmount.token, inputAmount.raw.toString(), outputAmount.raw.toString());
        this.route = null;
    }
    V3Trade.prototype.worstExecutionPrice = function () {
        return this.price;
    };
    Object.defineProperty(V3Trade.prototype, "executionPrice", {
        get: function () {
            return this.price;
        },
        enumerable: false,
        configurable: true
    });
    V3Trade.prototype.minimumAmountOut = function (slippageTolerance) {
        if (this.tradeType === sdk_core_1.TradeType.EXACT_OUTPUT) {
            return this.outputAmount;
        }
        else {
            var slippageAdjustedAmountOut = new sdk_core_1.Fraction(1)
                .add(slippageTolerance)
                .invert()
                .multiply(this.outputAmount.raw).quotient;
            return this.outputAmount instanceof sdk_core_1.TokenAmount
                ? new sdk_core_1.TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut)
                : sdk_core_1.CurrencyAmount.ether(slippageAdjustedAmountOut);
        }
    };
    V3Trade.prototype.maximumAmountIn = function (slippageTolerance) {
        if (this.tradeType === sdk_core_1.TradeType.EXACT_INPUT) {
            return this.inputAmount;
        }
        else {
            var slippageAdjustedAmountIn = new sdk_core_1.Fraction(1)
                .add(slippageTolerance)
                .multiply(this.inputAmount.raw).quotient;
            return this.inputAmount instanceof sdk_core_1.TokenAmount
                ? new sdk_core_1.TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn)
                : sdk_core_1.CurrencyAmount.ether(slippageAdjustedAmountIn);
        }
    };
    return V3Trade;
}());
// Pricing function for UniSwap v3 trades
function constructTrade(signerOrProvider, amountToTrade, // Not amountPaid because of tradeType
tokenReceived, tokenPaid, tradeType) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultFeeTier, tokenToTrade, quotedToken, parsedAmountTraded, feeTier, uniV3Oracle, swapOperation, quote, amountOut, amountIn, formattedQuote, parsedQuote, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultFeeTier = v3_sdk_1.FeeAmount.MEDIUM;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    tokenToTrade = tradeType === sdk_core_1.TradeType.EXACT_OUTPUT ? tokenReceived : tokenPaid;
                    quotedToken = tradeType === sdk_core_1.TradeType.EXACT_OUTPUT ? tokenPaid : tokenReceived;
                    parsedAmountTraded = tryParseAmount(amountToTrade, tokenToTrade);
                    if (!parsedAmountTraded)
                        return [2 /*return*/, Promise.reject("Failed to parse input amount: " + amountToTrade)];
                    feeTier = (0, contracts_1.getFeeTier)(tokenReceived.fee) ||
                        (0, contracts_1.getFeeTier)(tokenPaid.fee) ||
                        defaultFeeTier;
                    uniV3Oracle = uniswap_v3_periphery_1.Quoter__factory.connect(contracts_1.contractAddresses.uniswap.v3.quoter || '', signerOrProvider);
                    swapOperation = (0, exports.UniswapOracle)(uniV3Oracle).swap((0, tokens_1.isAddress)(tokenPaid.address) || tokenPaid.address, (0, tokens_1.isAddress)(tokenReceived.address) || tokenReceived.address);
                    quote = ethers_1.BigNumber.from(0);
                    if (!(tradeType === sdk_core_1.TradeType.EXACT_INPUT)) return [3 /*break*/, 3];
                    return [4 /*yield*/, swapOperation.estimateAmountOut(parsedAmountTraded, feeTier.valueOf())];
                case 2:
                    amountOut = _a.sent();
                    if (amountOut) {
                        quote = amountOut;
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, swapOperation.estimateAmountIn(parsedAmountTraded, feeTier.valueOf())];
                case 4:
                    amountIn = _a.sent();
                    if (amountIn) {
                        quote = amountIn;
                    }
                    _a.label = 5;
                case 5:
                    formattedQuote = (0, utils_1.formatUnits)(quote, quotedToken.decimals);
                    parsedQuote = tryParseAmount(formattedQuote, quotedToken);
                    if (parsedQuote && parsedAmountTraded) {
                        return [2 /*return*/, new V3Trade(tradeType === sdk_core_1.TradeType.EXACT_INPUT ? parsedAmountTraded : parsedQuote, tradeType === sdk_core_1.TradeType.EXACT_INPUT ? parsedQuote : parsedAmountTraded, tradeType)];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error(error_1);
                    throw error_1;
                case 7: return [2 /*return*/];
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
        var convertedToken = new sdk_core_1.Token(contracts_1.chainId, (0, utils_1.getAddress)(currency.address), Number(currency.decimals));
        var typedValueParsed = (0, utils_1.parseUnits)(value, currency.decimals).toString();
        if (typedValueParsed !== '0') {
            return new sdk_core_1.TokenAmount(convertedToken, typedValueParsed);
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
