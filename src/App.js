import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Web3 from 'web3';

import FundMyMusicianToken from './abis/FundMyMusicianToken.json';
import TransferTokenForm from './components/TransferTokenForm';
import BuyTokenForm from './components/BuyTokenForm';

class App extends Component{
  state = {
    account: '',
    tokenName: '',
    balance: 0,
    fmmBlockchain: null,
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3(){
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

  async loadBlockchainData(){
    const web3 = window.web3;
    
    const accounts = await web3.eth.getAccounts();

    this.setState( { account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = FundMyMusicianToken.networks[networkId];

    if(networkData){
      const abi = FundMyMusicianToken.abi;
      const address = FundMyMusicianToken.networks[networkId].address;

      const fmmBlockchain = new web3.eth.Contract(abi, address);
      this.setState({ fmmBlockchain });
      const tokenName = await fmmBlockchain.methods.name().call();
      this.setState({ tokenName});
      const balanceOf = await fmmBlockchain.methods.balanceOf(accounts[0]).call();
      this.setState({ balance: balanceOf });
    }else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  render(){
    return (
      <Router className="App">
        <h1>Fund My Musician</h1>
        <p>Your address - {this.state.account}</p>
        <p>Token name - {this.state.tokenName}</p>
        <p>Balance - {this.state.balance}</p>
        <TransferTokenForm fmmBlockchain={this.state.fmmBlockchain} account={this.state.account} />
        <BuyTokenForm fmmBlockchain={this.state.fmmBlockchain} account={this.state.account}/>
      </Router>
    );
  }
}

export default App;