import React from 'react';

const SellToken = ({ loading, sellToken, changeAmount, sellAmount, sellEth }) => {
    return(
        <div>
            <label htmlFor="amount">How many FMM tokens do you want to sell?</label>
            <div className="input-group">
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
            <p className="text-muted mb-3">* 100 FMM = 1 ETH </p>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => sellToken()}
                    disabled={loading || sellAmount === 0 || sellAmount === ''}>
                        {loading ? 'Pending' : 'Sell'}
                </button>
                <p className="lead">Total Gain: {sellEth} ETH</p>
            </div>
        </div>
    )
}

export default SellToken;