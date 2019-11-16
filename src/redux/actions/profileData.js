import axios from 'axios';

export const getProfileData = () =>  async dispatch=>{
    try{
        
        dispatch({
            type:'GET_PROFILE_DATA',
            profileData:profileData.data,
        })
        return profileData.data;
    }catch(err){
        return err.message;
    }
    
};