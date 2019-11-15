import React from 'react'
import { Card } from '@material-ui/core'

import './Question.css'
import QuestionProfileDetails from './QuestionProfileDetails';

const QuestionPreview =(props)=>{
    return(
        <div>
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
                    <div className="content">
                        <h2>{props.question}</h2>
                        <p>{props.description}</p>
                        <QuestionProfileDetails name={props.profile}/>
                    </div>
                </div>
            </Card>
            <br></br>
        </div>
    );
}

export default QuestionPreview;