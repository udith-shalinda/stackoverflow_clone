const profileDataState = (state = {profileData:null},action)=>{
    switch(action.type){
        case 'GET_PROFILE_DATA':
            return{
                profileData:action.payload.profileData
            }  
        default:
            return state;
    }
}

export default profileDataState