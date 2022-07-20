// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");



async function getBalance(address){
  const balnaceBigInit = await hre.waffle.provider.getBalance(address);
   return hre.ethers.utils.formatEther(balnaceBigInit);
}

 async function printBalance(addresses){
let idx =0;
for (const address of addresses) {
  console.log("address ${idx} balance:", await getBalance(address));
  idx++
}
 }

async function printMemos(memos){
  for (const memo of memos){
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    //const amountTipped = memo.msg.value;
    const message = memo.message;
    console.log('At ${timestamp}, ${tipper}, ${tipperAddress}, ${amountTipped} said: "${message}"');
  }
}

async function main() {
  //get example contracts
const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

//get the contract to deploy and deploy.
const BuyMeCoffee = await hre.ethers.getContractFactory('GiftMeCoffe');
const buyMeCoffee = await BuyMeCoffee.deploy();
await buyMeCoffee.deployed();
console.log("BuyMeCoffee deployed to", buyMeCoffee.address);

//check balances before the coffee purchase.
const addresses = [owner.address, tipper.address, buyMeCoffee.address];
console.log("==start==");
await printBalance(addresses);

//buy the onwer a coffee.
const tip = {value: hre.ethers.utils.parseEther("2")};
 await buyMeCoffee.connect(tipper).buyCoffe("", "", tip);
 await buyMeCoffee.connect(tipper2).buyCoffe("", "", tip);
 await buyMeCoffee.connect(tipper3).buyCoffe("", "", tip);

 //check balance after coffee puchase.
console.log("==coffee bought ==");
await printBalance(addresses);

//withdraw tips
await buyMeCoffee.connect(owner).goGetCoffeNow();

console.log("== balance when tip withdrawn ==");
await printBalance(addresses);

console.log("==Memos==");
const memos = await buyMeCoffee.getMemos();
printMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
