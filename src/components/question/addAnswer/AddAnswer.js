import React from 'react'
import { Card, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import './AddAnswer.css'
//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';



const AddAnswer = (props)=>{
    const [values, setValues] = React.useState({
        answer:'',
        description:'',
        redirect:false
      });
    let colors = props.colorState.colors[props.colorState.colorCount];

    const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const addQuestionHandler = ()=>{
        // if
    }
    

    return(
        <div className="addAnswerCard">
            <Card style={{color: colors.theamFontColor,backgroundColor:colors.contentBackgroundColor}} >
                <h2 className="addAnswer">Add Question</h2>
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
                        style={{color:colors.theamFontColor, backgroundColor:colors.bodyBackgroundColor}}
                        onClick={addQuestionHandler}
                    >Add Answer</Button>
                </form>
            </Card>
        </div>
    );
}

const mapStateToProps = state => {
    return { 
      userId: state.userId.userId,
      toket:state.userToken.token,
      colorState:state.colorState,
     };
  };
  
  export default connect(
    mapStateToProps,
    { setUserId }
  )(AddAnswer)