import React, { useEffect } from 'react'
import { Card, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import './AddQuestion.css'

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';
import Axios from 'axios';


let stompClient = null;

const AddQuestion =(props)=>{
    useEffect(()=>{
        subscribeVotes();
    },[])

    const subscribeVotes=()=>{
        var sock = new SockJS('http://localhost:8102/api/ws');
      stompClient = Stomp.over(sock);
      sock.onopen = function() {
          console.log('open');
      }
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
      });
    }

    const [values, setValues] = React.useState({
        question:'',
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
              <Redirect to='/home' /> 
            );
          }else{
            return null;
          }
    }
    const addQuestionHandler = async ()=>{
        const questionDetails={
            question:values.question,
            description:values.description,
            createrId:props.userId,
        }
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
          }
        
        try{
            const res = await Axios.post('http://localhost:8102/api/question/save',questionDetails,config);
            console.log(res.data);  
            setValues({
                ...values,
                redirect:true,
            })
            stompClient.send("/app/question/home/"+"props.questionId", {});
        }catch(e){
            console.log(e);
        }
    }


    return(
        <div className="bd">
            <Card style={{color: colors.theamFontColor,backgroundColor:colors.contentBackgroundColor}} className="inputCard">
                <h2 className="addQuestion">Add Question</h2>
            <form>
                <TextField
                    id="outlined-email-input"
                    label="Question"
                    type="text"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    className="textField"
                    onChange={handleChange('question')}
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
                    >Add Question</Button>
                </form>
            </Card>
            {redirectHandler()}
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
  )(AddQuestion)
// export default AddQuestion;