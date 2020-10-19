import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { firebaseURL } from '../../firebaseUrl';

const CreateProfile = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [tags, setTags] = useState('');

    const createProfile = async () => {
        try{
            const musicianInfo = {
                name,
                walletAddress,
                tags,
                likes: 0
            }
            
            await axios.post(firebaseURL + '/musicians.json', musicianInfo);

            history.push("/musicians");
        } catch(err){
            console.error(err);
        }
    }

    return(
        <div className="container my-5">
            <div className="card w-50 m-auto">
                <h5 className="card-header primary-color text-center py-4">Create your profile</h5>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="text">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="Name"
                            placeholder="ex - Joe Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Wallet Address</label>
                        <input
                            className="form-control"
                            type="text"
                            name="Wallet Address"
                            placeholder="ex - 0x334381D3032e6BBd7EE8A76vbb37j1cC1bC210e1"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Tags</label>
                        <input
                            className="form-control"
                            type="text"
                            name="Tags"
                            placeholder="ex - Jazz"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)} 
                        />
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={() => createProfile()}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile;