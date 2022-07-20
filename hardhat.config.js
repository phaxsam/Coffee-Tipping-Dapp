require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const GOERLI_URl = process.env.GOERLI_URl;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli:{
      url: " https://eth-goerli.g.alchemy.com/v2/xcw_ex1h3xjtIptgKwASgda3U9gfMDI3", 
      accounts:[PRIVATE_KEY]
    }
  }
};
