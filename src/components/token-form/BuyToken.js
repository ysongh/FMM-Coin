import React from 'react';

const BuyToken = ({ loading, buyToken, changeAmount, buyAmount, buyEth }) => {
    return(
        <div>
            <label htmlFor="amount">How many FMM tokens do you want to buy?</label>
            <div className="input-group mb-3">
                <input
                    name="amount"
                    type="number"
                    className="form-control"
                    onChange={(e) => changeAmount(e)}
                    value={buyAmount}/>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">FMM</span>
                </div>
            </div>
            <p className="lead mt-3">Total Cost: {buyEth} ETH</p>
            <button
                className="btn btn-primary btn-lg"
                onClick={() => buyToken()}
                disabled={loading || buyAmount === 0 || buyAmount === ''}>
                    {loading ? 'Pending' : 'Purchase'}
            </button>
        </div>
    )
}

export default BuyToken;