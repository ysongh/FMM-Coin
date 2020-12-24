import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { firebaseURL } from '../../firebaseUrl';

const CreateProfile = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const createProfile = async () => {
        try{
            const musicianInfo = {
                name,
                walletAddress,
                tags,
                imageUrl,
                likes: 0
            }
            
            await axios.post(firebaseURL + '/musicians.json', musicianInfo);

            history.push("/musicians");
            console.log(musicianInfo)
        } catch(err){
            console.error(err);
        }
    }

    return(
        <div className="container my-5">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-5 m-auto">
                    <div className="card">
                        <h5 className="card-header primary-bg text-center py-4">Create your profile</h5>
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
                                <select className="custom-select" onChange={(e) => setTags(e.target.value)}>
                                    <option>None</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Jazz">Jazz</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Hip Hop">Hip Hop</option>
                                    <option value="Folk">Folk</option>
                                    <option value="Country">Country</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Image URL</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="Image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)} 
                                />
                            </div>
                            <button className="btn btn-primary btn-lg" onClick={() => createProfile()}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile;