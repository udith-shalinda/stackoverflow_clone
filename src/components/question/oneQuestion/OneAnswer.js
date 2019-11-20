import React from 'react';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'
import { Card, Button } from '@material-ui/core';
import Axios from 'axios';
import {Link} from 'react-router-dom';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';



const OneAnswer = (props)=>{


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
                    <Link to={'/editAnswer/'+props.id} className="link" >
                        <Button>Edit</Button>
                    </Link>
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

    return(
        <div>
            <Card className="oneAnswerCard">
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