import React from 'react'
import { Card } from '@material-ui/core';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'


import '../Question.css'
import OneAnswer from './OneAnswer';

const OneQuestion =()=>{

    

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
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default OneQuestion;