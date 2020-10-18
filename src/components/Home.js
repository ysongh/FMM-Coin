import React from 'react';
import { Link } from 'react-router-dom';

import GiveCoinImg from '../images/givecoin.svg';
import GetCoinImg from '../images/getcoin.svg';

const Home = () => {
    return(
        <>
            <header className="hero-img">
                <h1 className="text-center text-white display-3 mt-5">
                    Support Our Musicians
                </h1>
                <p className="text-center text-white h4 mt-5">
                    We use FMM tokens to fund the musician
                </p>
                <div className="d-flex justify-content-center mt-5">
                    <Link className="btn btn-secondary btn-lg mr-4" to="buytoken">Buy Token</Link>
                    <Link className="btn btn-outline-warning btn-lg" to="transfertoken">See Musician</Link>
                </div>
            </header>
            <main className="container">
                <section className="py-2">
                    <h2 className="text-center my-5">No Cards Needed to Donate</h2>
                </section>

                <section>
                    <h2 className="mt-5">Give Token to the Musicians</h2>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <img className="img-fluid" src={GiveCoinImg} alt="Give Coin" />
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="mt-5">1) Purchase FMM token with ETH</p>
                            <p>2) Watch vidoes of the musician</p>
                            <p>3) Send FMM token to your favorite musician</p>
                        </div>
                    </div>
                    <h2 className="text-right mt-5">Earn Token as Musicians</h2>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="mt-5">1) Create an account and profile</p>
                            <p>2) Add your wallet address</p>
                            <p>3) Upload your video of playing music</p>
                            <p>4) Sell your token for funds</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <img className="img-fluid" src={GetCoinImg} alt="Get Coin" />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;