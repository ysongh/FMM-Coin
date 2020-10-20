import React, { useState, useEffect } from 'react';

import { loadWeb3, loadBlockchainData, fmmBlockchain } from '../blockchain';

const TransferTokenForm = ({ musicianAddress }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0)
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
            await fmmBlockchain.methods.transfer(musicianAddress, amount).send({ from: walletAddress });
            
            setBalance(+balance - +amount);
            setAmount(0);
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <div className="container my-5">
            <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h3>Transfer Tokens</h3>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p className="card-text"><strong>Your wallet adresss:</strong> {walletAddress}</p>
                                    <p className="card-text"><strong>To wallet adresss:</strong> {musicianAddress}</p>
                                    <p className="card-text"><strong>Your token balance:</strong> {balance} FMM Tokens</p>
                                </div>
                            </div>
                            <input
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount} />
                            <button onClick={() => transferToken()}>Transfer</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferTokenForm;