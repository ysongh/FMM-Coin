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
                    <Link className="btn btn-secondary btn-lg mr-4" to="buytoken">Buy Token</Link>
                    <Link className="btn btn-outline-warning btn-lg" to="transfertoken">See Musician</Link>
                </div>
            </header>
        </>
    )
}

export default Home;