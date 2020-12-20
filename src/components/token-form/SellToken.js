import React from 'react';

const SellToken = ({ loading, sellToken, changeAmount, sellAmount, sellEth }) => {
    return(
        <div>
            <label htmlFor="amount">How many FMM tokens do you want to sell?</label>
            <div className="input-group mb-3">
                <input
                    name="amount"
                    type="number"
                    className="form-control"
                    onChange={(e) => changeAmount(e)}
                    value={sellAmount}/>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">FMM</span>
                </div>
            </div>
            <p className="lead mt-3">Total Gain: {sellEth} ETH</p>
            <button
                className="btn btn-primary btn-lg"
                onClick={() => sellToken()}
                disabled={loading}>
                    {loading ? 'Pending' : 'Sell'}
            </button>
        </div>
    )
}

export default SellToken;