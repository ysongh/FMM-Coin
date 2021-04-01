import React from 'react';

const Alert = ({ msg }) => {
    return msg 
        ? 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <p className="text-center m-0">
                {msg}
            </p>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        : null
};

export default Alert;