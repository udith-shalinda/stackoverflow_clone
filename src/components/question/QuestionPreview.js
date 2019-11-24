import React, { useEffect } from 'react'
import { Card } from '@material-ui/core'
import {Link} from 'react-router-dom';
import QuestionProfileDetails from './QuestionProfileDetails';
import { getStompClient } from '../websocket/StompClient';

import './Question.css'

//redux
import { connect } from 'react-redux'
import { getOneQuestionById } from '../../redux/actions/AllQuestions';

const QuestionPreview =(props)=>{

    useEffect(()=>{
        subscribeProfile(); 
    },[])

    const subscribeProfile=()=>{
        const stompClient = getStompClient();
        stompClient.connect({}, function (frame) {
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/user/question/'+props.id, function (res) {
                props.getOneQuestionById(props.id,props.index)
              console.log("question change detected");
          });
        });
    }


    return(
        <div >
            <Card className="questionCard">
                <div className="question">
                    <div className="content votes">
                        <div >
                            <p>{props.voters}</p>
                            <p>votes</p>
                        </div>
                        <div>
                            <p>{props.answerCount}</p>
                            <p>answers</p>
                        </div>
                    </div>
                    <div className="content questionPart">
                        <Link to={'/oneQuestion/'+props.id} className="link" >
                            <div>
                                <h2>{props.question}</h2>
                                <p>{props.description}</p>
                            </div>
                        </Link>
                        <Link to={'/profile/'+props.createrId} className="link" >
                            <QuestionProfileDetails name={props.name} votes={props.userVotes} profileLink={props.profileLink}/>
                        </Link> 
                    </div>
                </div>
            </Card>
            
            <br></br>
        </div>
    );
}

// export default QuestionPreview;

  
  export default connect(
    null,
    { getOneQuestionById}
  )(QuestionPreview)
