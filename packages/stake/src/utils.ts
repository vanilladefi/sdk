import { preferences } from "./preferences";

const setContractAddress = (address: string) => {
    preferences.contractAddress = address
}


let __UNSAFE__setContractAddress: any;
if (preferences.exposeUnsafeUtils) {
    __UNSAFE__setContractAddress = setContractAddress
}

export { __UNSAFE__setContractAddress }
