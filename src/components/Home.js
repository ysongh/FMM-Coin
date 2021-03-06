import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link className="btn btn-secondary btn-lg mr-4" to="/token-form">Buy Token</Link>
                    <Link className="btn btn-outline-warning btn-lg" to="/musicians">See Musician</Link>
                </div>
            </header>
            <main className="container">
                <section className="py-2">
                    <h2 className="primary-color text-center my-5 display-4">Crypto Wallet Required</h2>
                </section>

                <section className="howitworks mb-5">
                    <h2 className="font-weight-bold mt-5">Give Token to the Musicians</h2>
                    <div className="row mb-5">
                        <div className="col-12 col-md-6">
                            <img className="img-fluid" src="/images/givecoin.svg" alt="Give Coin" />
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="mt-4"><span className="badge badge-pill btn-secondary">1</span> Purchase FMM token with ETH</p>
                            <p><span className="badge badge-pill btn-secondary">2</span> Watch vidoes of the musician</p>
                            <p><span className="badge badge-pill btn-secondary">3</span> Send FMM token to your favorite musician</p>
                        </div>
                    </div>
                    <h2 className="font-weight-bold text-right">Earn Token as Musicians</h2>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="mt-4"><span className="badge badge-pill btn-secondary">1</span> Create an account and profile</p>
                            <p><span className="badge badge-pill btn-secondary">2</span> Add your wallet address</p>
                            <p><span className="badge badge-pill btn-secondary">3</span> Upload your video of playing music</p>
                            <p><span className="badge badge-pill btn-secondary">4</span> Sell your token for funds</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <img className="img-fluid" src="/images/getcoin.svg" alt="Get Coin" />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;