import React from 'react';

const BuyToken = ({ loading, buyToken, changeAmount, buyAmount, buyEth }) => {
    return(
        <div>
            <label htmlFor="amount">How many FMM tokens do you want to buy?</label>
            <div className="input-group">
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
            <p className="text-muted mb-3">* 1 ETH = 100 FMM</p>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => buyToken()}
                    disabled={loading || buyAmount === 0 || buyAmount === ''}>
                        {loading ? 'Pending' : 'Purchase'}
                </button>
                <p className="lead">Total Cost: {buyEth} ETH</p>
            </div>
        </div>
    )
}

export default BuyToken;