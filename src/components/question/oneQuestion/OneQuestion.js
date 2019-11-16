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
    },[])


    const getOneQuestion = async ()=>{
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const userDetailsId = {
            userId:props.userId
        }
        try{
            const res = await Axios.post('http://localhost:8102/api/question/getOneQuestion/'+id,userDetailsId,config);
            console.log(res.data);  
            setOneQuestion(res.data);
        }catch(e){
            console.log(e);
        }
    }
    
    const addAnswerHandler = ()=>{
        if(addAnswerState){
            return(
               <AddAnswer questionId={OneQuestion.id}/> 
            )
        }else{
            return(
                <Button onClick={()=>{setAnswerState(true)}}>Add Answer</Button>
            )
        }
    }

    // const testRedirect=()=>{
    //     props.history.push('/login')
    // }
    const doQuestionUpvote=async ()=>{
        console.log("upvote clicked");
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const voter ={
            userId:props.userId
        }
        try{
            const res = await Axios.put('http://localhost:8102/api/question/addUpVoter/'+id,voter,config);
            console.log(res.data);  
            // setOneQuestion(res.data);
        }catch(e){
            console.log(e);
        }
    } 
    const doQuestionDownvote=async ()=>{
        console.log("downvote clicked");
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const voter ={
            userId:props.userId
        }
        try{
            const res = await Axios.put('http://localhost:8102/api/question/addDownVoter/'+id,voter,config);
            console.log(res.data);  
            // setOneQuestion(res.data);
        }catch(e){
            console.log(e);
        }
    }

    const showAnswers = ()=>{
        if(OneQuestion.answerList !== null){
            if(OneQuestion.answerList.length >0){
                return OneQuestion.answerList.map((answer)=>{
                    return(
                        <div>
                            <OneAnswer
                                id={answer.id} 
                                answer={answer.answer}
                                description={answer.description}
                                answerVotes = {answer.answerVoters}
                                createrName={answer.createrDetails.name}
                                createrVotes ={answer.createrDetails.votes}
                                createrProfileLink={answer.createrDetails.profilePictureLink}
                            ></OneAnswer>
                            <br/>
                        </div>
                    )
                });
            }
        }else{
            return(
                <p>No answers is posted!!</p>
            )
        }
    }


    const showQuestion=()=>{
        if(OneQuestion!== null){
            return(
                <Card className="questionCard">
                <div className="question">
                    <div className="content votes">
                        <Votes 
                            votes={OneQuestion.voters}
                            upVote={doQuestionUpvote}
                            downVote={doQuestionDownvote}
                        />
                    </div>
                    <div className="content">
                        <h2>{OneQuestion.question}</h2>
                        <p>{OneQuestion.description}</p>
                        <QuestionProfileDetails 
                            name={OneQuestion.createrDetails.name} 
                            votes={OneQuestion.createrDetails.votes} 
                            profileLink={OneQuestion.createrDetails.profileLink}/>
                        
                        {showAnswers()}
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
