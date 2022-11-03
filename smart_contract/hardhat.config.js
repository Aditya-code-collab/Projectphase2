require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/D9uE3rhHp2rvUIwgkKt6zsvf2W2ZBRZP',
      accounts: ['f603787e688d89e746766907969eb288273cdca38bd2d87b05c138a05bb0e9f7'],
    },
  },
};