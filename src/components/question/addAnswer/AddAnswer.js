import React from 'react'
import { Card, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router'

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';



const AddAnswer = ()=>{
    const [values, setValues] = React.useState({
        answer:'',
        description:'',
        redirect:false
      });
    let colors = props.colorState.colors[props.colorState.colorCount];

    const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    };
    
    const redirectHandler = ()=>{
        if(values.redirect){
            return(
              <Redirect to='/' /> 
            );
          }else{
            return null;
          }
    }
    

    return(
        <div className="bd">
            <Card style={{color: colors.theamFontColor,backgroundColor:colors.contentBackgroundColor}} className="inputCard">
                <h2 className="addQuestion">Add Question</h2>
            <form>
                <TextField
                    id="outlined-email-input"
                    label="Answer"
                    type="text"
                    name="Answer"
                    margin="normal"
                    variant="outlined"
                    className="textField"
                    onChange={handleChange('answer')}
                    style={{
                        backgroundColor: colors.bodyBackgroundColor,
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
                    id="outlined-email-input3"
                    label="Description"
                    type="text"
                    name="Description"
                    margin="normal"
                    variant="outlined"
                    className="textField"
                    onChange={handleChange('description')}
                    style={{
                        backgroundColor: colors.bodyBackgroundColor,
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
                    <Button  variant="contained" id="button" 
                    style={{color:colors.theamFontColor, backgroundColor:colors.bodyBackgroundColor}}>Add Answer</Button>
                </form>
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
    { setUserId }
  )(AddAnswer)