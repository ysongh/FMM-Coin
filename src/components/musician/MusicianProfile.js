import React from 'react';

import GetCoinImg from '../../images/getcoin.svg';

const MusicianProfile = () => {
    return(
        <div className="container my-5">
            <div className="row">
                <div className="col-sm-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <img className="img-fluid" src={GetCoinImg} alt="Person" />
                            <h3 className="card-title text-center">Joe Doe</h3>
                            <p className="card-text text-center">12 Likes</p>
                            <a href="#" className="btn btn-primary btn-lg d-block">Give Token</a>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Address</h3>
                            <p className="card-text">0x02fj39df9wki2jfd293d</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Tags</h3>
                            <p className="card-text">Country Music, Jazz</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Videos</h3>

                            <div className="row">
                                <div className="col-sm-4 mb-3">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-4 mb-3">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-4 mb-3">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-4 mb-3">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-4 mb-3">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                                <div className="col-sm-4 mb-3">
                                    <img className="img-fluid" src={GetCoinImg} alt="Person" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicianProfile;