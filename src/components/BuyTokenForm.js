import React, { useState, useEffect } from 'react';

import { loadWeb3, loadBlockchainData, fmmBlockchain } from '../blockchain';

const BuyTokenForm = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState(1);
    const [ethBalance, setEthBalance] = useState(0);
    const [eth, setEth] = useState(0.0003);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load(){
            await loadWeb3();
        }
        async function getWalletAddress(){
            await loadBlockchainData();
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            setWalletAddress(accounts[0]);

            const ethBalance = await web3.eth.getBalance(accounts[0]);
            setEthBalance(web3.utils.fromWei(ethBalance, 'ether'));

            const balanceOf = await fmmBlockchain.methods.balanceOf(accounts[0]).call();
            setBalance(balanceOf);
        }

        load();
        getWalletAddress();
      }, []);

    const buyToken = async() => {
        try{
            setLoading(true);
            const receipt = await fmmBlockchain.methods.buyToken(amount).send({ from: walletAddress, value: window.web3.utils.toWei('0.0003', 'Ether') * amount});
            
            if(receipt.status){
                setBalance(+balance + +amount);
                setAmount(0);
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
            setEth((e.target.value * 0.0003).toFixed(4));
        }
    }

    return(
        <div className="container mb-5">
            <h1 className="mt-3 mb-4">Buy Token</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <p className="card-text"><strong>Your wallet adresss:</strong> {walletAddress}</p>
                    <p className="card-text"><strong>Your token balance:</strong> {balance} FMM Tokens</p>
                    <p className="card-text"><strong>Your ETH balance:</strong> {ethBalance} ETH</p>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-md-6">
                    <label htmlFor="amount">How many token you would to buy?</label>
                    <div className="input-group mb-3">
                        <input
                            name="amount"
                            type="number"
                            className="form-control"
                            onChange={(e) => changeAmount(e)}
                            value={amount}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">FMM Tokens</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <p className="text-right h1 mt-3">Total Cost: {eth} ETH</p>
                </div>
            </div>
            <button
                className="btn btn-primary btn-lg"
                onClick={() => buyToken()}
                disabled={loading}>
                    {loading ? 'Pending' : 'Purchase'}
            </button>
        </div>
    )
}

export default BuyTokenForm;