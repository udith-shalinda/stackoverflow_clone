import React, { useState, useEffect } from 'react'
import { Card, Button, CircularProgress, TextField } from '@material-ui/core';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'
import OneAnswer from './OneAnswer';
import AddAnswer from '../addAnswer/AddAnswer'
import {useParams,withRouter} from "react-router-dom";
import Axios from 'axios';
import '../Question.css'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {Link} from 'react-router-dom';


//redux
import { connect } from 'react-redux'
import { setUserId } from '../../../redux/actions/UserLogin';
import { CommentPreview } from './comment/CommentPreview';



let stompClient = null;


const OneQuestion =(props)=>{
    let { id } = useParams();
    const [addAnswerState,setAnswerState] = useState(false);
    const [OneQuestion,setOneQuestion] = useState(null);
    const [someOneAddingAnswer, setsomeOneAddAnswer] = useState(null);
    const [questionComment,setQuestionComment] = useState(false);
    const [inputComment,setInputComment]=useState('');
    let config = {
        headers: {
            "Authorization":"Bearer " + props.token,
        }
    }

    useEffect(()=>{
        getOneQuestion();
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
        stompClient.subscribe('/topic/user/question/'+id, function (greeting) {
            getOneQuestion();
            console.log(greeting);
            
        });
        stompClient.subscribe('/topic/user/addAnswer/'+id, function (res) {
            console.log("addding a answer "+res.body);
            setsomeOneAddAnswer(res.body);
        });
      });
    }


    const getOneQuestion = async ()=>{
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
               <AddAnswer 
                    questionId={OneQuestion.id}
                    getOneQuestion={getOneQuestion}
                    stompClient={stompClient}
                    setAnswerState={setAnswerStateHandler}
                /> 
            )
        }else{
            return(
                <Button onClick={()=>{setAnswerState(true)}}>Add Answer</Button>
            )
        }
    }
    const setAnswerStateHandler=()=>{
        setAnswerState(false);
    }

    const doQuestionUpvote=async ()=>{
        console.log("upvote clicked");
        
        const voter ={
            userId:props.userId
        }
        try{
            const res = await Axios.put('http://localhost:8102/api/question/addUpVoter/'+id,voter,config);
            console.log(res.data);  
            if(res.data !== OneQuestion.voters){
                stompClient.send("/app/question/votes/"+id, {});
                stompClient.send("/app/question/home/"+id, {});
                stompClient.send("/app/profile/votes/"+OneQuestion.createrId,{})

                setsomeOneAddAnswer(null)
            }
        }catch(e){
            console.log(e);
        }
    } 
    const doQuestionDownvote=async ()=>{
        console.log("downvote clicked");
        const voter ={
            userId:props.userId
        }
        try{
            const res = await Axios.put('http://localhost:8102/api/question/addDownVoter/'+id,voter,config);
            console.log(res.data);
            if(res.data !== OneQuestion.voters){
                stompClient.send("/app/question/votes/"+id, {});
                stompClient.send("/app/question/home/"+id, {});
                stompClient.send("/app/profile/votes/"+OneQuestion.createrId,{})
            }  
        }catch(e){
            console.log(e);
        }
    }

    const showAnswers = ()=>{
        if(OneQuestion.answerList !== null){
            if(OneQuestion.answerList.length >0){
                return OneQuestion.answerList.map((answer)=>{
                    return(
                        <div key={answer.id}>
                            <OneAnswer
                                id={answer.id} 
                                answer={answer.answer}
                                description={answer.description}
                                answerVotes = {answer.answerVoters}
                                createrName={answer.createrDetails.name}
                                createrVotes ={answer.createrDetails.votes}
                                createrId={answer.createrId}
                                createrProfileLink={answer.createrDetails.profilePictureLink}
                                upVoted={answer.upVoted}
                                downVoted={answer.downVoted}
                                stompClient={stompClient}
                                questionId={id}
                                disabledButton={answer.createrId===props.userId?true:false}
                                markEneble={OneQuestion.createrId=== props.userId?false:true}
                                marked={OneQuestion.markAnswer===answer.id?true:false}
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

    const indicateAddingAnswer= ()=>{
        if(someOneAddingAnswer !== null){
            if(someOneAddingAnswer !== props.userId){
               return(
                   <div>some one is typing</div>
               )
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    const showQuestion=()=>{
        if(OneQuestion!== null){
            return(
                <Card className="questionCard">
                <div className="question">
                    <div className="content votes">
                        <Votes
                            id={OneQuestion.id} 
                            votes={OneQuestion.voters}
                            upVote={doQuestionUpvote}
                            downVote={doQuestionDownvote}
                            upVoted={OneQuestion.upVoted}
                            downVoted={OneQuestion.downVoted}
                            disabledButton={OneQuestion.createrId=== props.userId?true:false}
                        />
                    </div>
                    <div className="content">
                        <h2>{OneQuestion.question}</h2>
                        <p>{OneQuestion.description}</p>
                        <Link to={'/profile/'+OneQuestion.createrId} className="link" >
                            <QuestionProfileDetails 
                                name={OneQuestion.createrDetails.name} 
                                votes={OneQuestion.createrDetails.votes} 
                                profileLink={OneQuestion.createrDetails.profileLink}/>
                        </Link>
                        {showComments()}
                        {commentButtonHandler()}
                        {editDeleteButtonHander()}
                        {indicateAddingAnswer()}
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
    const editDeleteButtonHander=()=>{
        if(props.userId === OneQuestion.createrId){
            return(
                <div>
                    <Link to={'/editQuestion/'+id} className="link" >
                        <Button>Edit</Button>
                    </Link>
                    <Button onClick={deleteQuestionHandler}>Delete</Button>
                </div>
            )
        }else{
            return(
                null
            )
        }
    }
    const commentButtonHandler=()=>{
        if(questionComment){
            return(
                <div>
                    <TextField
                    id="outlined-email-input3"
                    label="inputComment"
                    type="text"
                    name="inputComment"
                    margin="normal"
                    variant="outlined"
                    className="textField"
                    onChange={(event)=>setInputComment(event.target.value)}
                    />
                    <Button onClick={addCommentQuestion}>Add</Button>
                </div>
            )
        }else{
            return(
                <Button onClick={()=>{setQuestionComment(true)}}>Add comment</Button>
            )
        }
    }
    const deleteQuestionHandler = async()=>{
        let Question={
            answerIdList:OneQuestion.answerIdList,
        }
        const res = await Axios.post('http://localhost:8102/api/question/delete/'+id,Question,config);
        console.log(res.data);
    }

    const addCommentQuestion=async()=>{
        let commentClass={
            comment:inputComment,
            userId:props.userId,
        }
        const res = await Axios.post('http://localhost:8102/api/comment/addToQuestion/'+id,commentClass,config);
        console.log(res.data);
        setQuestionComment(false)
        stompClient.send("/app/question/votes/"+id, {});
    }
    const showComments=()=>{
        if(OneQuestion){
            if(OneQuestion.comments !== null){
                return OneQuestion.comments.map((comment)=>{
                    return(
                        <CommentPreview comment={comment.comment} userName={comment.userId}></CommentPreview>
                    )
                })
            }else{
                return(
                    <p>No comments yet!!</p>
                )
            }
        }else{
            return null;
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
