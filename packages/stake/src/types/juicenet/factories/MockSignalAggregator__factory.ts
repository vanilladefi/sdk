/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockSignalAggregator,
  MockSignalAggregatorInterface,
} from "../MockSignalAggregator";

const _abi = [
  {
    anonymous: false,
    inputs: [],
    name: "SignalWasUpdated",
    type: "event",
  },
  {
    inputs: [
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
        name: "signal",
        type: "tuple",
      },
    ],
    name: "signalUpdated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060df8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806374ff032b14602d575b600080fd5b603c6038366004606a565b603e565b005b6040517f3d7ccbfa6389e6ef484c1d678de48545d9bc7e1293e82ebeac33a6b02f8fe9eb90600090a150565b600060208284031215607b57600080fd5b813567ffffffffffffffff811115609157600080fd5b82016020818503121560a257600080fd5b939250505056fea2646970667358221220b84f852b9142e0d37f82caa425455dad88a3b519350bd0a2474cf00685c226e764736f6c634300080a0033";

export class MockSignalAggregator__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockSignalAggregator> {
    return super.deploy(overrides || {}) as Promise<MockSignalAggregator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockSignalAggregator {
    return super.attach(address) as MockSignalAggregator;
  }
  connect(signer: Signer): MockSignalAggregator__factory {
    return super.connect(signer) as MockSignalAggregator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockSignalAggregatorInterface {
    return new utils.Interface(_abi) as MockSignalAggregatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockSignalAggregator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as MockSignalAggregator;
  }
}