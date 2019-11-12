const loginState = (state = {filter:false},action)=>{
    switch(action.type){
        case 'SET_LOGGING_STATE':
            return{
                filter:action.filter
            }  
        default:
            return state;
    }
}

export default loginState