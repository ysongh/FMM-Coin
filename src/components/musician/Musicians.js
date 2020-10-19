import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { firebaseURL } from '../../firebaseUrl';

const Musicians = () => {
    const [musicians, setMusicians] = useState([]);

    useEffect(() => {
        async function getMusicians() {
            try{
                const { data } = await axios.get(firebaseURL + '/musicians.json');
                const musiciansList = [];
    
                for (let key in data){
                    musiciansList.unshift({
                        ...data[key],
                        id: key
                    });
                }

                setMusicians(musiciansList);
                console.log(musiciansList)
            } catch(err){
                console.error(err);
            }
        }
        
        getMusicians();
    }, []);

    console.log(musicians)
    return(
        <div className="container mb-5">
            <h1 className="mt-3 mb-4">Musicians</h1>
            <div className="row">
                { musicians.map(musician => {
                    return(
                        <div className="col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img className="img-fluid" src={musician.imageUrl} alt="Person" />
                                        </div>
                                        <div className="col-sm-6">
                                            <h5 className="card-title">{musician.name}</h5>
                                            <p className="card-text">{musician.likes} Likes</p>
                                            <p className="card-text mt-5">
                                                <strong>Tags:</strong> {musician.tags}
                                            </p>
                                        </div>
                                        <div className="col-sm-2">
                                            <Link to={`/musicians/${musician.id}`} className="btn btn-primary">See Music</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    );
};

export default Musicians;