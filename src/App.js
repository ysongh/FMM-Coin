import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import { loadWeb3, loadBlockchainData, fmmBlockchain } from './blockchain';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import TransferTokenForm from './components/TransferTokenForm';
import BuyTokenForm from './components/BuyTokenForm';

const App = () => {
  const [account, setAccount] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function load(){
      await loadWeb3();
    }

    async function getBlockchain(){
      await loadBlockchainData();

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const tokenName = await fmmBlockchain.methods.name().call();
      setTokenName(tokenName);

      const balanceOf = await fmmBlockchain.methods.balanceOf(accounts[0]).call();
      setBalance(balanceOf);
    }
    
    load();
    getBlockchain();
  }, []);

  return (
    <Router className="App">
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/buytoken" component={BuyTokenForm} />
      <Route exact path="/transfertoken" component={TransferTokenForm} />
      <Footer />
    </Router>
  );
}

export default App;