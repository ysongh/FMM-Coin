import React from 'react';
import { Link } from 'react-router-dom';

import GetCoinImg from '../../images/getcoin.svg';

const Musicians = () => {
    return(
        <div className="container mb-5">
            <h1 className="mt-3 mb-4">Musicians</h1>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-6">
                                    <h5 className="card-title">Joe Doe</h5>
                                    <p className="card-text">12 Likes</p>
                                    <p className="card-text mt-5">
                                        <strong>Tags:</strong> Country Music, Jazz
                                    </p>
                                </div>
                                <div className="col-sm-2">
                                <a href="#" className="btn btn-primary">See Music</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-6">
                                    <h5 className="card-title">Joe Doe</h5>
                                    <p className="card-text">12 Likes</p>
                                    <p className="card-text mt-5">
                                        <strong>Tags:</strong> Country Music, Jazz
                                    </p>
                                </div>
                                <div className="col-sm-2">
                                <a href="#" className="btn btn-primary">See Music</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Musicians;