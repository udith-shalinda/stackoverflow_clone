import React, { useEffect, useState } from 'react'
import QuestionPreview from '../question/QuestionPreview';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Pagination } from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../redux/actions/UserLogin';
import {getAllQuestions} from '../../redux/actions/AllQuestions'


let stompClient = null;

const Home =(props)=>{

    const [questiondata,setQuestionData] = useState([]);

    useEffect(()=>{
        getAllQuestions();
        subscribeVotes();
    },[])

    const getAllQuestions=async ()=>{
        if(props.allQuestions === null){
            setQuestionData(await props.getAllQuestions());
            console.log(questiondata);
        }else{
            setQuestionData(props.allQuestions);
            console.log(questiondata);
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
        stompClient.subscribe('/topic/user/home', function (res) {
            updateQuestion();
            console.log(res.body);
        });
      });
    }
    const updateQuestion =  async()=>{
        setQuestionData(await props.getAllQuestions());
    }
    

    const questionPreview = ()=>{
        if(questiondata!== null && questiondata.length>=1){
            return questiondata.map((question)=>{
                return(
                    <div key={question.id}>
                        <QuestionPreview 
                            id={question.id}
                            question={question.question} 
                            description={question.description} 
                            createrId={question.createrId}
                            name={question.createrDetails.name}
                            userVotes = {question.createrDetails.votes}
                            profileLink={question.createrDetails.profilePictureLink}
                            voters = {question.voters}
                            answerCount = {question.answerCount}
                        />
                    </div>
                )
            })
        }
    }
   
    return(
        <div>
            <br></br>
           {questionPreview()}
           <div>
            <Pagination
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={3}
                />
           </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { 
      userId: state.userId.userId,
      token:state.userToken.token,
      colorState:state.colorState,
      allQuestions:state.questionState.questions
     };
  };
  
  export default connect(
    mapStateToProps,
    { setUserId,getAllQuestions }
  )(Home)

// export default Home;