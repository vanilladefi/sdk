/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IJuiceStakerActionsInterface extends ethers.utils.Interface {
  functions: {
    "deposit(uint256)": FunctionFragment;
    "modifyStakes(tuple[])": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyStakes",
    values: [{ token: string; amount: BigNumberish; sentiment: boolean }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "modifyStakes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "JUICEDeposited(address,uint256)": EventFragment;
    "JUICEWithdrawn(address,uint256)": EventFragment;
    "StakeAdded(address,address,bool,uint256,int256)": EventFragment;
    "StakeRemoved(address,address,bool,uint256,int256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "JUICEDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JUICEWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeRemoved"): EventFragment;
}

export type JUICEDepositedEvent = TypedEvent<
  [string, BigNumber] & { user: string; amount: BigNumber }
>;

export type JUICEWithdrawnEvent = TypedEvent<
  [string, BigNumber] & { user: string; amount: BigNumber }
>;

export type StakeAddedEvent = TypedEvent<
  [string, string, boolean, BigNumber, BigNumber] & {
    user: string;
    token: string;
    sentiment: boolean;
    price: BigNumber;
    unstakedDiff: BigNumber;
  }
>;

export type StakeRemovedEvent = TypedEvent<
  [string, string, boolean, BigNumber, BigNumber] & {
    user: string;
    token: string;
    sentiment: boolean;
    price: BigNumber;
    unstakedDiff: BigNumber;
  }
>;

export class IJuiceStakerActions extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IJuiceStakerActionsInterface;

  functions: {
    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  modifyStakes(
    stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "JUICEDeposited(address,uint256)"(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    JUICEDeposited(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    "JUICEWithdrawn(address,uint256)"(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    JUICEWithdrawn(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    "StakeAdded(address,address,bool,uint256,int256)"(
      user?: string | null,
      token?: string | null,
      sentiment?: null,
      price?: null,
      unstakedDiff?: null
    ): TypedEventFilter<
      [string, string, boolean, BigNumber, BigNumber],
      {
        user: string;
        token: string;
        sentiment: boolean;
        price: BigNumber;
        unstakedDiff: BigNumber;
      }
    >;

    StakeAdded(
      user?: string | null,
      token?: string | null,
      sentiment?: null,
      price?: null,
      unstakedDiff?: null
    ): TypedEventFilter<
      [string, string, boolean, BigNumber, BigNumber],
      {
        user: string;
        token: string;
        sentiment: boolean;
        price: BigNumber;
        unstakedDiff: BigNumber;
      }
    >;

    "StakeRemoved(address,address,bool,uint256,int256)"(
      user?: string | null,
      token?: string | null,
      sentiment?: null,
      price?: null,
      unstakedDiff?: null
    ): TypedEventFilter<
      [string, string, boolean, BigNumber, BigNumber],
      {
        user: string;
        token: string;
        sentiment: boolean;
        price: BigNumber;
        unstakedDiff: BigNumber;
      }
    >;

    StakeRemoved(
      user?: string | null,
      token?: string | null,
      sentiment?: null,
      price?: null,
      unstakedDiff?: null
    ): TypedEventFilter<
      [string, string, boolean, BigNumber, BigNumber],
      {
        user: string;
        token: string;
        sentiment: boolean;
        price: BigNumber;
        unstakedDiff: BigNumber;
      }
    >;
  };

  estimateGas: {
    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
