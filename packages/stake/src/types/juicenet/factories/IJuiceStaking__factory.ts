/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IJuiceStaking, IJuiceStakingInterface } from "../IJuiceStaking";

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
    inputs: [],
    name: "InvalidNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSender",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
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
    inputs: [
      {
        internalType: "uint256",
        name: "targetLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountLength",
        type: "uint256",
      },
    ],
    name: "MintTargetMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "expected",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "actual",
        type: "uint8",
      },
    ],
    name: "OracleDecimalMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "PermissionExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokensLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oraclesLength",
        type: "uint256",
      },
    ],
    name: "TokenOracleMismatch",
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
        name: "sentiment",
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
        name: "sentiment",
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
        internalType: "contract IJuiceSignalAggregator",
        name: "aggregator",
        type: "address",
      },
    ],
    name: "authorizeSignalAggregator",
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
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "currentStake",
    outputs: [
      {
        internalType: "uint256",
        name: "juiceStake",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "juiceValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "sentiment",
        type: "bool",
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
            name: "data",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct SignedPermission",
        name: "permission",
        type: "tuple",
      },
    ],
    name: "delegateDeposit",
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
        name: "stakes",
        type: "tuple[]",
      },
      {
        components: [
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
            name: "data",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct SignedPermission",
        name: "permission",
        type: "tuple",
      },
    ],
    name: "delegateModifyStakes",
    outputs: [],
    stateMutability: "nonpayable",
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
            name: "data",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct SignedPermission",
        name: "permission",
        type: "tuple",
      },
    ],
    name: "delegateWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "pauseStaking",
        type: "bool",
      },
    ],
    name: "emergencyPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "mintJuice",
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
    inputs: [],
    name: "normalizedAggregateSignal",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "weight",
                type: "uint96",
              },
            ],
            internalType: "struct LongTokenSignal[]",
            name: "longTokens",
            type: "tuple[]",
          },
        ],
        internalType: "struct AggregateTokenSignal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
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
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "contract IPriceOracle[]",
        name: "oracles",
        type: "address[]",
      },
    ],
    name: "updatePriceOracles",
    outputs: [],
    stateMutability: "nonpayable",
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

export class IJuiceStaking__factory {
  static readonly abi = _abi;
  static createInterface(): IJuiceStakingInterface {
    return new utils.Interface(_abi) as IJuiceStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IJuiceStaking {
    return new Contract(address, _abi, signerOrProvider) as IJuiceStaking;
  }
}
