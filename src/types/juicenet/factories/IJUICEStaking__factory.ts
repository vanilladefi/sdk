/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IJUICEStaking, IJUICEStakingInterface } from "../IJUICEStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256",
      },
    ],
    name: "InsufficientJUICE",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "InvalidToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "JUICEDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "JUICEWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isShort",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "unstakedDiff",
        type: "int256",
      },
    ],
    name: "StakeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isShort",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "unstakedDiff",
        type: "int256",
      },
    ],
    name: "StakeRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "currentStake",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "isShort",
            type: "bool",
          },
        ],
        internalType: "struct IJUICEStaking.StakePosition",
        name: "stake",
        type: "tuple",
      },
    ],
    stateMutability: "view",
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
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct IJUICEStaking.JUICEPermit",
        name: "permit",
        type: "tuple",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
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
            components: [
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "bool",
                name: "isShort",
                type: "bool",
              },
            ],
            internalType: "struct IJUICEStaking.StakePosition",
            name: "stake",
            type: "tuple",
          },
        ],
        internalType: "struct IJUICEStaking.StakingParam[]",
        name: "stakes",
        type: "tuple[]",
      },
    ],
    name: "modifyStakes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "unstakedBalanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "unstakedJUICE",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IJUICEStaking__factory {
  static readonly abi = _abi;
  static createInterface(): IJUICEStakingInterface {
    return new utils.Interface(_abi) as IJUICEStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IJUICEStaking {
    return new Contract(address, _abi, signerOrProvider) as IJUICEStaking;
  }
}
