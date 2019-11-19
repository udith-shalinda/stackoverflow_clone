import React, { useEffect } from 'react'
import { Card, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useParams,withRouter} from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// import './AddQuestion.css'

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';
import Axios from 'axios';


let stompClient = null;

const EditQuestion =(props)=>{
    let { id } = useParams();
    const [values, setValues] = React.useState({
        question:'',
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
        getOneQuestion();
    },[])

    const getOneQuestion = async ()=>{
        const userDetailsId = {
            userId:props.userId
        }
        try{
            const res = await Axios.post('http://localhost:8102/api/question/getOneQuestion/'+id,userDetailsId,config);
            console.log(res.data);  
            setValues({
                question:res.data.question,
                description:res.data.description
            });
        }catch(e){
            console.log(e);
        }
    }

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const subscribeVotes=()=>{
        var sock = new SockJS('http://localhost:8102/api/ws');
        stompClient = Stomp.over(sock);
        sock.onopen = function() {
            console.log('open');
        }
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/user/question/'+id, function (greeting) {
                getOneQuestion();
                console.log(greeting);
                
            });
        });
    }
    const editQuestionHandler = async ()=>{
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
            const res = await Axios.put('http://localhost:8102/api/question/update/'+id,questionDetails,config);
            console.log(res.data);  
            stompClient.send("/app/question/votes/"+id, {});
            stompClient.send("/app/question/home/"+id, {});

        }catch(e){
            console.log(e);
        }
    }


    return(
        <div className="bd">
            <Card style={{color: colors.theamFontColor,backgroundColor:colors.contentBackgroundColor}} className="inputCard">
                <h2 className="addQuestion">Edit Question</h2>
            <form>
                <TextField
                    id="outlined-email-input"
                    label="Question"
                    type="text"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    className="textField"
                    value={values.question}
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
                    value={values.description}
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
                        onClick={editQuestionHandler}
                    >Edit Question</Button>
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
  )(withRouter(EditQuestion))
// export default AddQuestion;