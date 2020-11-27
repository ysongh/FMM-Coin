import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { firebaseURL } from '../../firebaseUrl';
import Star from '../../images/star.svg';

const tags = ["Rock", "Jazz", "Pop", "Hip Hop", "Folk", "Country", "Other"]

const Musicians = () => {
    const [data, setData] = useState([]);
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

                musiciansList.sort((a, b) => b.likes - a.likes);

                setData(musiciansList);
                setMusicians(musiciansList);
            } catch(err){
                console.error(err);
            }
        }
        
        getMusicians();
        
        window.scrollTo(0, 0);
    }, []);
    const selectTag = e => {
        let copy = data;

        copy = copy.filter(musician => musician.tags === e.target.value);
        setMusicians(copy);
    }

    return(
        <div className="container mb-5">
            <h1 className="mt-3 mb-4">Musicians</h1>
            <div className="row">
                <div className="col-12 col-md-3 mb-3">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h4>Filter By:</h4>

                            { tags.map(tag => {
                                return(
                                    <div className="form-check" key={tag}>
                                        <input className="form-check-input" type="radio" name="radiotype" onChange={e => selectTag(e)} value={tag} id={`radio${tag}`} />
                                        <label className="form-check-label" htmlFor={`radio${tag}`}>
                                            {tag}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    { musicians.map(musician => {
                        return(
                            <div className="col-sm-12" key={musician.id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <img className="img-fluid" src={musician.imageUrl} alt="Person" />
                                            </div>
                                            <div className="col-sm-6">
                                                <h5 className="card-title h2">{musician.name}</h5>
                                                <p className="card-text h5 mb-4">
                                                    <strong>Tags:</strong> <span className="badge badge-pill btn-secondary">{musician.tags}</span>
                                                </p>
                                                <Link to={`/musicians/${musician.id}`} className="btn btn-primary btn-lg mt-5">See Music</Link>
                                            </div>
                                            <div className="col-sm-2">
                                                <p className="card-text para">{musician.likes} <img className="icon" src={Star} alt="Star" /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    );
};

export default Musicians;