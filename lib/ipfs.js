"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsToHttp = void 0;
function ipfsToHttp(src, gateway) {
    if (gateway === void 0) { gateway = 'ipfs.io/ipfs'; }
    if (!src)
        return '';
    return src.replace('ipfs://', "https://" + gateway + "/");
}
exports.ipfsToHttp = ipfsToHttp;
