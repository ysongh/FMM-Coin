import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';
import { db, storage } from '../../firebase';

const CreateProfile = () => {
    const { walletAddress } = useContext(GlobalContext);
    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [filename, setFilename] = useState('');

    useEffect(() => {
        if(walletAddress) setAddress(walletAddress);
    }, [walletAddress]);

    const createProfile = async () => {
        try{
            if(image){
                const uploadFile = storage.ref(`/${filename}`).put(image);

                uploadFile.on('state_changed', snapshot => {},
                    err => {
                        console.log(err);
                    },
                    () => {
                        uploadFile.snapshot.ref.getDownloadURL().then(async url => {
                            await db.collection("musician").add({
                                name,
                                address,
                                tags,
                                imageUrl: url,
                                likes: 0
                            });
                        })
                    })
                }
                else{
                    await db.collection("musician").add({
                        name,
                        address,
                        tags,
                        imageUrl: "/images/defaultuser.png",
                        likes: 0
                    });
                }

                history.push("/musicians");
        } catch(err){
            console.error(err);
        }
    }

    const getFile = e => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage(file);
        setFilename(file.name);
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                <label>File</label>
                                <br />
                                <input className="text-white text-monospace" type="file" onChange={getFile} />
                                <p>{filename && filename}</p>
                            </div>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => createProfile()}
                                disabled={!name || !address || !tags}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile;