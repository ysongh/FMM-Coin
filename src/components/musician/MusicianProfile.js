import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import axios from 'axios';

import { firebaseURL } from '../../firebaseUrl';
import { loadWeb3, loadBlockchainData, fmmBlockchain } from '../../blockchain';
import VideoImg from '../../images/video.png';
import TransferTokenForm from '../TransferTokenForm';
import AddMusicModal from './AddMusicModal';

const MusicianProfile = () => {
    const { id } =  useParams();

    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const [musician, setMusician] = useState({});

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

        async function getMusician(){
            try{
                const { data } = await axios.get(firebaseURL + '/musicians/' + id + '.json');

                setMusician(data);
                console.log(data)
                getTransactionsHistory(data.walletAddress);
            } catch(err){
                console.error(err);
            }
        }

        async function getTransactionsHistory(musicianWalletAddress){
            await loadBlockchainData();

            const transactions = await fmmBlockchain.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { _to: musicianWalletAddress }});
            console.log(transactions);
            setTransactions(transactions);
        }

        load();
        getWalletAddress();
        getMusician();

        window.scrollTo(0, 0);
    }, [id]);

    const addLike = async musician => {
        try{
            setLoading(true);
            const receipt = await fmmBlockchain.methods.likesMusician().send({ from: walletAddress });

            if(receipt.status){
                musician.likes += 1;
            
                const { data } = await axios.put(firebaseURL + '/musicians/' + id + '.json', musician);
                setMusician(data);
            }

            setLoading(false);
        } catch(err){
            console.error(err);
            setLoading(false);
        }
    }

    const transferToken = async() => {
        try{
            setLoading(true);
            await fmmBlockchain.methods.transfer(musician.walletAddress, amount).send({ from: walletAddress });
            
            setBalance(+balance - +amount);
            setAmount(0);
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
    }
    
    return(
        <div className="container my-5">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <img className="img-fluid" src={musician.imageUrl} alt="Person" />
                            <h3 className="card-title text-center">{musician.name}</h3>
                            <p className="card-text text-center">
                                {musician.likes} Likes <button className="btn btn-secondary" onClick={() => addLike(musician)} disabled={loading}>{loading ? 'Pending' : '1 FMM to Like'}</button>
                            </p>
                            <button className="btn btn-primary btn-lg d-block m-auto" data-toggle="modal" data-target="#confirmModal">
                                Give Token
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Tags</h3>
                            <p className="card-text"><span className="badge badge-pill btn-secondary">{musician.tags}</span></p>
                        </div>
                    </div>
                    <div className="card my-3">
                        <div className="card-body">
                            <h3 className="card-title">Wallet Address</h3>
                            <p className="card-text">{musician.walletAddress}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h3 className="card-title">Videos</h3>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#addMusicModal">
                                    Add Video
                                </button>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <img className="img-fluid" src={VideoImg} alt="Person" />
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <img className="img-fluid" src={VideoImg} alt="Person" />
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <img className="img-fluid" src={VideoImg} alt="Person" />
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <img className="img-fluid" src={VideoImg} alt="Person" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Donation History</h3>

                            { transactions.map((transaction, key) => {
                                return (
                                    <div key={key} >
                                        <p>{transaction.returnValues._from}</p>
                                        <p>{transaction.returnValues._value}</p>
                                    </div>
                                )
                            }) }
                        </div>
                    </div>
                </div>
            </div>
            <TransferTokenForm
                musicianAddress={musician.walletAddress}
                walletAddress={walletAddress}
                balance={balance}
                amount={amount}
                setAmount={setAmount}
                transferToken={transferToken}
                loading={loading} />
            <AddMusicModal
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl} />
        </div>
    );
};

export default MusicianProfile;