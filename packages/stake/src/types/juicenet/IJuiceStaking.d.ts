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

export interface IJuiceStakingInterface extends ethers.utils.Interface {
  functions: {
    "aggregateSignal(address[])": FunctionFragment;
    "authorizeSignalAggregator(address)": FunctionFragment;
    "currentStake(address,address)": FunctionFragment;
    "delegateDeposit(uint256,tuple)": FunctionFragment;
    "delegateModifyStakes(tuple[],tuple)": FunctionFragment;
    "delegateWithdraw(uint256,tuple)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "emergencyPause(bool)": FunctionFragment;
    "mintJuice(address[],uint256[])": FunctionFragment;
    "modifyStakes(tuple[])": FunctionFragment;
    "unstakedBalanceOf(address)": FunctionFragment;
    "updatePriceOracles(address[],address[])": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "aggregateSignal",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizeSignalAggregator",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "currentStake",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateDeposit",
    values: [
      BigNumberish,
      {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateModifyStakes",
    values: [
      { token: string; amount: BigNumberish; sentiment: boolean }[],
      {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateWithdraw",
    values: [
      BigNumberish,
      {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyPause",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "mintJuice",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyStakes",
    values: [{ token: string; amount: BigNumberish; sentiment: boolean }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakedBalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePriceOracles",
    values: [string[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "aggregateSignal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizeSignalAggregator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegateDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegateModifyStakes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegateWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "emergencyPause",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintJuice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "modifyStakes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unstakedBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePriceOracles",
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

export class IJuiceStaking extends BaseContract {
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

  interface: IJuiceStakingInterface;

  functions: {
    aggregateSignal(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    authorizeSignalAggregator(
      aggregator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { amount: BigNumber; sentiment: boolean }
    >;

    delegateDeposit(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    delegateModifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    delegateWithdraw(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emergencyPause(
      pauseStaking: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintJuice(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { unstakedJUICE: BigNumber }>;

    updatePriceOracles(
      tokens: string[],
      oracles: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  aggregateSignal(
    tokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  authorizeSignalAggregator(
    aggregator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  currentStake(
    user: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { amount: BigNumber; sentiment: boolean }>;

  delegateDeposit(
    amount: BigNumberish,
    permission: {
      data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
      signature: BytesLike;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  delegateModifyStakes(
    stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
    permission: {
      data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
      signature: BytesLike;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  delegateWithdraw(
    amount: BigNumberish,
    permission: {
      data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
      signature: BytesLike;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emergencyPause(
    pauseStaking: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintJuice(
    recipients: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  modifyStakes(
    stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstakedBalanceOf(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  updatePriceOracles(
    tokens: string[],
    oracles: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    aggregateSignal(tokens: string[], overrides?: CallOverrides): Promise<void>;

    authorizeSignalAggregator(
      aggregator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { amount: BigNumber; sentiment: boolean }
    >;

    delegateDeposit(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    delegateModifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    delegateWithdraw(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    emergencyPause(
      pauseStaking: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    mintJuice(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: CallOverrides
    ): Promise<void>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updatePriceOracles(
      tokens: string[],
      oracles: string[],
      overrides?: CallOverrides
    ): Promise<void>;

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
    aggregateSignal(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    authorizeSignalAggregator(
      aggregator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    delegateDeposit(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    delegateModifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    delegateWithdraw(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emergencyPause(
      pauseStaking: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintJuice(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updatePriceOracles(
      tokens: string[],
      oracles: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    aggregateSignal(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    authorizeSignalAggregator(
      aggregator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    currentStake(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delegateDeposit(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    delegateModifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    delegateWithdraw(
      amount: BigNumberish,
      permission: {
        data: { sender: string; deadline: BigNumberish; nonce: BigNumberish };
        signature: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emergencyPause(
      pauseStaking: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintJuice(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    modifyStakes(
      stakes: { token: string; amount: BigNumberish; sentiment: boolean }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstakedBalanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updatePriceOracles(
      tokens: string[],
      oracles: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}