import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.svg';
import { loadWeb3, loadBlockchainData } from '../../blockchain';
import { GlobalContext } from '../../context/GlobalState';

const Navbar = () => {
    const { walletAddress, setWalletAddress } = useContext(GlobalContext);

    const connectBlockchain = async () => {
        await loadWeb3();
        await loadBlockchainData();
        const accounts = await window.web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src={Logo} alt="Logo" data-toggle="collapse" data-target=".navbar-collapse.show" />
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
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/">Login</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/create-profile">Get Started</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <button className="nav-link btn btn-primary" onClick={() => connectBlockchain()}>
                                {walletAddress ? walletAddress.substring(0,7) + '...' + walletAddress.substring(35,42) : "Open Wallet"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;