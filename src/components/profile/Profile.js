import React, { useEffect, useState } from 'react';
import { Card, CardMedia, IconButton, CardHeader, CardActions, Grid, CardContent } from '@material-ui/core'
import {useParams} from "react-router-dom";


//redux
import { connect } from 'react-redux'
import { setUserId,setUserToken } from '../../redux/actions/UserLogin';
import {changeTheamColor} from '../../redux/actions/color';
import Axios from 'axios';


 export const Profile = (props)=>{
   const {id} =useParams();
   const [profileData,setProfileData]= useState(null);

   useEffect(()=>{
    getProfileData();
   },[])

   const getProfileData=async ()=>{ 
    try{
        const res = await Axios.get('http://localhost:8102/api/userDetails/getUserDetailsById/'+id);
        console.log(res.data); 
        setProfileData(res.data); 
    }catch(e){
        console.log(e);
    }
  }
    const renderProfileData = ()=>{
      if(profileData !== null){
        return(
          <div>
            <Grid container>
          <Grid item xs={4}>
              <Card >
              <img src={profileData.profilePictureLink===null?"https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg":profileData.profilePictureLink}/>
              <CardHeader
                  title={profileData.name}
                  subheader={"Votes : "+profileData.votes}
                  // subheaderTypographyProps={{color:props.fontColor}}
              />
              </Card>
          </Grid>
          <Grid item xs={6} >
              {/* {content()} */}
          </Grid>
      </Grid>
          </div>
        )
      }else{
        return(
          <p>loading ......</p>
        )
      }
    }
    return(
        <div>
          {renderProfileData()}  
        </div>
    );
};

const mapStateToProps = state => {
    return { 
      userId: state.userId.userId,
      colorState:state.colorState,
    };
  };
  
  export default connect(
    mapStateToProps,
    { setUserId,setUserToken,changeTheamColor}
  )(Profile)
// export default Profile;