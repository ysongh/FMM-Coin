import Web3 from 'web3';

import FundMyMusicianToken from '../abis/FundMyMusicianToken.json';

export let fmmBlockchain;

export const loadWeb3 = async () => {
    try{
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
    
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    } catch(err){
        console.log(err);
    }
}

export const loadBlockchainData = async () => {
    const web3 = window.web3;
    
    const networkId = await web3.eth.net.getId();
    const networkData = FundMyMusicianToken.networks[networkId];

    if(networkData){
      const abi = FundMyMusicianToken.abi;
      const address = FundMyMusicianToken.networks[networkId].address;

      const blockchain = new web3.eth.Contract(abi, address);
      fmmBlockchain = blockchain;
    }else{
      window.alert('Contract is not deployed to detected network')
    }
  }