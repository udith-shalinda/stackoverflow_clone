import React, { useEffect, useState } from 'react'
import { Card, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';
import Axios from 'axios';

let stompClient = null;

const EditAnswer = (props)=>{
    let id = props.id;
    const [values, setValues] = useState({
        answer:'',
        description:'',
        redirect:false
      });
    let config = {
        headers: {
            "Authorization":"Bearer " + props.token,
        }
    }
    let colors = props.colorState.colors[props.colorState.colorCount];

    useEffect(()=>{
        subscribeVotes();
        getOneAnswer();
    },[])

    const getOneAnswer = async ()=>{
        try{
            const res = await Axios.get('http://localhost:8102/api/answer/getOneAnswer/'+id,config);
            console.log(res.data);  
            setValues({
                ...values,
                answer:res.data.answer,
                description:res.data.description
            });
        }catch(e){
            console.log(e);
        }
    }
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

    const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const UpdateAnswerHandler=async()=>{
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const answerData = {
            answer:values.answer,
            description:values.description,
        }
        try{
            const res = await Axios.put('http://localhost:8102/api/answer/update/'+id,answerData,config);
            console.log(res.data);  
            stompClient.send("/app/question/home/"+props.questionId, {});
            stompClient.send("/app/question/votes/"+props.questionId, {});
            props.setEditAnswer(false);
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
                    value={values.answer}
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
                    value={values.description}
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
                        onClick={UpdateAnswerHandler}
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
  )(EditAnswer)