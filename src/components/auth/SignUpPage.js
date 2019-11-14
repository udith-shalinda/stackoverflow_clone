import React, { useState }  from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Button,CircularProgress} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import './Login.css';

//redux
import { connect } from 'react-redux'
import { setUserId,setUserToken } from '../../redux/actions/UserLogin';



export function SignUp(props){
    const [values, setValues] = React.useState({
        password: '',
        email:'',
        name:'',
        confirmPassword:'',
        showPassword: false,
        redirect:false
      });
      const [isloading,setloading] = useState('No');
      const [difPassword,setDifPassword] = useState(false);
      let colors = props.colorState.colors[props.colorState.colorCount];





    
      const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = event => {
        event.preventDefault();
      };
    
      const signUpButton = ()=>{
        switch(isloading){
          case "Yes":
            return(
              <CircularProgress
                variant="indeterminate"
                disableShrink
                size={26}
                thickness={4}
                {...props}
                color={colors.theamFontColor}
              />
            )
          case "Correct":
            return(
              <DoneIcon/>
            )
          case "Wrong":
            return(
              <CloseIcon/>
            )
          default:
            return(
              "Sign Up"
            )
        }
      }

    const signUpHandler = async (e)=>{
      if(values.confirmPassword === values.password){
        setloading('Yes')
          const userDetailsData ={
              name:values.name,
              votes:0,
              profilePictureLink:null
          }
          const userDetailsRes = await axios.post('http://localhost:8102/api/userDetails/save',userDetailsData);
          console.log(userDetailsRes.data);
      
          const userData = {
              email:values.email,
              password:values.password,
              userDetailsId:userDetailsRes.data
          }
          const res = await axios.post('http://localhost:8102/api/user/save',userData);
          console.log(res.data);
          if(res.status === 200){
            props.setUserId(res.data.userDetailsId);
            props.setUserToken(res.data.token);
            setValues({
                ...values,
                redirect:true
            })
            setloading('Correct')
          }else{
            setloading('Worng')
          }
      }else{
        setDifPassword(true);
      }
    }
    const redirectHandler = () =>{
        if(values.redirect){
          return(
            <Redirect to='/home' /> 
          );
        }else{
          return null;
        }
      }


    return (
        <div className="login">
            <Card style={{color:colors.theamFontColor, backgroundColor:colors.contentBackgroundColor}}>
                <div className="card">
                    <h2>Sign Up</h2>
                    <form>
                        <TextField
                            id="outlined-email-input"
                            label="Name"
                            type="text"
                            name="name"
                            margin="normal"
                            variant="outlined"
                            className="textField"
                            onChange={handleChange('name')}
                            style={{
                                backgroundColor: colors.contentBackgroundColor,
                                }}
                                InputProps={{
                                    style: {
                                        color: colors.theamFontColor
                                    }
                                }}
                                InputLabelProps={{
                                  style:{
                                    color:colors.theamFontColor,
                                  }
                                }}
                        />
                        <TextField
                            id="outlined-email-input2"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            className="textField"
                            onChange={handleChange('email')}
                            style={{
                                backgroundColor: colors.contentBackgroundColor,
                                }}
                                InputProps={{
                                    style: {
                                        color: colors.theamFontColor
                                    }
                                }}
                                InputLabelProps={{
                                  style:{
                                    color:colors.theamFontColor,
                                  }
                                }}
                        />
                        <TextField
                                id="outlined-adornment-password"
                                error={difPassword}
                                variant="outlined"
                                type={values.showPassword ? 'text' : 'password'}
                                label="Password"
                                value={values.password}
                                onChange={handleChange('password')}
                                className="textField"
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                ),
                                style: {
                                  color: colors.theamFontColor
                                  }
                                }}
                                style={{
                                    backgroundColor: colors.contentBackgroundColor,
                                    }}
                                InputLabelProps={{
                                    style:{
                                        color:colors.theamFontColor,
                                      }
                                }}
                            />
                            
                        <TextField
                                error={difPassword}
                                id="outlined-adornment-password-confirm"
                                variant="outlined"
                                type={values.showPassword ? 'text' : 'password'}
                                label="confirm-Password"
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                className="textField"
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                ),
                                style: {
                                  color: colors.theamFontColor
                                  }
                                }}
                                style={{
                                    backgroundColor: colors.contentBackgroundColor,
                                    }}
                                InputLabelProps={{
                                    style:{
                                        color:colors.theamFontColor,
                                      }
                                }}
                            />
                        <Button  variant="contained" id="button" onClick={signUpHandler} 
                        style={{color:colors.theamFontColor, backgroundColor:colors.contentBackgroundColor}}>{signUpButton()}</Button>
                    </form>
                </div>
            </Card>
            {redirectHandler()}
        </div>
    );
}



const mapStateToProps = state => {
  return { 
    userId: state.userId,
    colorState:state.colorState,
   };
};

export default connect(
  mapStateToProps,
  { setUserId,setUserToken }
)(SignUp)

// export default SignUp;