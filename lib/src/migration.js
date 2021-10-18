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
exports.snapshot = exports.toKeccak256Leaf = void 0;
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var merkletreejs_1 = require("merkletreejs");
var VanillaV1MigrationState__factory_1 = require("types/typechain/vanilla_v1.1/factories/VanillaV1MigrationState__factory");
var toSnapshotState = function (state, event) {
    var prev = state.accounts[event.to] || ethers_1.BigNumber.from(0);
    state.accounts[event.to] = prev.add(event.value);
    if (event.from !== ethers_1.constants.AddressZero) {
        if (!state.accounts[event.from]) {
            if (event.value.gt(0)) {
                throw new Error("something went wrong in " + event.blockNumber + " from=" + event.from + " value=" + event.value);
            }
            state.accounts[event.from] = ethers_1.BigNumber.from(0);
        }
        prev = state.accounts[event.from];
        state.accounts[event.from] = prev.sub(event.value);
    }
    state.blockNumber = Math.max(event.blockNumber, state.blockNumber || 0);
    return state;
};
var toKeccak256Leaf = function (balance) {
    return ethers_1.utils.solidityKeccak256(['address', 'string', 'uint256'], [balance.address, ':', balance.amount]);
};
exports.toKeccak256Leaf = toKeccak256Leaf;
var snapshot = function (token01, token02) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshotBlock, tokenTransfers, _a, byBlockIndexOrder, transfers, snapshotState, blockAtSnapshot, leaves, merkleTree, root;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, token02
                    .migrationState()
                    .then(function (address) {
                    return VanillaV1MigrationState__factory_1.VanillaV1MigrationState__factory.connect(address, token02.provider).blockNumber();
                })];
            case 1:
                snapshotBlock = _b.sent();
                if (!snapshotBlock.eq(0)) return [3 /*break*/, 3];
                return [4 /*yield*/, token01.queryFilter(token01.filters.Transfer(null, null, null))];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, token01.queryFilter(token01.filters.Transfer(null, null, null), 0, snapshotBlock.toNumber())];
            case 4:
                _a = _b.sent();
                _b.label = 5;
            case 5:
                tokenTransfers = _a;
                byBlockIndexOrder = function (a, b) {
                    return a.blockNumber - b.blockNumber || a.logIndex - b.logIndex;
                };
                transfers = tokenTransfers
                    .sort(byBlockIndexOrder)
                    .map(function (_a) {
                    var blockNumber = _a.blockNumber, args = _a.args;
                    return (__assign({ blockNumber: blockNumber }, args));
                });
                snapshotState = transfers.reduce(toSnapshotState, {
                    blockNumber: 0,
                    accounts: {},
                    timeStamp: 0,
                    conversionDeadline: 0,
                });
                return [4 /*yield*/, token01.provider.getBlock(snapshotState.blockNumber)];
            case 6:
                blockAtSnapshot = _b.sent();
                snapshotState.timeStamp = blockAtSnapshot.timestamp;
                leaves = Object.entries(snapshotState.accounts).map(function (_a) {
                    var address = _a[0], amount = _a[1];
                    return ({
                        address: address,
                        amount: amount,
                        hash: (0, exports.toKeccak256Leaf)({ address: address, amount: amount }),
                    });
                });
                merkleTree = new merkletreejs_1.MerkleTree(leaves.map(function (x) { return x.hash; }), utils_1.keccak256, { sortPairs: true, hashLeaves: false });
                if (merkleTree.getHexRoot() === '0x' && leaves.length > 0) {
                    console.table(leaves);
                    throw new Error('Invalid root');
                }
                root = ethers_1.utils.hexZeroPad(merkleTree.getHexRoot(), 32);
                return [2 /*return*/, {
                        snapshotState: snapshotState,
                        getProof: function (balance) {
                            return merkleTree
                                .getHexProof((0, exports.toKeccak256Leaf)(balance))
                                .map(function (hex) { return ethers_1.utils.hexZeroPad(hex, 32); });
                        },
                        verify: function (balance, root) {
                            var leaf = (0, exports.toKeccak256Leaf)(balance);
                            return merkleTree.verify(merkleTree.getHexProof(leaf), leaf, root);
                        },
                        root: root,
                        merkleTree: merkleTree,
                    }];
        }
    });
}); };
exports.snapshot = snapshot;
