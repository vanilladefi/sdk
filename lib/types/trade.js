"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Liquidity = exports.Action = exports.Eligibility = exports.Operation = void 0;
var Operation;
(function (Operation) {
    Operation["Buy"] = "buy";
    Operation["Sell"] = "sell";
})(Operation = exports.Operation || (exports.Operation = {}));
var Eligibility;
(function (Eligibility) {
    Eligibility[Eligibility["NotEligible"] = 0] = "NotEligible";
    Eligibility[Eligibility["Eligible"] = 1] = "Eligible";
})(Eligibility = exports.Eligibility || (exports.Eligibility = {}));
var Action;
(function (Action) {
    Action["PURCHASE"] = "purchase";
    Action["SALE"] = "sale";
    Action["APPROVAL"] = "approval";
    Action["CONVERSION"] = "conversion";
})(Action = exports.Action || (exports.Action = {}));
var Liquidity;
(function (Liquidity) {
    Liquidity[Liquidity["LOW"] = 500] = "LOW";
    Liquidity[Liquidity["MEDIUM"] = 1000] = "MEDIUM";
    Liquidity[Liquidity["HIGH"] = 2000] = "HIGH";
})(Liquidity = exports.Liquidity || (exports.Liquidity = {}));
