import React from 'react';

const TransferTokenForm = ({ musicianAddress, walletAddress, balance, amount, setAmount, transferToken, loading }) => {
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
                            <h3>Send Tokens</h3>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p className="card-text"><strong>Your wallet adresss:</strong> {walletAddress}</p>
                                    <p className="card-text"><strong>To wallet adresss:</strong> {musicianAddress}</p>
                                    <p className="card-text"><strong>Your token balance:</strong> {balance} FMM Tokens</p>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    name="amount"
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}/>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">FMM Tokens</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={() => transferToken()}
                                disabled={loading}>
                                    {loading ? 'Pending' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferTokenForm;