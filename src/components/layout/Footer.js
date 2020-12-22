import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.svg';

const Footer = () => {
    return(
        <footer className="bg-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <img className="logo mt-2" src={Logo} alt="Logo" />
                    </div>
                    <div className="col-6 col-md-3 mt-3">
                        <h5>Quick Link</h5>
                        <Link to="/">Home</Link><br />
                        <Link to="/token-form">Buy Token</Link><br />
                        <Link to="/musicians">Musicians</Link><br />
                        <Link to="create-profile/">Get Started</Link>
                    </div>
                    <div className="col-6 col-md-3 mt-3">
                        <h5>Company</h5>
                        <Link to="/">About Us</Link><br />
                        <Link to="/">Meet the Team</Link>
                    </div>
                </div>
                <p className="mt-4">
                    Copyright &copy;{new Date().getFullYear()} Fund My Musician
                </p>
            </div>
        </footer>
    );
};

export default Footer;