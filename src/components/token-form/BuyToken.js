import React, { useState } from 'react';

const BuyToken = ({ loading, buyToken, changeAmount, amount, eth }) => {
    return(
        <div>
            <label htmlFor="amount">How many token you would to buy?</label>
            <div className="input-group mb-3">
                <input
                    name="amount"
                    type="number"
                    className="form-control"
                    onChange={(e) => changeAmount(e)}
                    value={amount}/>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">FMM</span>
                </div>
            </div>
            <p className="lead mt-3">Total Cost: {eth} ETH</p>
            <button
                className="btn btn-primary btn-lg"
                onClick={() => buyToken()}
                disabled={loading}>
                    {loading ? 'Pending' : 'Purchase'}
            </button>
        </div>
    )
}

export default BuyToken;