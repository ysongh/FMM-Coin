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
        <>
            <h1>Buy Token</h1>
            <input
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={amount} />
            <button onClick={() => buyToken()}>Buy</button>
        </>
    )
}

export default BuyTokenForm;