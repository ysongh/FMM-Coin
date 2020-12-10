import Web3 from 'web3';

import Token from '../abis/Token.json';
import FundMyMusicianToken from '../abis/FundMyMusicianToken.json';

export let tokenBlockchain;
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
    const TokenData = Token.networks[networkId];

    if(TokenData){
      const abi = Token.abi;
      const address = Token.networks[networkId].address;

      const blockchain = new web3.eth.Contract(abi, address);
      tokenBlockchain = blockchain;
    }else{
      window.alert('Token Contract is not deployed to detected network.')
    }

    const FundMyMusicianTokenData = FundMyMusicianToken.networks[networkId];

    if(FundMyMusicianTokenData){
      const abi = FundMyMusicianToken.abi;
      const address = FundMyMusicianToken.networks[networkId].address;

      const blockchain = new web3.eth.Contract(abi, address);
      fmmBlockchain = blockchain;
    }else{
      window.alert('FundMyMusicianToken Contract is not deployed to detected network.')
    }
  }