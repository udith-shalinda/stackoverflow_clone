import React from 'react'
import { Card } from '@material-ui/core'
import {Link} from 'react-router-dom';
import QuestionProfileDetails from './QuestionProfileDetails';

import './Question.css'

const QuestionPreview =(props)=>{
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

export default QuestionPreview;