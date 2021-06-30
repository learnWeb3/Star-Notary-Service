const assert = require("chai").assert;
const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract("StarNotary", (accs) => {
  accounts = accs;
  owner = accounts[0];

  it("can Create a Star", async () => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar("Awesome Star!", tokenId, { from: accounts[0] });
    assert.equal(
      await instance.tokenIdToStarInfo.call(tokenId),
      "Awesome Star!"
    );
  });

  it("lets user1 put up their star for sale", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar("awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    assert.equal(await instance.starsForSale.call(starId), starPrice);
  });

  it("lets user1 get the funds after the sale", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar("awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, { from: user2, value: balance });
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
  });

  it("lets user2 buy a star, if it is put up for sale", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar("awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, { from: user2, value: balance });
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it("lets user2 buy a star and decreases its balance in ether", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar("awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {
      from: user2,
      value: balance,
      gasPrice: 0,
    });
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value =
      Number(balanceOfUser2BeforeTransaction) -
      Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
  });

  // Implement Task 2 Add supporting unit tests

  it("can add the star name and star symbol properly", async () => {
    // 1. create a Star with different tokenId
    let tokenId = 6;
    let instance = await StarNotary.deployed();
    await instance.createStar("Awesome Star!", tokenId, { from: accounts[0] });
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    const name = await instance.name();
    const symbol = await instance.symbol();
    assert.equal(symbol, "STR", `${symbol} equal STR`);
    assert.equal(name, "Star", `${name} equal Star`);
  });

  it("lets 2 users exchange stars", async () => {
    // 1. create 2 Stars with different tokenId
    let instance = await StarNotary.deployed();
    await instance.createStar("Awesome Star!", 7, { from: accounts[0] });
    await instance.createStar("Awesome Star!", 8, { from: accounts[1] });
    // setting up approved address for token 7 and 8
    await instance.approve(accounts[1], 7, { from: accounts[0] });
    await instance.approve(accounts[0], 8, { from: accounts[1] });
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(7, 8, { from: accounts[0] });
    // 3. Verify that the owners changed
    const star1Owner = await instance.ownerOf(7);
    const star2Owner = await instance.ownerOf(8);
    assert.equal(
      star1Owner,
      accounts[1],
      `Star id ${7} owner equal ${accounts[1]}`
    );
    assert.equal(
      star2Owner,
      accounts[0],
      `Star id ${8} owner equal ${accounts[0]}`
    );
  });

  it("lets a user transfer a star", async () => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();
    await instance.createStar("Awesome Star!", 9, { from: accounts[0] });
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(accounts[1], 9);
    // 3. Verify the star owner changed.
    const starOwner = await instance.ownerOf(9);
    assert.equal(starOwner, accounts[1], `Star owner equal ${accounts[1]}`);
  });

  it("lookUptokenIdToStarInfo test", async () => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();
    await instance.createStar("Awesome Star!", 10, { from: accounts[0] });
    // 2. Call your method lookUptokenIdToStarInfo
    const name = await instance.lookUptokenIdToStarInfo(10);
    // 3. Verify if you Star name is the same
    assert.equal(name, "Awesome Star!", `Star is named "Awesome Star!"`);
  });
});