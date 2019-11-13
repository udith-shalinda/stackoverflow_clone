const userId = (state = {userId:null},action)=>{
    switch(action.type){
        case 'SET_USER_ID':
            return{
                userId:action.userId
            }   
        default:
            return state;
    }
}

export default userId