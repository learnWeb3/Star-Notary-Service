# ND1309 C2 Ethereum Smart Contracts, Tokens and Dapps - Project Starter

**PROJECT: Decentralized Star Notary Service Project** - For this project, you will create a DApp by adding functionality with your smart contract and deploy it on the public testnet.

### ToDo

This Starter Code has already implemented the functionalities you implemented in the StarNotary (Version 2) exercise, and have comments in all the files you need to implement your tasks.

1. Modify the StarNotary version 2 contract code to achieve the following:

- [x] Add a name and a symbol for your starNotary tokens.
- [x] Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.
- [x] Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars between users.
- [x] Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.

2. Add supporting unit tests, to test the following:

- [x] The token name and token symbol are added properly.
- [x] 2 users can exchange their stars.
- [x] Stars Tokens can be transferred from one address to another.

3. Deploy your Contract to Rinkeby

- [x] Edit the truffle.config file to add settings to deploy your contract to the Rinkeby Public Network.

4. Modify the front end of the DAPP to achieve the following:

- [x] Lookup a star by ID using tokenIdToStarInfo() (you will have to add code for this in your index.html and index.js files)

5. Project submission requirements

- Inside your project folder, create a Readme.md file. The readme.md file should include the following:
  - [x] Specify the Truffle version and OpenZeppelin version used in the project.
  - [x] Your ERC-721 Token Name
  - [x] Your ERC-721 Token Symbol
  - [x] Your “Token Address” on the Rinkeby Network
  - [x] Upload your folder to GitHub.

Submit your GitHub Repository Link.

### Development environment

Truffle: v5.3.13 (core: 5.3.13)
Solidity: 0.4.24 (solc-js)
Node: v10.19.0
Web3.js: v1.3.6
OpenZeppelin version: 2.3.0;
ERC-721 Token Name : "Star"
ERC-721 Token Symbol : "STR"
Token Contract address on the Rinkeby Network : 0xB153c736faEe0ECE017eE40fE3B8D9A6e077CA8e
Token Contract etherscan link: <https://rinkeby.etherscan.io/token/0xb153c736faee0ece017ee40fe3b8d9a6e077ca8e>

### Dependencies

For this project, you will need to have:

1. **Node and NPM** installed - NPM is distributed with [Node.js](https://www.npmjs.com/get-npm)

```bash
# Check Node version
node -v
# Check NPM version
npm -v
```

2. **Truffle v5.X.X** - A development framework for Ethereum.

```bash
# Unsinstall any previous version
npm uninstall -g truffle
# Install
npm install -g truffle
# Specify a particular version
npm install -g truffle@5.0.2
# Verify the version
truffle version
```

2. **Metamask: 5.3.1** - If you need to update Metamask just delete your Metamask extension and install it again.

3. [Ganache](https://www.trufflesuite.com/ganache) - Make sure that your Ganache and Truffle configuration file have the same port.

4. **Other mandatory packages**:

```bash
cd app
# install packages
npm i
```

### Run the application

1. Start Truffle by running

```bash
# For running unit tests the contract.
npm run test test
# deploy in development environement using local provider
npm run dev
# deploy on rinkeby network using infura provider
npm run rinkeby
```

2. Frontend - Once you are ready to start your frontend, run the following from the app folder:

```bash
cd app
npm run dev
```

### Important

When you will add a new Rinkeyby Test Network in your Metamask client, you will have to provide:

| Network Name      | New RPC URL              | Chain ID |
| ----------------- | ------------------------ | -------- |
| Private Network 1 | `http://127.0.0.1:7545/` | 4        |

The chain ID above can be fetched by:

```bash
cd app
node index.js
```

## Troubleshoot

#### Error 1

```
'webpack-dev-server' is not recognized as an internal or external command
```

**Solution:**

- Delete the node_modules folder, the one within the /app folder
- Execute `npm install` command from the /app folder

After a long install, everything will work just fine!

#### Error 2

```
ParserError: Source file requires different compiler version.
Error: Truffle is currently using solc 0.5.16, but one or more of your contracts specify "pragma solidity >=0.X.X <0.X.X".
```

**Solution:** In such a case, ensure the following in `truffle-config.js`:

```js
// Configure your compilers
compilers: {
  solc: {
    version: "0.5.16", // <- Use this
    // docker: true,
    // ...
```

## Raise a PR or report an Issue

1. Feel free to raise a [Pull Request](https://github.com/udacity/nd1309-p2-Decentralized-Star-Notary-Service-Starter-Code/pulls) if you find a bug/scope of improvement in the current repository.

2. If you have suggestions or facing issues, you can log in issue.

---

Do not use the [Old depreacted zipped starter code](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/January/5c51c4c0_project-5-starter-code/project-5-starter-code.zip)
