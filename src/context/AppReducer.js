export default (state, action) => {
    switch(action.type){
        case "SET_WALLETADDRESS":
            return{
                ...state,
                walletAddress: action.payload
            }
        case "SET_DOMAINDATA":
            return{
                ...state,
                domainData: action.payload
            }
        default:
            return state;
    }
}