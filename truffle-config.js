const keys = require('./config');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const endpointUrl = "https://poa-kovan.gateway.pokt.network/v1/" + keys.applicationId;
const mnemonic = keys.MNEMONIC.toString().trim();

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, endpointUrl),
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    },
    emeraldTestnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://testnet.emerald.oasis.dev"),
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42261
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  contracts_build_directory: './src/abis/',

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
