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

// //redux
// import { connect } from 'react-redux'
// import { setUser ,setLoginState} from '../redux/actions'




export function SignUp(props){
    const [values, setValues] = React.useState({
        password: '',
        email:'',
        name:'',
        status:'',
        showPassword: false,
        redirect:false
      });
      const [isloading,setloading] = useState('No');
      // const [errorMsg,setErrorMsg] = useState('sfsfsf');
    
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
              "Sign Up"
            )
        }
      }

    const signUpHandler = async (e)=>{
      setloading('Yes')
        const userDetailsData ={
            name:values.name,
            status:values.status,
            profilePictureLink:null
        }
        const userDetailsRes = await axios.post('https://blooming-reaches-61913.herokuapp.com/user/api/userDetails/save',userDetailsData);
        console.log(userDetailsRes.data);
    
        const userData = {
            email:values.email,
            password:values.password,
            userDetailsId:userDetailsRes.data
        }
        const res = await axios.post('https://blooming-reaches-61913.herokuapp.com/user/api/saveUser',userData);
        console.log(res.data);
        if(res.status === 200){
          props.setUser(userDetailsData.data);
          props.setLoginState(true);
          setValues({
              ...values,
              redirect:true
          })
          setloading('Correct')
        }else{
          setloading('Worng')
        }
    }
    const redirectHandler = () =>{
        if(values.redirect){
          props.setLogged()
          return(
            <Redirect to='/' /> 
          );
        }else{
          return null;
        }
      }


    return (
        <div className="login">
            <Card style={{color:props.fontColor, backgroundColor:props.backgroundColor}}>
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
                            id="outlined-email-input3"
                            label="Status"
                            type="text"
                            name="status"
                            margin="normal"
                            variant="outlined"
                            className="textField"
                            onChange={handleChange('status')}
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
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                ),
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
                        <Button  variant="contained" id="button" onClick={signUpHandler} 
                        style={{color:props.fontColor, backgroundColor:props.backgroundColor}}>{signUpButton()}</Button>
                    </form>
                </div>
            </Card>
            {redirectHandler()}
        </div>
    );
}



// const mapStateToProps = state => {
//     return { userId: state.userId };
//   };
  
//   export default connect(
//     mapStateToProps,
//     { setUser ,setLoginState}
//   )(SignUp)

export default SignUp;