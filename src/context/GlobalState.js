import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
    walletAddress: "",
    domainData: {}
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, inititalState);

    function setWalletAddress(address){
        dispatch({
            type: "SET_WALLETADDRESS",
            payload: address
        })
    }

    function setDomainData(domainData){
        dispatch({
            type: "SET_DOMAINDATA",
            payload: domainData
        })
    }

    return (<GlobalContext.Provider value={{
        domainData: state.domainData,
        walletAddress: state.walletAddress,
        setWalletAddress,
        setDomainData
    }}>
        {children}
    </GlobalContext.Provider>);
}