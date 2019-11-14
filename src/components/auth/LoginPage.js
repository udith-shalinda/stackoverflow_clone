import React, { useState }  from 'react';
import axios from 'axios';
import {Redirect} from 'react-router'
import TextField from '@material-ui/core/TextField';
import {Button,CircularProgress} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import './Login.css'

//redux
import { connect } from 'react-redux'
import { setUserId,setUserToken } from '../../redux/actions/UserLogin';


export function Login(props){
      const [values, setValues] = React.useState({
        password: '',
        email:'',
        showPassword: false,
        redirect: false
      });
      const [isloading,setloading] = useState('No');
      const [errorEmail,setErrorEmail] = useState(false);
      const [errorPassword,setErrorPassword] = useState(false);
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
      
    
    const loginHandler =  async ()=>{
      setErrorEmail(false);
      setErrorPassword(false);
      setloading('Yes')
        const userData = {
          email:values.email,
          password:values.password
        }
        try{
          const res = await axios.post('http://localhost:8102/api/user/login',userData);
          console.log(res.data.userDetailsId);  
          if(res.status === 200){
            setloading('Correct');
            props.setUserId(res.data.userDetailsId);
            props.setUserToken(res.data.token)
              setValues({
                ...values,
                redirect:true
              });
            }else if(res.status === 203){
              setloading("No")
              setErrorPassword(true)
            }else {
              setloading("No")
              setErrorEmail(true);
            }
        }catch(e){
          console.log(e);
          setloading("No")
         setErrorEmail(true);
        }
        
    }
    const redirectHandler = () =>{
      if(values.redirect){
        return(
          <Redirect to='/' /> 
        );
      }else{
        return null;
      }
    }
    const LoginButton = ()=>{
      switch(isloading){
        case "Yes":
          return(
            <CircularProgress
              variant="indeterminate"
              disableShrink
              size={26}
              thickness={4}
              {...props}
              color={props.fontColor}
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
            "Login"
          )
      }
    }
    
    
    return (
        <div className="login">
            <Card style={{color:colors.theamFontColor, backgroundColor:colors.contentBackgroundColor}}>
                <div className="card">
                    <h2>Login</h2>
                    <form>
                        <TextField
                            error={errorEmail}
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            helperText="Incorrect entry."
                            value={values.email}
                            onChange={handleChange('email')}
                            className="textField"
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
                            error={errorPassword}
                            id="outlined-adornment-password"
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
                                    style={{color:colors.theamFontColor}}
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
                        <Button variant="contained" id="button" onClick={()=>loginHandler()} 
                        style={{color:colors.theamFontColor, backgroundColor:colors.contentBackgroundColor}}
                        >{LoginButton()}</Button>
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
)(Login)

// export default Login;