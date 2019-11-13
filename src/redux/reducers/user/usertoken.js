const userToken = (state = {token:null},action)=>{
    switch(action.type){
        case 'SET_USER_TOKEN':
            return{
                token:action.token
            }   
        default:
            return state;
    }
}

export default userToken