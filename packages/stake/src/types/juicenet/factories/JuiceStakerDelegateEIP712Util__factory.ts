/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  JuiceStakerDelegateEIP712Util,
  JuiceStakerDelegateEIP712UtilInterface,
} from "../JuiceStakerDelegateEIP712Util";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct Permission",
        name: "permission",
        type: "tuple",
      },
    ],
    name: "hashDeposit",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "sentiment",
            type: "bool",
          },
        ],
        internalType: "struct StakingParam[]",
        name: "params",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct Permission",
        name: "permission",
        type: "tuple",
      },
    ],
    name: "hashModifyStakes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct Permission",
        name: "permission",
        type: "tuple",
      },
    ],
    name: "hashWithdraw",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export class JuiceStakerDelegateEIP712Util__factory {
  static readonly abi = _abi;
  static createInterface(): JuiceStakerDelegateEIP712UtilInterface {
    return new utils.Interface(_abi) as JuiceStakerDelegateEIP712UtilInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JuiceStakerDelegateEIP712Util {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as JuiceStakerDelegateEIP712Util;
  }
}
