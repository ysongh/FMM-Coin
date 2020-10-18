import React, { useState } from 'react';

import { fmmBlockchain } from '../blockchain';

const BuyTokenForm = ({ account }) => {
    const [amount, setAmount] = useState(0);

    const buyToken = async() => {
        try{
            await fmmBlockchain.methods.buyToken(amount).send({ from: account, value: window.web3.utils.toWei('0.0003', 'Ether') * amount});
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <div className="container mb-5">
            <h1 className="mt-3 mb-5">Buy Token</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <label htmlFor="amount">How many token you would to buy?</label>
                    <div className="input-group mb-3">
                        <input
                            name="amount"
                            type="text"
                            className="form-control"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">FMM Tokens</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <p className="text-right h1 mt-3">Total Cost: 0 Eth</p>
                </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => buyToken()}>Purchase</button>
        </div>
    )
}

export default BuyTokenForm;