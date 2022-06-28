import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UAuth from '@uauth/js';

import { loadWeb3, loadBlockchainData } from '../../blockchain';
import { GlobalContext } from '../../context/GlobalState';

const uauth = new UAuth({
    clientID: "5b9e8880-8b3a-4af9-9c66-4676f8718a34",
    redirectUri: "http://localhost:3000/",
})

const Navbar = () => {
    const { walletAddress, domainData, setWalletAddress, setDomainData } = useContext(GlobalContext);

    const connectBlockchain = async () => {
        await loadWeb3();
        await loadBlockchainData();
        const accounts = await window.web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
    }

    const loginWithUnstoppableDomains = async () => {
        try {
          const authorization = await uauth.loginWithPopup();
    
          console.log(authorization);
          setDomainData(authorization);
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src="/images/logo.svg" alt="Logo" data-toggle="collapse" data-target=".navbar-collapse.show" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/token-form">Token</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/musicians">Musicians</Link>
                        </li>
                        {walletAddress && <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/create-profile">Create Profile</Link>
                        </li>}
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <button className="nav-link btn btn-primary" onClick={() => connectBlockchain()}>
                                {walletAddress ? walletAddress.substring(0,7) + '...' + walletAddress.substring(35,42) : "Open Wallet"}
                            </button>
                            
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <button className="nav-link btn btn-primary ml-2" onClick={() => loginWithUnstoppableDomains()}>
                                {domainData?.idToken?.sub ? domainData?.idToken?.sub : "Login with Unstoppable"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;