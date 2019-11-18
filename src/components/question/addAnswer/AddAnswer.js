import React from 'react'
import { Card, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import './AddAnswer.css'
//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';
import Axios from 'axios';



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

    const addAnswerHandler=async()=>{
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const answerData = {
            answer:values.answer,
            description:values.description,
            createrId:props.userId,
        }
        let answerId='';
        try{
            const res = await Axios.post('http://localhost:8102/api/answer/save',answerData,config);
            console.log(res.data);  
            answerId = res.data;
        }catch(e){
            console.log(e);
        }
        const answerIdData={
            answerId:answerId
        }
        try{
            const resTwo = await Axios.put('http://localhost:8102/api/question/addAnswer/'+props.questionId,answerIdData,config);
            console.log(resTwo.data); 
            if(resTwo.data !== null){
                props.stompClient.send("/app/question/votes/"+props.questionId, {});
                props.setAnswerStateHandler();
            } 
        }catch(e){
            console.log(e);
        }
    }
    

    return(
        <div className="addAnswerCard">
            <Card style={{color: colors.theamFontColor,backgroundColor:colors.contentBackgroundColor}} >
                <h2 className="addAnswer">Add Answer</h2>
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
                        onClick={addAnswerHandler}
                    >Add Answer</Button>
                </form>
            </Card>
        </div>
    );
}

const mapStateToProps = state => {
    return { 
      userId: state.userId.userId,
      token:state.userToken.token,
      colorState:state.colorState,
     };
  };
  
  export default connect(
    mapStateToProps,
    { setUserId }
  )(AddAnswer)