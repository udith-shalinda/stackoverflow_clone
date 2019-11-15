import React, { useState, useEffect } from 'react'
import { Card, Button, CircularProgress } from '@material-ui/core';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'
import OneAnswer from './OneAnswer';
import AddAnswer from '../addAnswer/AddAnswer'
import {useParams,withRouter} from "react-router-dom";
import Axios from 'axios';
import '../Question.css'

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';



const OneQuestion =(props)=>{
    let { id } = useParams();
    const [addAnswerState,setAnswerState] = useState(false);
    const [OneQuestion,setOneQuestion] = useState(null);

    useEffect(()=>{
        getOneQuestion();
    },[]);


    const getOneQuestion = async ()=>{
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        try{
            const res = await Axios.get('http://localhost:8102/api/question/getOneQuestion/'+id,config);
            console.log(res.data);  
            setOneQuestion(res.data);
        }catch(e){
            console.log(e);
        }
    }
    
    const addAnswerHandler = ()=>{
        if(addAnswerState){
            return(
               <AddAnswer/> 
            )
        }else{
            return(
                // <Button onClick={()=>{setAnswerState(true)}}>Add Answer</Button>
                <Button onClick={()=>{testRedirect()}}>Add test redirect</Button>
                
            )
        }
    }

    const testRedirect=()=>{
        props.history.push('/login')
        // props.browserHistory.push()
    }



    const showQuestion=()=>{
        if(OneQuestion!== null){
            return(
                <Card className="questionCard">
                <div className="question">
                    <div className="content votes">
                        <Votes 
                            votes={OneQuestion.voters}

                        />
                    </div>
                    <div className="content">
                        <h2>{OneQuestion.question}</h2>
                        <p>{OneQuestion.description}</p>
                        <QuestionProfileDetails 
                            name={OneQuestion.createrDetails.name} 
                            votes={OneQuestion.createrDetails.votes} 
                            profileLink={OneQuestion.createrDetails.profileLink}/>
                        <OneAnswer></OneAnswer>
                        <br/>
                        <OneAnswer></OneAnswer>
                        {addAnswerHandler()}
                    </div>
                </div>
            </Card>
            )
        }else{
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
        }
    }

    return(
        <div>
           {showQuestion()} 
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
  )(withRouter(OneQuestion))

// export default OneQuestion;