import React, { useState, useEffect } from 'react';

import { loadWeb3, loadBlockchainData, fmmBlockchain } from '../blockchain';

const TransferTokenForm = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        async function load(){
            await loadWeb3();
        }
        async function getWalletAddress(){
            await loadBlockchainData();
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            setWalletAddress(accounts[0]);

            const balanceOf = await fmmBlockchain.methods.balanceOf(accounts[0]).call();
            setBalance(balanceOf);
        }

        load();
        getWalletAddress();
      }, []);

    const transferToken = async() => {
        try{
            await fmmBlockchain.methods.transfer(address, amount).send({ from: walletAddress });
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <>
            <h1>Transfer Token</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <p className="card-text"><strong>Your wallet adresss:</strong> {walletAddress}</p>
                    <p className="card-text"><strong>Your token balance:</strong> {balance} FMM Tokens</p>
                </div>
            </div>

            <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address} />
            <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount} />
            <button onClick={() => transferToken()}>Transfer</button>
        </>
    )
}

export default TransferTokenForm;