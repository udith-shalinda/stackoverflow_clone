import React, { useEffect, useState } from 'react'
import QuestionPreview from '../question/QuestionPreview';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Pagination from './pagination/Pagination'

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../redux/actions/UserLogin';
import {getAllQuestions} from '../../redux/actions/AllQuestions'


const Home =(props)=>{

    const [questiondata,setQuestionData] = useState(null);
    const [pageState,setPageState] = useState({
        currentPage:0,
        pageSize:2
    });

    useEffect(()=>{
        getAllQuestions();
    },[])

    const getAllQuestions=async ()=>{
        if(props.allQuestions === null){
            setQuestionData(await props.getAllQuestions(pageState.currentPage,pageState.pageSize));
            console.log(questiondata);
        }else{
            setQuestionData(props.allQuestions);
            console.log(questiondata);
        }
    }
    

    const questionPreview = ()=>{
        if(props.allQuestions!== null && props.allQuestions.length>=1){
            return props.allQuestions.map((question,index)=>{
                return(
                    <div key={question.id}>
                        <QuestionPreview 
                            id={question.id}
                            index={index}
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
        }else{
            return <div>loading .....</div>;
        }
    }
    const pagination = ()=>{
        if(questiondata!== null && questiondata.length>=1){
            return(
                <Pagination currentPage={pageState.currentPage} setPageState={setPageState}></Pagination>
            )
        }
    }
   
    return(
        <div>
            <br></br>
           {questionPreview()}
           <br></br>
           {pagination()}
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