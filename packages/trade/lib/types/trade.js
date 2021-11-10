export var Operation;
(function (Operation) {
    Operation["Buy"] = "buy";
    Operation["Sell"] = "sell";
})(Operation || (Operation = {}));
export var Action;
(function (Action) {
    Action["PURCHASE"] = "purchase";
    Action["SALE"] = "sale";
    Action["APPROVAL"] = "approval";
    Action["CONVERSION"] = "conversion";
})(Action || (Action = {}));
export var Liquidity;
(function (Liquidity) {
    Liquidity[Liquidity["LOW"] = 500] = "LOW";
    Liquidity[Liquidity["MEDIUM"] = 1000] = "MEDIUM";
    Liquidity[Liquidity["HIGH"] = 2000] = "HIGH";
})(Liquidity || (Liquidity = {}));
