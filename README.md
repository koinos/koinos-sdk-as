[![Test](https://github.com/koinos/koinos-sdk-as/actions/workflows/test.yml/badge.svg)](https://github.com/koinos/koinos-sdk-as/actions/workflows/test.yml)

# koinos-sdk-as
AssemblyScript (AS) Software Development Toolkit (SDK) for the Koinos Blockchain

See documentation: https://koinos.github.io/koinos-sdk-as/

Learn how to create smart contracts by looking at the examples repo: https://github.com/roaminro/koinos-sdk-as-examples

## Requirements:
You need to install NodeJS v16 or higher [download](https://nodejs.org/en/download/)

## Installation

```sh
# with npm
npm install koinos-sdk-as

# with yarn
yarn add koinos-sdk-as
```
## Run unit tests
```sh
# with npm
npm test

# with yarn
yarn test
```

## Build test contract
```sh
# with npm
npm run buildTestContract

# with yarn
yarn run buildTestContract
```

## Upload and trigger the test contract on a local devnet using [Local-Koinos](https://github.com/roaminroe/local-koinos)
```sh
🚫 🔐 > open wallets/bob.wallet bob
Opened wallet: wallets/bob.wallet

🚫 🔓 > connect http://localhost:8080
Connected to endpoint http://localhost:8080

🔓 > register foobar 161DDwJNQyHqYJbP4C7Y8BTULrkjgC4U6g /test/abi/foobar.abi
Contract 'foobar' at address 161DDwJNQyHqYJbP4C7Y8BTULrkjgC4U6g registered

🔓 > foobar.foobar 42
Calling foobar.foobar with arguments 'value:42'
Transaction with ID 0x1220654597dfe99b4d5f841c129be39d3fe725539240b9efb43f8ea8ab4d9cd35742 containing 1 operations submitted.
Mana cost: 0.01831902 (Disk: 10, Network: 254, Compute: 1830532)
Logs:
entryPoint: 3282800625
contractArgs: 42
contractId (b58): 161DDwJNQyHqYJbP4C7Y8BTULrkjgC4U6g
headInfo.head_block_time: 1645327982254
headInfo.head_topology.height: 7771
headInfo.last_irreversible_block.: 7711
callerData.caller_privilege: 1
lastIrreversibleBlock: 7711
putRes: 0
obj: testValue
putRes: 0
obj: testValue2
obj: testValue2
putRes3: 0
obj5.value: 42
no obj5
recoveredKey (b58): 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe
value2
no key5
value3
key3
value1
key1
nothing before key1
nothing after key3
obj201.value: 200
next obj202.value: 300
prev obj202.value: 100
nothing before key1
nothing after key3
payer: 161DDwJNQyHqYJbP4C7Y8BTULrkjgC4U6g
payer: 161DDwJNQyHqYJbP4C7Y8BTULrkjgC4U6g
```
