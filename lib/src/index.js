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
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("src/constants");
var contracts = require("src/contracts");
var ipfs = require("src/ipfs");
var migration = require("src/migration");
var tokens = require("src/tokens");
var trades = require("src/trades");
var users = require("src/users");
exports.default = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, constants), contracts), ipfs), migration), tokens), trades), users);
