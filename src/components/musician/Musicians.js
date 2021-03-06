import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { db } from '../../firebase';

const tags = ["None", "Rock", "Jazz", "Pop", "Hip Hop", "Folk", "Country", "Other"]

const Musicians = () => {
    const [data, setData] = useState([]);
    const [musicians, setMusicians] = useState([]);

    useEffect(() => {
        async function getMusicians() {
            try{
                db
                    .collection('musician')
                    .orderBy('likes', 'desc')
                    .onSnapshot(snapshot => {
                        setData(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })));
                        setMusicians(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })));
                    });
            } catch(err){
                console.error(err);
            }
        }
        
        getMusicians();
        
        window.scrollTo(0, 0);
    }, []);

    const selectTag = e => {
        let { value } = e.target;

        if(value === "None"){
            setMusicians(data);
        }
        else{
            let copy = data;
            copy = copy.filter(musician => musician.data.tags === value);
            setMusicians(copy);
        }
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
                                        <input
                                            className="form-check-input"
                                            type="radio" name="radiotype"
                                            onChange={e => selectTag(e)}
                                            value={tag} id={`radio${tag}`}
                                            defaultChecked={tag === "None" ? true : false} />
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
                                                <img className="img-fluid" src={musician.data.imageUrl} alt="Person" />
                                            </div>
                                            <div className="col-sm-6">
                                                <h5 className="card-title h2">{musician.data.name}</h5>
                                                <p className="card-text h5 mb-4">
                                                    <strong>Tags:</strong> <span className="badge badge-pill btn-secondary">{musician.data.tags}</span>
                                                </p>
                                                <Link
                                                    to={{
                                                        pathname: `/musicians/${musician.id}`,
                                                        state: { musician }
                                                    }}
                                                    className="btn btn-primary btn-lg mt-5"
                                                >
                                                    See Music
                                                </Link>
                                            </div>
                                            <div className="col-sm-2">
                                                <p className="card-text para">{musician.data.likes} <img className="icon" src="/images/star.svg" alt="Star" /></p>
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