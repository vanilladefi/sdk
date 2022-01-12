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
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IJUICEStakingInterface extends ethers.utils.Interface {
  functions: {
    "currentStake(address,address)": FunctionFragment;
    "deposit(uint256,tuple)": FunctionFragment;
    "modifyStakes(tuple[])": FunctionFragment;
    "unstakedBalanceOf(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "currentStake",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      BigNumberish,
      {
        owner: string;
        spender: string;
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyStakes",
    values: [
      { token: string; stake: { amount: BigNumberish; isShort: boolean } }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakedBalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "currentStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "modifyStakes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unstakedBalanceOf",
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

export class IJUICEStaking extends BaseContract {
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

  interface: IJUICEStakingInterface;

  functions: {
    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [[BigNumber, boolean] & { amount: BigNumber; isShort: boolean }] & {
        stake: [BigNumber, boolean] & { amount: BigNumber; isShort: boolean };
      }
    >;

    deposit(
      amount: BigNumberish,
      permit: {
        owner: string;
        spender: string;
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    modifyStakes(
      stakes: {
        token: string;
        stake: { amount: BigNumberish; isShort: boolean };
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { unstakedJUICE: BigNumber }>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  currentStake(
    user: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { amount: BigNumber; isShort: boolean }>;

  deposit(
    amount: BigNumberish,
    permit: {
      owner: string;
      spender: string;
      value: BigNumberish;
      deadline: BigNumberish;
      v: BigNumberish;
      r: BytesLike;
      s: BytesLike;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  modifyStakes(
    stakes: {
      token: string;
      stake: { amount: BigNumberish; isShort: boolean };
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstakedBalanceOf(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { amount: BigNumber; isShort: boolean }>;

    deposit(
      amount: BigNumberish,
      permit: {
        owner: string;
        spender: string;
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    modifyStakes(
      stakes: {
        token: string;
        stake: { amount: BigNumberish; isShort: boolean };
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    JUICEDeposited(
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

    StakeAdded(
      user?: string | null,
      token?: string | null,
      isShort?: null,
      price?: null,
      unstakedDiff?: null
    ): TypedEventFilter<
      [string, string, boolean, BigNumber, BigNumber],
      {
        user: string;
        token: string;
        isShort: boolean;
        price: BigNumber;
        unstakedDiff: BigNumber;
      }
    >;

    StakeRemoved(
      user?: string | null,
      token?: string | null,
      isShort?: null,
      price?: null,
      unstakedDiff?: null
    ): TypedEventFilter<
      [string, string, boolean, BigNumber, BigNumber],
      {
        user: string;
        token: string;
        isShort: boolean;
        price: BigNumber;
        unstakedDiff: BigNumber;
      }
    >;
  };

  estimateGas: {
    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposit(
      amount: BigNumberish,
      permit: {
        owner: string;
        spender: string;
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    modifyStakes(
      stakes: {
        token: string;
        stake: { amount: BigNumberish; isShort: boolean };
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      permit: {
        owner: string;
        spender: string;
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    modifyStakes(
      stakes: {
        token: string;
        stake: { amount: BigNumberish; isShort: boolean };
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}