export function ipfsToHttp(src, gateway = 'ipfs.io/ipfs') {
    if (!src)
        return '';
    return src.replace('ipfs://', `https://${gateway}/`);
}
