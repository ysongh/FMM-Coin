import React from 'react';

const AddMusicModal = ({  videoUrl, setVideoUrl }) => {
    return(
        <div className="container my-5">
            <div className="modal fade" id="addMusicModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h3>Add Video</h3>
                            <div className="input-group mb-3">
                                <input
                                    name="video URL"
                                    type="text"
                                    placeholder="Video URL"
                                    className="form-control"
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    value={videoUrl}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-dismiss="modal">
                                    Upload
                            </button>
                            <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMusicModal;