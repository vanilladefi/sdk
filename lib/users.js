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
exports.getVnlHolders = exports.getBasicWalletDetails = exports.getUsers = void 0;
var units_1 = require("@ethersproject/units");
var v3_sdk_1 = require("@uniswap/v3-sdk");
var contracts_1 = require("contracts");
var ethers_1 = require("ethers");
var tokens_1 = require("tokens");
var general_1 = require("types/general");
var ERC20__factory_1 = require("types/typechain/vanilla_v1.1/factories/ERC20__factory");
var getUsers = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    var users, vnlRouter, vnlLegacyRouter, purchaseFilter, events, legacyFilter, legacyEvents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = [];
                vnlRouter = (0, contracts_1.getVanillaRouter)(general_1.VanillaVersion.V1_1, provider || ethers_1.providers.getDefaultProvider());
                vnlLegacyRouter = (0, contracts_1.getVanillaRouter)(general_1.VanillaVersion.V1_0, provider || ethers_1.providers.getDefaultProvider());
                purchaseFilter = vnlRouter.filters.TokensPurchased();
                return [4 /*yield*/, vnlRouter.queryFilter(purchaseFilter, contracts_1.epoch)];
            case 1:
                events = _a.sent();
                events.forEach(function (event) {
                    var _a;
                    var walletAddress = (0, tokens_1.isAddress)((_a = event === null || event === void 0 ? void 0 : event.args) === null || _a === void 0 ? void 0 : _a.buyer);
                    if (walletAddress && !users.includes(walletAddress)) {
                        users.push(walletAddress);
                    }
                });
                legacyFilter = vnlLegacyRouter.filters.TokensPurchased();
                return [4 /*yield*/, vnlLegacyRouter.queryFilter(legacyFilter, contracts_1.epoch)];
            case 2:
                legacyEvents = _a.sent();
                legacyEvents.forEach(function (event) {
                    var _a;
                    var walletAddress = (0, tokens_1.isAddress)((_a = event === null || event === void 0 ? void 0 : event.args) === null || _a === void 0 ? void 0 : _a.buyer);
                    if (walletAddress && !users.includes(walletAddress)) {
                        users.push(walletAddress);
                    }
                });
                return [2 /*return*/, users];
        }
    });
}); };
exports.getUsers = getUsers;
var getBasicWalletDetails = function (vanillaVersion, walletAddress, provider) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, vnlBalance, ethBalance, vnl, _b, _c, e_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = ['0', '0'], vnlBalance = _a[0], ethBalance = _a[1];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                if (!(0, tokens_1.isAddress)(walletAddress)) return [3 /*break*/, 4];
                vnl = (0, contracts_1.getVanillaTokenContract)(vanillaVersion, provider || ethers_1.providers.getDefaultProvider());
                _b = units_1.formatUnits;
                return [4 /*yield*/, vnl.balanceOf(walletAddress)];
            case 2:
                vnlBalance = _b.apply(void 0, [_d.sent(), contracts_1.vnlDecimals]);
                _c = units_1.formatUnits;
                return [4 /*yield*/, (0, tokens_1.getBalance)(walletAddress, provider || ethers_1.providers.getDefaultProvider())];
            case 3:
                ethBalance = _c.apply(void 0, [_d.sent()]);
                _d.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_1 = _d.sent();
                console.error("getBasicWalletDetails failed for address " + walletAddress + ": " + e_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, { vnlBalance: vnlBalance, ethBalance: ethBalance }];
        }
    });
}); };
exports.getBasicWalletDetails = getBasicWalletDetails;
var getVnlHolders = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    var vnlToken, vnlRouter, epoch, transferFilter, events, vnlHolders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vnlToken = ERC20__factory_1.ERC20__factory.connect(contracts_1.contractAddresses.vanilla[general_1.VanillaVersion.V1_1].vnl, provider || ethers_1.providers.getDefaultProvider());
                vnlRouter = (0, contracts_1.getVanillaRouter)(general_1.VanillaVersion.V1_1, provider || ethers_1.providers.getDefaultProvider());
                return [4 /*yield*/, vnlRouter.epoch()];
            case 1:
                epoch = _a.sent();
                transferFilter = vnlToken.filters.Transfer();
                return [4 /*yield*/, vnlToken.queryFilter(transferFilter, epoch.toNumber())];
            case 2:
                events = _a.sent();
                vnlHolders = new Set();
                events.forEach(function (event) {
                    var _a, _b, _c, _d;
                    ((_a = event === null || event === void 0 ? void 0 : event.args) === null || _a === void 0 ? void 0 : _a.from) !== v3_sdk_1.ADDRESS_ZERO && vnlHolders.add((_b = event === null || event === void 0 ? void 0 : event.args) === null || _b === void 0 ? void 0 : _b.from);
                    ((_c = event === null || event === void 0 ? void 0 : event.args) === null || _c === void 0 ? void 0 : _c.to) !== v3_sdk_1.ADDRESS_ZERO && vnlHolders.add((_d = event === null || event === void 0 ? void 0 : event.args) === null || _d === void 0 ? void 0 : _d.to);
                });
                vnlHolders.forEach(function (holder) { return __awaiter(void 0, void 0, void 0, function () {
                    var balance;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, vnlToken.balanceOf(holder)];
                            case 1:
                                balance = _a.sent();
                                if (balance.isZero()) {
                                    vnlHolders.delete(holder);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, Array.from(vnlHolders)];
        }
    });
}); };
exports.getVnlHolders = getVnlHolders;
