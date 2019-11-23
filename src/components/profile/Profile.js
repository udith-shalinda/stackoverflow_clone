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
   const [myQuestionList,setMyQuestionList]= useState(null);

   useEffect(()=>{
    getProfileData();
    getMyQuestions();
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
  const getMyQuestions=async()=>{
    try{
      const res = await Axios.get('http://localhost:8102/api/question/getSomeOnesQuestion/'+id);
      console.log(res.data);
      setMyQuestionList(res.data); 
    }catch(e){
        console.log(e);
    }
  }
  const renderMyQuestionList =()=>{
    if(myQuestionList !== null){
      if(myQuestionList.length>0){
        return(
          myQuestionList.map((question)=>{
            return(
              <Card>
                <CardContent>{question.question}</CardContent>
              </Card>
            )
          })
        )
      }else{
        return(
          <Card>
            <p>No questions yet</p>
          </Card>
        )
      }
    }else{
      return(
        <div>loading.....</div>
      )
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
              {renderMyQuestionList()}
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