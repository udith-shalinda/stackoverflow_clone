import React, { useState } from 'react'
import { Card, Button } from '@material-ui/core';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'
import OneAnswer from './OneAnswer';
import AddAnswer from '../addAnswer/AddAnswer'


import '../Question.css'

const OneQuestion =(props)=>{
    const [addAnswerState,setAnswerState] = useState(false);


    const addAnswerHandler = ()=>{
        if(addAnswerState){
            return(
               <AddAnswer/> 
            )
        }else{
            return(
                <Button onClick={()=>{setAnswerState(true)}}>Add Answer</Button>
            )
        }
    }

    return(
        <div>
            <Card className="questionCard">
                <div className="question">
                    <div className="content votes">
                        <Votes/>
                    </div>
                    <div className="content">
                        <h2>sfsfsfsfs sfsfsfsfs ssfsfsfsfsf</h2>
                        <p>sfsf ssgllllllll sflsjslojsojso jsojfjsojf sojsojso jfsojfsofjsofjs o</p>
                        <QuestionProfileDetails/>
                        <OneAnswer></OneAnswer>
                        <br/>
                        <OneAnswer></OneAnswer>
                        {addAnswerHandler()}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default OneQuestion;