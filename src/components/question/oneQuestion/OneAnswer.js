import React, { useState } from 'react';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'
import { Card, Button, IconButton } from '@material-ui/core';
import Axios from 'axios';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';
import EditAnswer from '../editAnswer/EditAnswer';



const OneAnswer = (props)=>{
    const [editAnswer,setEditAnswer] = useState(false);

    const doAnswerUpvote=async ()=>{
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
            const res = await Axios.put('http://localhost:8102/api/answer/addUpVoter/'+props.id,voter,config);
            console.log(res.data);  
            if(res.data !== props.answerVotes){
                props.stompClient.send("/app/question/votes/"+props.questionId, {});
                props.stompClient.send("/app/question/home/"+props.questionId, {});

            }  
        }catch(e){
            console.log(e);
        }
    } 
    const doAnswerDownvote=async ()=>{
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
            const res = await Axios.put('http://localhost:8102/api/answer/addDownVoter/'+props.id,voter,config);
            console.log(res.data);  
            if(res.data !== props.answerVotes){
                props.stompClient.send("/app/question/votes/"+props.questionId, {});
                props.stompClient.send("/app/question/home/"+props.questionId, {});
            }  
        }catch(e){
            console.log(e);
        }
    }
    const editDeleteButtonHander=()=>{
        if(props.disabledButton){
            return(
                <div>
                    <Button onClick={()=>{setEditAnswer(!editAnswer)}}>Edit</Button>
                    <Button onClick={deleteAnswerHandler}>Delete</Button>
                </div>
            )
        }else{
            return(
                null
            )
        }
    }
    const deleteAnswerHandler = async()=>{
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const questionId ={
            answerId:props.questionId
        }
        const res = await Axios.post('http://localhost:8102/api/answer/delete/'+props.id,questionId,config);
        console.log(res.data);
        props.stompClient.send("/app/question/votes/"+props.questionId, {});
        props.stompClient.send("/app/question/home/"+props.questionId, {});
    }
    const markAnswerHandler=async()=>{
        let config = {
            headers: {
                "Authorization":"Bearer " + props.token,
            }
        }
        const answerId ={
            answerId:props.id
        }
        const res = await Axios.put('http://localhost:8102/api/question/updateMarkedAnswer/'+props.questionId,answerId,config);
        console.log(res.data);
        props.stompClient.send("/app/question/votes/"+props.questionId, {});
        props.stompClient.send("/app/question/home/"+props.questionId, {});
    }


    const answerOrEditAnswer = ()=>{
        if(!editAnswer){
            return(
                <div className="question">
                    <div className="content votes">
                        <Votes
                            id={props.id} 
                            votes={props.answerVotes}
                            upVote={doAnswerUpvote}
                            downVote={doAnswerDownvote}
                            upVoted={props.upVoted}
                            downVoted={props.downVoted}
                            disabledButton={props.disabledButton}
                        />
                        <IconButton disabled={props.markEneble} onClick={markAnswerHandler}>
                            <DoneOutlineIcon style={{color:props.marked?"green":"black"}}></DoneOutlineIcon>
                        </IconButton>
                    </div>
                    <div className="content">
                        <h2>{props.answer}</h2>
                        <p>{props.description}</p>
                        <QuestionProfileDetails
                            name={props.createrName}
                            votes={props.createrVotes}
                            profileLink={props.createrProfileLink}
                        />
                    </div>
                </div>
            )
        }else{
            return(
                <EditAnswer id={props.id} questionId={props.questionId} setEditAnswer={setEditAnswer}></EditAnswer>
            )
        }
    }

    return(
        <div>
            <Card className="oneAnswerCard">
                    {answerOrEditAnswer()}
                    {editDeleteButtonHander()}
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
  )(OneAnswer)