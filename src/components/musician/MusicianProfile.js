import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { firebaseURL } from '../../firebaseUrl';
import GetCoinImg from '../../images/getcoin.svg';

const MusicianProfile = () => {
    const { id } =  useParams();

    const [musician, setMusician] = useState({});

    useEffect(() => {
        async function getMusician() {
            try{
                const { data } = await axios.get(firebaseURL + '/musicians/' + id + '.json');

                setMusician(data);
                console.log(data)
            } catch(err){
                console.error(err);
            }
        }
        
        getMusician();
    }, [id]);
    
    return(
        <div className="container my-5">
            <div className="row">
                <div className="col-sm-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <img className="img-fluid" src={musician.imageUrl} alt="Person" />
                            <h3 className="card-title text-center">{musician.name}</h3>
                            <p className="card-text text-center">{musician.likes} Likes</p>
                            <Link to={`/transfertoken/${musician.walletAddress}`} className="btn btn-primary btn-lg d-block">Give Token</Link>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Address</h3>
                            <p className="card-text">{musician.walletAddress}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Tags</h3>
                            <p className="card-text">{musician.tags}</p>
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