# Vanilla SDK Monorepo

Contains the [Vanilla](https://vanilladefi.com/) software development kits to interface with Vanilla smart contracts on the Ethereum and Polygon blockchains.

## Published versions

| Package                      | Latest       |
| ---------------------------- |-------------:|
| [**@vanilladefi/core-sdk**](https://github.com/vanilladefi/sdk/tree/next/packages/core)    | [![npm version](https://badge.fury.io/js/@vanilladefi%2Fcore-sdk.svg)](https://badge.fury.io/js/@vanilladefi%2Fcore-sdk) |
| [**@vanilladefi/stake-sdk**](https://github.com/vanilladefi/sdk/tree/next/packages/stake)   | [![npm version](https://badge.fury.io/js/@vanilladefi%2Fstake-sdk.svg)](https://badge.fury.io/js/@vanilladefi%2Fstake-sdk)      |
| [**@vanilladefi/trade-sdk**](https://github.com/vanilladefi/sdk/tree/next/packages/trade)   | [![npm version](https://badge.fury.io/js/@vanilladefi%2Ftrade-sdk.svg)](https://badge.fury.io/js/@vanilladefi%2Ftrade-sdk)      |

## Developing

The repository uses [lerna](https://github.com/lerna/lerna) and yarn to manage three packages under this same repo. Lerna commands have been abstracted away though in favor of our own best-practices.

### Install

```bash
git clone git@github.com:vanilladefi/sdk.git
cd sdk

yarn install
yarn bootstrap
```

### Test

```bash
yarn test
```

### Build

```bash
yarn build
```
