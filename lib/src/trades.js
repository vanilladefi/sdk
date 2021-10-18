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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPositions = exports.calculateGasMargin = exports.estimateGas = exports.getPriceData = exports.estimateReward = void 0;
var sdk_1 = require("@uniswap/sdk");
var sdk_core_1 = require("@uniswap/sdk-core");
var v3_sdk_1 = require("@uniswap/v3-sdk");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var vanillaRouter_json_1 = require("types/abis/vanillaRouter.json");
var general_1 = require("types/general");
var trade_1 = require("types/trade");
var vanilla_v1_1_1 = require("types/typechain/vanilla_v1.1");
var constants_1 = require("./constants");
var contracts_1 = require("./contracts");
var tokens_1 = require("./tokens");
var trade_2 = require("./uniswap/v2/trade");
var spotPrice_1 = require("./uniswap/v3/spotPrice");
var trade_3 = require("./uniswap/v3/trade");
var estimateReward = function (version, owner, signerOrProvider, tokenSold, tokenReceived, amountSold, amountReceived) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, parsedAmountSold, parsedAmountReceived, reward, router, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = [
                    (0, trade_2.tryParseAmount)(amountSold, tokenSold),
                    (0, trade_2.tryParseAmount)(amountReceived, tokenReceived),
                ], parsedAmountSold = _a[0], parsedAmountReceived = _a[1];
                reward = null;
                if (!(parsedAmountReceived &&
                    parsedAmountSold &&
                    parsedAmountReceived.greaterThan('0') &&
                    parsedAmountSold.greaterThan('0') &&
                    (0, tokens_1.isAddress)(owner))) return [3 /*break*/, 4];
                router = version === general_1.VanillaVersion.V1_0
                    ? new ethers_1.ethers.Contract(constants_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_0].router, JSON.stringify(vanillaRouter_json_1.default.abi), signerOrProvider)
                    : vanilla_v1_1_1.VanillaV1Router02__factory.connect(constants_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_1].router, signerOrProvider);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, router.estimateReward(owner, tokenSold.address, parsedAmountReceived === null || parsedAmountReceived === void 0 ? void 0 : parsedAmountReceived.raw.toString(), parsedAmountSold === null || parsedAmountSold === void 0 ? void 0 : parsedAmountSold.raw.toString())];
            case 2:
                reward = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.error('estimateReward', e_1);
                reward = null;
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, reward];
        }
    });
}); };
exports.estimateReward = estimateReward;
var getPriceData = function (version, owner, signerOrProvider, tokenAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var router, priceData, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                router = version === general_1.VanillaVersion.V1_0
                    ? new ethers_1.ethers.Contract(constants_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_0].router, JSON.stringify(vanillaRouter_json_1.default.abi), signerOrProvider)
                    : vanilla_v1_1_1.VanillaV1Router02__factory.connect(constants_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_1].router, signerOrProvider);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, router.tokenPriceData(owner, tokenAddress)];
            case 2:
                priceData = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                priceData = null;
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, priceData];
        }
    });
}); };
exports.getPriceData = getPriceData;
var estimateGas = function (version, trade, signer, provider, operation, token0, slippageTolerance) { return __awaiter(void 0, void 0, void 0, function () {
    var routerV1_0, routerV1_1, gasEstimate, block, blockDeadline, gasPrice, normalizedSlippageTolerance, normalizedTrade, normalizedTrade, normalizedSlippageTolerance, buyOrder, sellOrder, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                routerV1_0 = new ethers_1.ethers.Contract(constants_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_0].router, JSON.stringify(vanillaRouter_json_1.default.abi), signer);
                routerV1_1 = vanilla_v1_1_1.VanillaV1Router02__factory.connect(constants_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_1].router, signer);
                gasEstimate = ethers_1.BigNumber.from('0');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                if (!(signer && trade && provider)) return [3 /*break*/, 12];
                return [4 /*yield*/, provider.getBlock('latest')];
            case 2:
                block = _a.sent();
                blockDeadline = block.timestamp + constants_1.blockDeadlineThreshold;
                return [4 /*yield*/, provider.getGasPrice()];
            case 3:
                gasPrice = _a.sent();
                if (!(version === general_1.VanillaVersion.V1_0 && routerV1_0)) return [3 /*break*/, 8];
                normalizedSlippageTolerance = new sdk_1.Percent(slippageTolerance.numerator, slippageTolerance.denominator);
                normalizedTrade = trade;
                if (!(operation === trade_1.Operation.Buy)) return [3 /*break*/, 5];
                return [4 /*yield*/, routerV1_0.estimateGas.depositAndBuy(token0.address, normalizedTrade === null || normalizedTrade === void 0 ? void 0 : normalizedTrade.minimumAmountOut(normalizedSlippageTolerance).raw.toString(), blockDeadline, {
                        value: normalizedTrade === null || normalizedTrade === void 0 ? void 0 : normalizedTrade.inputAmount.raw.toString(),
                        gasPrice: gasPrice,
                    })];
            case 4:
                gasEstimate = _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, routerV1_0.estimateGas.sellAndWithdraw(token0.address, normalizedTrade === null || normalizedTrade === void 0 ? void 0 : normalizedTrade.inputAmount.raw.toString(), normalizedTrade === null || normalizedTrade === void 0 ? void 0 : normalizedTrade.minimumAmountOut(normalizedSlippageTolerance).raw.toString(), blockDeadline, {
                    gasPrice: gasPrice,
                })];
            case 6:
                gasEstimate = _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 12];
            case 8:
                if (!(version === general_1.VanillaVersion.V1_1 && routerV1_1)) return [3 /*break*/, 12];
                normalizedTrade = trade;
                normalizedSlippageTolerance = slippageTolerance;
                if (!(operation === trade_1.Operation.Buy)) return [3 /*break*/, 10];
                buyOrder = {
                    token: token0.address,
                    useWETH: false,
                    numEth: normalizedTrade.inputAmount.raw.toString(),
                    numToken: normalizedTrade
                        .minimumAmountOut(normalizedSlippageTolerance)
                        .raw.toString(),
                    blockTimeDeadline: blockDeadline,
                    fee: 3000,
                };
                return [4 /*yield*/, routerV1_1.estimateGas.executePayable([routerV1_1.interface.encodeFunctionData('buy', [buyOrder])], {
                        value: normalizedTrade.inputAmount.raw.toString(),
                        gasPrice: gasPrice,
                    })];
            case 9:
                gasEstimate = _a.sent();
                return [3 /*break*/, 12];
            case 10:
                sellOrder = {
                    token: token0.address,
                    useWETH: false,
                    numEth: normalizedTrade
                        .minimumAmountOut(normalizedSlippageTolerance)
                        .raw.toString(),
                    numToken: normalizedTrade.inputAmount.raw.toString(),
                    blockTimeDeadline: blockDeadline,
                    fee: 3000,
                };
                return [4 /*yield*/, routerV1_1.estimateGas.executePayable([routerV1_1.interface.encodeFunctionData('sell', [sellOrder])], { gasPrice: gasPrice })];
            case 11:
                gasEstimate = _a.sent();
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                e_3 = _a.sent();
                console.error('estimateGas', e_3);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/, gasEstimate];
        }
    });
}); };
exports.estimateGas = estimateGas;
function calculateGasMargin(value) {
    return value.mul(ethers_1.BigNumber.from(10000 + 2500)).div(ethers_1.BigNumber.from(10000));
}
exports.calculateGasMargin = calculateGasMargin;
function getUserPositions(version, address, tokens, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var checkSummedAddress, vanillaRouter, million, allTokens, ETHPrice, positions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checkSummedAddress = (0, tokens_1.isAddress)(address);
                    vanillaRouter = (0, contracts_1.getVanillaRouter)(version, provider || ethers_1.providers.getDefaultProvider());
                    million = 1000000;
                    allTokens = tokens || (0, tokens_1.getAllTokens)(version);
                    return [4 /*yield*/, (0, spotPrice_1.getSpotPrice)(constants_1.usdcWethPoolAddress, (0, tokens_1.convertVanillaTokenToUniswapToken)(tokens_1.usdc), (0, tokens_1.convertVanillaTokenToUniswapToken)(tokens_1.weth))];
                case 1:
                    ETHPrice = (_a.sent())[0];
                    positions = [];
                    if (!(checkSummedAddress && vanillaRouter)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(allTokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                            var tokenSum, priceResponse, vnlToken, parsedUniToken, tokenAmount, parsedOwnedAmount, parsedValue, trade, e_4, amountOut, parsedAmountOut, reward, _a, vpc, vpcNum, priceData, blockNumber, avgBlock, bhold, btrade, htrs, profitablePrice, usedEstimate, profitPercentage, parsedVnl;
                            var _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        tokenSum = ethers_1.BigNumber.from(0);
                                        return [4 /*yield*/, vanillaRouter.tokenPriceData(checkSummedAddress, token.address)];
                                    case 1:
                                        priceResponse = _e.sent();
                                        tokenSum = priceResponse.tokenSum;
                                        if (!!tokenSum.isZero()) return [3 /*break*/, 14];
                                        vnlToken = new sdk_core_1.Token(constants_1.chainId, (0, utils_1.getAddress)(constants_1.contractAddresses.vanilla[version].vnl), constants_1.vnlDecimals);
                                        parsedUniToken = new sdk_core_1.Token(Number(token.chainId), (0, utils_1.getAddress)(token.address), Number(token.decimals));
                                        tokenAmount = new sdk_core_1.TokenAmount(parsedUniToken, tokenSum.toString());
                                        parsedOwnedAmount = tokenAmount.greaterThan('0')
                                            ? tokenAmount.toSignificant()
                                            : undefined;
                                        parsedValue = tokenAmount.greaterThan('0') && token.price
                                            ? parseFloat(tokenAmount.toSignificant()) *
                                                token.price *
                                                Number(ETHPrice.toSignificant())
                                            : 0;
                                        trade = null;
                                        _e.label = 2;
                                    case 2:
                                        _e.trys.push([2, 7, , 8]);
                                        if (!(version === general_1.VanillaVersion.V1_0)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, (0, trade_2.constructTrade)(provider || ethers_1.providers.getDefaultProvider(), tokenAmount.toSignificant(), tokens_1.weth, token, sdk_core_1.TradeType.EXACT_INPUT)];
                                    case 3:
                                        trade = _e.sent();
                                        return [3 /*break*/, 6];
                                    case 4:
                                        if (!(version === general_1.VanillaVersion.V1_1)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, (0, trade_3.constructTrade)(provider || ethers_1.providers.getDefaultProvider(), tokenAmount.toSignificant(), tokens_1.weth, token, sdk_core_1.TradeType.EXACT_INPUT)];
                                    case 5:
                                        trade = _e.sent();
                                        _e.label = 6;
                                    case 6: return [3 /*break*/, 8];
                                    case 7:
                                        e_4 = _e.sent();
                                        console.error('Could not construct trade: ', e_4);
                                        return [3 /*break*/, 8];
                                    case 8:
                                        amountOut = (_b = trade === null || trade === void 0 ? void 0 : trade.outputAmount.raw) !== null && _b !== void 0 ? _b : undefined;
                                        parsedAmountOut = amountOut && (0, utils_1.formatUnits)(amountOut.toString(), tokens_1.weth.decimals);
                                        reward = null;
                                        if (!amountOut) return [3 /*break*/, 10];
                                        return [4 /*yield*/, (0, exports.estimateReward)(version, address, provider || ethers_1.providers.getDefaultProvider(), token, tokens_1.weth, tokenAmount.toSignificant(), parsedAmountOut)];
                                    case 9:
                                        _a = _e.sent();
                                        return [3 /*break*/, 11];
                                    case 10:
                                        _a = null;
                                        _e.label = 11;
                                    case 11:
                                        // Get reward estimate from Vanilla router
                                        reward = _a;
                                        vpc = null;
                                        if (reward === null || reward === void 0 ? void 0 : reward.vpc) {
                                            vpcNum = (_c = reward === null || reward === void 0 ? void 0 : reward.vpc.toNumber()) !== null && _c !== void 0 ? _c : 0;
                                            vpc = (vpcNum / million).toString();
                                        }
                                        return [4 /*yield*/, (0, exports.getPriceData)(version, address, provider || ethers_1.providers.getDefaultProvider(), token.address)];
                                    case 12:
                                        priceData = _e.sent();
                                        return [4 /*yield*/, (provider || ethers_1.providers.getDefaultProvider()).getBlockNumber()];
                                    case 13:
                                        blockNumber = _e.sent();
                                        avgBlock = (_d = priceData === null || priceData === void 0 ? void 0 : priceData.weightedBlockSum.div(priceData === null || priceData === void 0 ? void 0 : priceData.tokenSum)) !== null && _d !== void 0 ? _d : ethers_1.BigNumber.from('0');
                                        bhold = ethers_1.BigNumber.from(blockNumber.toString()).sub(avgBlock);
                                        btrade = constants_1.epoch
                                            ? ethers_1.BigNumber.from(blockNumber.toString()).sub(constants_1.epoch)
                                            : ethers_1.BigNumber.from('0');
                                        htrs = '0';
                                        try {
                                            htrs = (bhold.mul(bhold).mul(million).div(btrade.mul(btrade)).toNumber() /
                                                million).toString();
                                        }
                                        catch (e) {
                                            console.error('Could not calculate HTRS: ', e);
                                        }
                                        profitablePrice = void 0;
                                        usedEstimate = void 0;
                                        if (version === general_1.VanillaVersion.V1_0 && (reward === null || reward === void 0 ? void 0 : reward.profitablePrice)) {
                                            profitablePrice = (0, utils_1.formatUnits)(reward.profitablePrice);
                                        }
                                        else if (version === general_1.VanillaVersion.V1_1 && (reward === null || reward === void 0 ? void 0 : reward.estimate)) {
                                            switch (Number(token.fee)) {
                                                case v3_sdk_1.FeeAmount.LOW:
                                                    usedEstimate = 'low';
                                                    break;
                                                case v3_sdk_1.FeeAmount.MEDIUM:
                                                    usedEstimate = 'medium';
                                                    break;
                                                case v3_sdk_1.FeeAmount.HIGH:
                                                    usedEstimate = 'high';
                                                    break;
                                                default:
                                                    usedEstimate = 'medium';
                                            }
                                            profitablePrice = (0, utils_1.formatUnits)(reward === null || reward === void 0 ? void 0 : reward.estimate[usedEstimate].profitablePrice);
                                        }
                                        profitPercentage = 0;
                                        try {
                                            profitPercentage =
                                                reward && profitablePrice && parsedAmountOut
                                                    ? -(parseFloat(profitablePrice) - parseFloat(parsedAmountOut)) /
                                                        parseFloat(profitablePrice)
                                                    : 0;
                                        }
                                        catch (e) {
                                            console.error('Could not calculate profit percentage. Falling back to 0: ', e);
                                        }
                                        parsedVnl = 0;
                                        if (version === general_1.VanillaVersion.V1_0 && (reward === null || reward === void 0 ? void 0 : reward.reward)) {
                                            parsedVnl = parseFloat(new sdk_core_1.TokenAmount(vnlToken, reward.reward.toString()).toSignificant());
                                        }
                                        else if (version === general_1.VanillaVersion.V1_1 && (reward === null || reward === void 0 ? void 0 : reward.estimate)) {
                                            parsedVnl = parseFloat(new sdk_core_1.TokenAmount(vnlToken, reward.estimate[usedEstimate].reward.toString()).toSignificant());
                                        }
                                        return [2 /*return*/, __assign(__assign({}, token), { owned: parsedOwnedAmount, ownedRaw: tokenAmount.raw.toString(), value: parsedValue, htrs: htrs, vpc: vpc, profit: profitPercentage, vnl: parsedVnl })];
                                    case 14: return [2 /*return*/, token];
                                }
                            });
                        }); }))];
                case 2:
                    positions = _a.sent();
                    positions = positions.filter(function (token) { return token.owned; });
                    _a.label = 3;
                case 3: return [2 /*return*/, positions];
            }
        });
    });
}
exports.getUserPositions = getUserPositions;
