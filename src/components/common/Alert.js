import React from 'react';

const Alert = ({ msg }) => {
    return msg 
        ? <div className="alert alert-danger" role="alert">{msg}</div>  
        : null
};

export default Alert;