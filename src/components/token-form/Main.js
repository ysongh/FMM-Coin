import React, { useState, useEffect } from 'react';

import { loadWeb3, loadBlockchainData, tokenBlockchain, fmmBlockchain } from '../../blockchain';
import Alert from '../common/Alert';
import BuyToken from './BuyToken';

const Main = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(1);
    const [eth, setEth] = useState(0.01);
    const [ethBalance, setEthBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
            const receipt = await fmmBlockchain.methods.buyToken().send({ from: walletAddress, value: window.web3.utils.toWei(eth.toString(), 'Ether')});
            
            if(receipt.status){
                setBalance(+balance + +amount);
                setAmount(0);
                setEthBalance(ethBalance - eth);
                setEth(0);
            }
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
    }

    const changeAmount = e => {
        if(e.target.value >= 0 && e.target.value < 100000){
            setAmount(e.target.value);
            setEth(e.target.value / 100);
        }
    }

    return(
        <div className="container mb-5">
            <Alert msg={error}/>
            <h1 className="mt-3 mb-4">Buy Token</h1>

            <div className="row" style={{ height: '18rem'}}>
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
                    <BuyToken loading={loading} buyToken={buyToken} changeAmount={changeAmount} amount={amount} eth={eth} />
                </div>
            </div>
        </div>
    )
}

export default Main;