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

// //redux
// import { connect } from 'react-redux'
// import { setUser,setLoginState } from '../redux/actions'



export function Login(props){
      const [values, setValues] = React.useState({
        password: '',
        email:'',
        showPassword: false,
        redirect: false
      });
      const [isloading,setloading] = useState('No');
      const [errorMsg,setErrorMsg] = useState(' ');

    
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
      setloading('Yes')
        const userData = {
          email:values.email,
          password:values.password
        }
        const res = await axios.post('https://localhost:8102/api/user/login',userData);
        console.log(res);  
        if(res.status === 200){
          setloading('Correct');
          props.setUser(res.data);
          props.setLoginState(true);
            setValues({
              ...values,
              redirect:true
            });
          }else if(res.status === 203){
            setloading("Wrong")
            setErrorMsg("Password is wrong")
          }else {
            setloading("Wrong")
            setErrorMsg("Email is wrong")
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
        <div className="login" >
            <Card style={{color:props.fontColor, backgroundColor:props.backgroundColor}}>
                <div className="card">
                    <h2>Login</h2>
                    <form>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange('email')}
                            className="textField"
                            style={{
                                backgroundColor: props.backgroundColor,
                                }}
                                InputProps={{
                                    style: {
                                        color: props.fontColor
                                    }
                                }}
                                InputLabelProps={{
                                  style:{
                                    color:props.fontColor,
                                  }
                                }}
                        />
                        <TextField
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
                                    style={{color:props.fontColor}}
                                  >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                              style: {
                                color: props.fontColor
                                }
                            }}
                            style={{
                                backgroundColor: props.backgroundColor,
                                }}
                            InputLabelProps={{
                                style:{
                                    color:props.fontColor,
                                  }
                            }}
                        />
                        <Button variant="contained" id="button" onClick={()=>loginHandler()} 
                        style={{color:props.fontColor, backgroundColor:props.backgroundColor}}
                        >{LoginButton()}</Button>
                    </form>
                </div>
            </Card>
            {redirectHandler()}
            {errorMsg}
        </div>
    );
}

 

// const mapStateToProps = state => {
//   return { userId: state.userId };
// };

// export default connect(
//   mapStateToProps,
//   { setUser,setLoginState }
// )(Login)

export default Login;