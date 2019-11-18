import React from 'react';
import { Card } from '@material-ui/core'

//redux
import { connect } from 'react-redux'
import { setUserId,setUserToken } from '../../redux/actions/UserLogin';
import {changeTheamColor} from '../../redux/actions/color';


 export const Profile = (props)=>{
    return(
        <div>
            <Card>
                <p>sfsfsf  votes</p>
                <p>{props.userId}</p>
            </Card>
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