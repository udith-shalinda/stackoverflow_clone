import axios from 'axios';

export const getProfileData = (userDetailsId) =>  async dispatch=>{
    try{
        const profileData = await axios.get('https://blooming-reaches-61913.herokuapp.com/user/api/userDetails/getuserDetailsById/'+ userDetailsId);
        console.log(profileData.data)
        dispatch({
            type:'GET_PROFILE_DATA',
            payload:{
                profileData:profileData.data,
                isLoaded:true,
            }  
        })
        return profileData.data;
    }catch(err){
        return err.message;
    }
    
};