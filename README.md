# Viscoin

Official Typescript implementation of the Viscoin protocol.

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/viscoin/viscoin?style=for-the-badge)
[![Discord](https://img.shields.io/discord/840244262615515148?label=Viscoin&logo=discord&style=for-the-badge)](https://discord.gg/viscoin)

## What is Viscoin?
Viscoin is an experimental digital currency that enables instant payments to anyone, anywhere in the world. Viscoin uses peer-to-peer technology to operate with no central authority: managing transactions and issuing money are carried out collectively by the network.

### Coin Specifications
| Specification | Value |
|:-|:-|
| Mining Algorithm | `Argon2d` ([Argon2](https://en.wikipedia.org/wiki/Argon2)) |
| Block Time | `60 seconds` |
| Mining Reward | `1000 VIS` |
| Block Size | `65536 bytes` |
| Port | `9333` |


## Installation

### Wallet
1. Clone this repository. `git clone https://github.com/viscoin/viscoin.git`
2. Install dependencies. `npm i`
3. Compile typescript. `npm run c`
4. Run the setup script `node setup` and select Wallet.
5. Start using the wallet. `node wallet`

### Running a node
1. Clone this repository. `git clone https://github.com/viscoin/viscoin.git`
2. Install dependencies. `npm i`
3. Compile typescript. `npm run c`
4. Install [mongoDB](https://www.mongodb.com/try/download/community) to the local machine. Optionally the connection string in `mongoose.json` could be changed to connect to a remote db.
5. Run the setup script `node setup` and select Node.
6. Add a starting point, a first node to connect to. `node net`
7. Run the node. `node fullnode`

### Mining
1. Clone this repository. `git clone https://github.com/viscoin/viscoin.git`
2. Install dependencies. `npm i`
3. Compile typescript. `npm run c`
4. Run the setup script `node setup` and select Miner.
5. Start mining. `node miner`

#### Important
If your system clock is off by more than `30 seconds` the network will reject your blocks.
Check with [Time.is](https://time.is) if you are synchronized with the official atomic clock time for any time zone.

## Package usage

#### Installation
```
npm install viscoin
```

#### Example

###### Generating a wallet
```typescript
import { Wallet, base58 } from 'viscoin'

const wallet = new Wallet()
console.log(base58.encode(wallet.address))
console.log(base58.encode(wallet.privateKey))
```

###### Building a transaction
```typescript
import { Wallet, base58 } from 'viscoin'

const wallet = new Wallet()
const transaction = wallet.createTransaction({
    to: base58.decode('visC6571qoyNNzepeCLpy4EmhqD'),
    amount: '69',
    minerFee: '0.000000000000000001'
})
console.log(transaction)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.