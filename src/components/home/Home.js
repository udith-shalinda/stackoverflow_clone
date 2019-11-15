import React, { useEffect, useState } from 'react'
import QuestionPreview from '../question/QuestionPreview';
import Axios from 'axios';

//redux
import { connect } from 'react-redux'
import { setUserId } from '../../redux/actions/UserLogin';



const Home =(props)=>{

    const [questiondata,setQuestionData] = useState([{}]);

    const getAllQuestions=async ()=>{
        try{
            const res = await Axios.get('http://localhost:8102/api/question/getAllQuestions');
            console.log(res.data);  
            setQuestionData(res.data);
        }catch(e){
            console.log(e);
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
                        <QuestionPreview question={question.question} 
                        description={question.description} 
                        profile={question.createrDetails.name}
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
           {questionPreview()}
            <QuestionPreview/>

            <QuestionPreview/>
            <QuestionPreview/>
            

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
  )(Home)

// export default Home;