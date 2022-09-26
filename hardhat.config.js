//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  mocha: {
    timeout: 100000000
  }
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
};