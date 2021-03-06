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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface JuiceStakerDelegateEIP712UtilInterface
  extends ethers.utils.Interface {
  functions: {
    "hashDeposit(uint256,(address,uint256,uint256))": FunctionFragment;
    "hashModifyStakes(tuple[],(address,uint256,uint256))": FunctionFragment;
    "hashWithdraw(uint256,(address,uint256,uint256))": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "hashDeposit",
    values: [
      BigNumberish,
      { sender: string; deadline: BigNumberish; nonce: BigNumberish }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "hashModifyStakes",
    values: [
      { token: string; amount: BigNumberish; sentiment: boolean }[],
      { sender: string; deadline: BigNumberish; nonce: BigNumberish }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "hashWithdraw",
    values: [
      BigNumberish,
      { sender: string; deadline: BigNumberish; nonce: BigNumberish }
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "hashDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashModifyStakes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashWithdraw",
    data: BytesLike
  ): Result;

  events: {};
}

export class JuiceStakerDelegateEIP712Util extends BaseContract {
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

  interface: JuiceStakerDelegateEIP712UtilInterface;

  functions: {
    hashDeposit(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[string]>;

    hashModifyStakes(
      params: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[string]>;

    hashWithdraw(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  hashDeposit(
    amount: BigNumberish,
    permission: { sender: string; deadline: BigNumberish; nonce: BigNumberish },
    overrides?: CallOverrides
  ): Promise<string>;

  hashModifyStakes(
    params: { token: string; amount: BigNumberish; sentiment: boolean }[],
    permission: { sender: string; deadline: BigNumberish; nonce: BigNumberish },
    overrides?: CallOverrides
  ): Promise<string>;

  hashWithdraw(
    amount: BigNumberish,
    permission: { sender: string; deadline: BigNumberish; nonce: BigNumberish },
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    hashDeposit(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<string>;

    hashModifyStakes(
      params: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<string>;

    hashWithdraw(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    hashDeposit(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashModifyStakes(
      params: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashWithdraw(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    hashDeposit(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashModifyStakes(
      params: { token: string; amount: BigNumberish; sentiment: boolean }[],
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashWithdraw(
      amount: BigNumberish,
      permission: {
        sender: string;
        deadline: BigNumberish;
        nonce: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
