# Vanilla SDK Monorepo

Contains the [Vanilla](https://vanilladefi.com/) software development kits to interface with Vanilla smart contracts on the Ethereum and Polygon blockchains.

## Published versions

**@vanilladefi/core-sdk**

[![npm version](https://badge.fury.io/js/@vanilladefi%2Fcore-sdk.svg)](https://badge.fury.io/js/@vanilladefi%2Fcore-sdk)

**@vanilladefi/stake-sdk**

[![npm version](https://badge.fury.io/js/@vanilladefi%2Fstake-sdk.svg)](https://badge.fury.io/js/@vanilladefi%2Fstake-sdk)

**@vanilladefi/trade-sdk**

[![npm version](https://badge.fury.io/js/@vanilladefi%2Ftrade-sdk.svg)](https://badge.fury.io/js/@vanilladefi%2Ftrade-sdk)

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
