import React, { useState } from 'react';

const TransferTokenForm = ({ fmmBlockchain, account }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);

    const transferToken = async() => {
        try{
            await fmmBlockchain.methods.transfer(address, amount).send({ from: account });
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <>
            <h1>Transfer Token</h1>
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