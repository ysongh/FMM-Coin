import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Web3 from 'web3';

import FundMyMusicianToken from './abis/FundMyMusicianToken.json';
import TransferTokenForm from './components/TransferTokenForm';
import BuyTokenForm from './components/BuyTokenForm';

const App = () => {
  const [account, setAccount] = useState('');
  const [fmmBlockchain, setFmmBlockchain] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function loadWeb3(){
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
    }

    async function loadBlockchainData(){
      const web3 = window.web3;
      
      const accounts = await web3.eth.getAccounts();
  
      setAccount(accounts[0]);
  
      const networkId = await web3.eth.net.getId();
      const networkData = FundMyMusicianToken.networks[networkId];
  
      if(networkData){
        const abi = FundMyMusicianToken.abi;
        const address = FundMyMusicianToken.networks[networkId].address;
  
        const fmmBlockchain = new web3.eth.Contract(abi, address);
        setFmmBlockchain(fmmBlockchain);
        const tokenName = await fmmBlockchain.methods.name().call();
        setTokenName(tokenName);
        const balanceOf = await fmmBlockchain.methods.balanceOf(accounts[0]).call();
        setBalance(balanceOf);
      }else{
        window.alert('Contract is not deployed to detected network')
      }
    }
    
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <Router className="App">
      <h1>Fund My Musician</h1>
      <p>Your address - {account}</p>
      <p>Token name - {tokenName}</p>
      <p>Balance - {balance}</p>
      <TransferTokenForm fmmBlockchain={fmmBlockchain} account={account} />
      <BuyTokenForm fmmBlockchain={fmmBlockchain} account={account}/>
    </Router>
  );
}

export default App;