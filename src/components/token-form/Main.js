import React, { useState, useEffect } from 'react';

import { loadWeb3, loadBlockchainData, tokenBlockchain, fmmBlockchain } from '../../blockchain';
import Alert from '../common/Alert';
import BuyToken from './BuyToken';
import SellToken from './SellToken';

const Main = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);

    const [buyAmount, setBuyAmount] = useState(0);
    const [buyEth, setBuyEth] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const [sellEth, setSellEth] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentForm, setCurrentForm] = useState('buy');

    useEffect(() => {
        async function load(){
            await loadWeb3();
        }
        async function getWalletAddress(){
            try{
                await loadBlockchainData();
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setWalletAddress(accounts[0]);

                const ethBalance = await web3.eth.getBalance(accounts[0]);
                setEthBalance(web3.utils.fromWei(ethBalance, 'ether'));

                const balanceOf = await tokenBlockchain.methods.balanceOf(accounts[0]).call();
                setBalance(web3.utils.fromWei(balanceOf, 'ether'));
            }
            catch(err){
                console.error(err);
                setError("Non-Ethereum browser detected. You should consider trying MetaMask!")
            }
        }

        load();
        getWalletAddress();
        
        window.scrollTo(0, 0);
      }, []);

    const buyToken = async() => {
        try{
            setLoading(true);
            const receipt = await fmmBlockchain.methods.buyToken().send({ from: walletAddress, value: window.web3.utils.toWei(buyEth.toString(), 'Ether')});
            
            if(receipt.status){
                setBalance(+balance + +buyAmount);
                setBuyAmount(0);
                setEthBalance(ethBalance - buyEth);
                setBuyEth(0);
            }
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
    }

    const sellToken = async() => {
        try{
            setLoading(true);
            await tokenBlockchain.methods.approve(fmmBlockchain._address, window.web3.utils.toWei(sellAmount.toString(), 'Ether')).send({ from: walletAddress });
            const receipt = await fmmBlockchain.methods.sellToken(window.web3.utils.toWei(sellAmount.toString(), 'Ether')).send({ from: walletAddress });

            if(receipt.status){
                setBalance(+balance - +sellAmount);
                setSellAmount(0);
                setEthBalance(ethBalance + sellEth);
                setSellEth(0);
            }
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
    }

    const changeAmount = e => {
        if(currentForm === 'buy'){
            if(e.target.value >= 0 && e.target.value < 100000){
                setBuyAmount(e.target.value);
                setBuyEth(e.target.value / 100);
            }
        }
        else{
            if(e.target.value >= 0 && e.target.value <= +balance){
                setSellAmount(e.target.value);
                setSellEth(e.target.value / 100);
            }
        }
        
    }

    return(
        <div className="container mb-5">
            <Alert msg={error}/>
            <h1 className="mt-3 mb-4">FMM Token</h1>

            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <p className="card-text"><strong>Your wallet adresss:</strong> {walletAddress}</p>
                            <p className="card-text"><strong>Your token balance:</strong> {balance} FMM</p>
                            <p className="card-text"><strong>Your ETH balance:</strong> {ethBalance} ETH</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-around mb-3">
                        <button className="btn btn-outline-success" onClick={() => setCurrentForm('buy')}>
                            Buy
                        </button>
                        <span className="text-muted">&lt; &nbsp; &gt;</span>
                        <button className="btn btn-outline-warning" onClick={() => setCurrentForm('sell')}>
                            Sell
                        </button>
                    </div>
                    { currentForm === 'buy'
                        ? <BuyToken loading={loading} buyToken={buyToken} changeAmount={changeAmount} buyAmount={buyAmount} buyEth={buyEth} />
                        : <SellToken loading={loading} sellToken={sellToken} changeAmount={changeAmount} sellAmount={sellAmount} sellEth={sellEth}/>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Main;