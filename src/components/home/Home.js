import React, { useEffect, useState } from 'react'
import QuestionPreview from '../question/QuestionPreview';

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../redux/actions/UserLogin';
import {getAllQuestions} from '../../redux/actions/AllQuestions'



const Home =(props)=>{

    const [questiondata,setQuestionData] = useState([{}]);

    const getAllQuestions=async ()=>{
        if(props.allQuestions === null){
            setQuestionData(await props.getAllQuestions());
        }else{
            setQuestionData(props.allQuestions);
        }
    }
    useEffect(()=>{
        getAllQuestions();
    },[])

    const questionPreview = ()=>{
        if(questiondata.length>1){
            return questiondata.map((question)=>{
                console.log(question.createrDetails.name);
                return(
                    <div>
                        <QuestionPreview 
                            id={question.id}
                            question={question.question} 
                            description={question.description} 
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