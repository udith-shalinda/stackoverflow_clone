import React from 'react';
import QuestionProfileDetails from '../QuestionProfileDetails';
import Votes from '../votes/Votes'
import { Card } from '@material-ui/core';

// import './OneAnswer.css'


const OneAnswer = ()=>{
    return(
        <div>
            <Card className="oneAnswerCard">
                <div className="question">
                    <div className="content votes">
                        <Votes/>
                    </div>
                    <div className="content">
                        <h2>sfsfsfsfs sfsfsfsfs ssfsfsfsfsf</h2>
                        <p>sfsf ssgllllllll sflsjslojsojso jsojfjsojf sojsojso jfsojfsofjsofjs o</p>
                        <QuestionProfileDetails/>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default OneAnswer;