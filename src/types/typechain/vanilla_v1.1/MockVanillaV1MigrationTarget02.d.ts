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

interface MockVanillaV1MigrationTarget02Interface
  extends ethers.utils.Interface {
  functions: {
    "migrateState(address,address,uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "migrateState",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "migrateState",
    data: BytesLike
  ): Result;

  events: {
    "MigrationParams(address,address,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MigrationParams"): EventFragment;
}

export class MockVanillaV1MigrationTarget02 extends BaseContract {
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

  interface: MockVanillaV1MigrationTarget02Interface;

  functions: {
    migrateState(
      owner: string,
      token: string,
      ethSum: BigNumberish,
      tokenSum: BigNumberish,
      weightedBlockSum: BigNumberish,
      latestBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  migrateState(
    owner: string,
    token: string,
    ethSum: BigNumberish,
    tokenSum: BigNumberish,
    weightedBlockSum: BigNumberish,
    latestBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    migrateState(
      owner: string,
      token: string,
      ethSum: BigNumberish,
      tokenSum: BigNumberish,
      weightedBlockSum: BigNumberish,
      latestBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    MigrationParams(
      owner?: null,
      token?: null,
      ethSum?: null,
      tokenSum?: null,
      weightedBlockSum?: null,
      latestBlock?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        owner: string;
        token: string;
        ethSum: BigNumber;
        tokenSum: BigNumber;
        weightedBlockSum: BigNumber;
        latestBlock: BigNumber;
      }
    >;
  };

  estimateGas: {
    migrateState(
      owner: string,
      token: string,
      ethSum: BigNumberish,
      tokenSum: BigNumberish,
      weightedBlockSum: BigNumberish,
      latestBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    migrateState(
      owner: string,
      token: string,
      ethSum: BigNumberish,
      tokenSum: BigNumberish,
      weightedBlockSum: BigNumberish,
      latestBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}